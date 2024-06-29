import { ethers } from "hardhat";
import {
  Controller__factory,
  FeeRewardForwarder__factory,
  NotifyHelper__factory,
  RewardForwarder__factory,
  Storage__factory,
  UniversalLiquidatorRegistry__factory,
  UniversalLiquidator__factory,
} from "../typechain-types";
import config from "./fork-mainnet-config";
import { liquidations } from "../test/liquidation";
import hre from "hardhat";

export const prepareManager = async () => {
  try {
    const signers = await ethers.getSigners();

    const governance = signers[0];

    const storage = await new Storage__factory(governance).deploy();
    await storage.waitForDeployment();
    console.log("Storage deployed at: ", storage.target);
    console.log({ governance: await storage.governance() });

    await hre.ethernal.push({
      name: "Storage",
      address: storage.target.toString(),
    });

    const universalLiquidatorRegistry =
      await new UniversalLiquidatorRegistry__factory(governance).deploy();
    await universalLiquidatorRegistry.waitForDeployment();

    await hre.ethernal.push({
      name: "UniversalLiquidatorRegistry",
      address: universalLiquidatorRegistry.target.toString(),
    });

    const feeRewardForwarder = await new FeeRewardForwarder__factory(
      governance
    ).deploy(
      storage.target,
      config.FARM_TOKEN,
      config.IFARM_TOKEN,
      universalLiquidatorRegistry.target
    );
    await feeRewardForwarder.waitForDeployment();

    await hre.ethernal.push({
      name: "FeeRewardForwarder",
      address: feeRewardForwarder.target.toString(),
    });

    const notifyHelper = await new NotifyHelper__factory(governance).deploy(
      storage.target,
      feeRewardForwarder.target,
      config.FARM_TOKEN
    );
    await notifyHelper.waitForDeployment();

    await hre.ethernal.push({
      name: "NotifyHelper",
      address: notifyHelper.target.toString(),
    });

    const rewardForwarder = await new RewardForwarder__factory(
      governance
    ).deploy(storage.target);
    await rewardForwarder.waitForDeployment();

    await hre.ethernal.push({
      name: "RewardForwarder",
      address: rewardForwarder.target.toString(),
    });

    const universalLiquidator = await new UniversalLiquidator__factory(
      governance
    ).deploy();
    await universalLiquidator.waitForDeployment();

    await hre.ethernal.push({
      name: "UniversalLiquidator",
      address: universalLiquidator.target.toString(),
    });

    await universalLiquidator.setPathRegistry(
      universalLiquidatorRegistry.target
    );

    const controller = await new Controller__factory(governance).deploy(
      storage.target,
      config.WETH_TOKEN,
      governance.address,
      notifyHelper.target,
      rewardForwarder.target,
      universalLiquidator.target,
      120
    );
    await controller.waitForDeployment();

    await hre.ethernal.push({
      name: "Controller",
      address: controller.target.toString(),
    });

    await storage.setController(controller.target);

    await universalLiquidatorRegistry.addDex(
      ethers.keccak256(ethers.toUtf8Bytes("uniV3")),
      "0xc1D0465FF243fEcE2856Eac534C16cf1C8fb1aBA"
    );
    await universalLiquidatorRegistry.addDex(
      ethers.keccak256(ethers.toUtf8Bytes("banchorV2")),
      "0xaB8dB3Bbe95cb7E9f18a6c5bB9432553Eb59ec83"
    );
    await universalLiquidatorRegistry.addDex(
      ethers.keccak256(ethers.toUtf8Bytes("sushiSwap")),
      "0x5dDA716093424Eeb347d05BB65Fc0b601A53B9b1"
    );
    await universalLiquidatorRegistry.setIntermediateToken([
      "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      "0xdAC17F958D2ee523a2206206994597C13D831ec7",
      "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    ]);

    for (let i = 0; i < liquidations.length; i++) {
      const dex = Object.keys(liquidations[i])[0];
      const dexNameInBytes = ethers.keccak256(ethers.toUtf8Bytes(dex));
      await universalLiquidatorRegistry.setPath(
        dexNameInBytes,
        liquidations[i][dex]
      );
    }

    return {
      controller,
      storage,
      universalLiquidatorRegistry,
      feeRewardForwarder,
      notifyHelper,
      rewardForwarder,
      universalLiquidator,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
