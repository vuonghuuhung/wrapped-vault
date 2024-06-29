import { ethers } from "hardhat";
import {
  CompoundStrategyMainnet_WETH__factory,
  ConvexStrategyCvxCRVMainnet_cvxCRV__factory,
  ConvexStrategyMainnet_3CRV__factory,
  ConvexStrategyMainnet_OETH__factory,
  ConvexStrategyMainnet_crvUSD_USDC__factory,
  ConvexStrategyMainnet_stETH_ng__factory,
  IdleStrategyMainnet_DAI__factory,
  IdleStrategyMainnet_USDC__factory,
  IdleStrategyMainnet_USDT__factory,
  MegaFactory,
  VaultV1__factory,
  YelStrategyMainnet_YEL_WETH__factory,
} from "../typechain-types";
import config from "./fork-mainnet-config";
import { pushArtifact } from "./helpers";

export const prepareVault = async (megaFactory: MegaFactory) => {
  try {
    const signers = await ethers.getSigners();

    const governance = signers[0];

    const compoundWETH = await new CompoundStrategyMainnet_WETH__factory(
      governance
    ).deploy();
    await pushArtifact("CompoundStrategyMainnet_WETH", compoundWETH.target);
    const convex3CRV = await new ConvexStrategyMainnet_3CRV__factory(
      governance
    ).deploy();
    await pushArtifact("ConvexStrategyMainnet_3CRV", convex3CRV.target);
    const convexCrvUSDUSDC =
      await new ConvexStrategyMainnet_crvUSD_USDC__factory(governance).deploy();
    await pushArtifact("ConvexStrategyMainnet_crvUSD_USDC", convexCrvUSDUSDC.target);
    const convexCVXCRV = await new ConvexStrategyCvxCRVMainnet_cvxCRV__factory(
      governance
    ).deploy();
    await pushArtifact("ConvexStrategyCvxCRVMainnet_cvxCRV", convexCVXCRV.target);
    const convexOETH = await new ConvexStrategyMainnet_OETH__factory(
      governance
    ).deploy();
    await pushArtifact("ConvexStrategyMainnet_OETH", convexOETH.target);
    const convexSTETH = await new ConvexStrategyMainnet_stETH_ng__factory(
      governance
    ).deploy();
    await pushArtifact("ConvexStrategyMainnet_stETH_ng", convexSTETH.target);
    const idleDAI = await new IdleStrategyMainnet_DAI__factory(
      governance
    ).deploy();
    await pushArtifact("IdleStrategyMainnet_DAI", idleDAI.target);
    const idleUSDC = await new IdleStrategyMainnet_USDC__factory(
      governance
    ).deploy();
    await pushArtifact("IdleStrategyMainnet_USDC", idleUSDC.target);
    const idleUSDT = await new IdleStrategyMainnet_USDT__factory(
      governance
    ).deploy();
    await pushArtifact("IdleStrategyMainnet_USDT", idleUSDT.target);
    const yelWETH = await new YelStrategyMainnet_YEL_WETH__factory(
      governance
    ).deploy();
    await pushArtifact("YelStrategyMainnet_YEL_WETH", yelWETH.target);

    await megaFactory.createRegularVaultUsingUpgradableStrategy(
      "compound-weth",
      config.WETH_TOKEN,
      compoundWETH.target
    );
    await megaFactory.createRegularVaultUsingUpgradableStrategy(
      "convex-3crv",
      config.CURVE_3CRV_TOKEN,
      convex3CRV.target
    );
    await megaFactory.createRegularVaultUsingUpgradableStrategy(
      "convex-crvusd-usdc",
      config.CURVE_USD_USDC_TOKEN,
      convexCrvUSDUSDC.target
    );
    await megaFactory.createRegularVaultUsingUpgradableStrategy(
      "convex-cvxcrv",
      config.CURVE_CVX_CRV_TOKEN,
      convexCVXCRV.target
    );
    await megaFactory.createRegularVaultUsingUpgradableStrategy(
      "convex-oeth",
      config.CURVE_OETH_TOKEN,
      convexOETH.target
    );
    await megaFactory.createRegularVaultUsingUpgradableStrategy(
      "convex-steth",
      config.CURVE_STETH_TOKEN,
      convexSTETH.target
    );
    await megaFactory.createRegularVaultUsingUpgradableStrategy(
      "idle-dai",
      config.DAI_TOKEN,
      idleDAI.target
    );
    await megaFactory.createRegularVaultUsingUpgradableStrategy(
      "idle-usdc",
      config.USDC_TOKEN,
      idleUSDC.target
    );
    await megaFactory.createRegularVaultUsingUpgradableStrategy(
      "idle-usdt",
      config.USDT_TOKEN,
      idleUSDT.target
    );
    await megaFactory.createRegularVaultUsingUpgradableStrategy(
      "yel-weth",
      config.SUSHI_LP_TOKEN,
      yelWETH.target
    );

    const compoundVault = VaultV1__factory.connect((await megaFactory.completedDeployments("compound-weth")).NewVault, governance);
    await pushArtifact("VaultV1", compoundVault.target);
    const convex3CRVVault = VaultV1__factory.connect((await megaFactory.completedDeployments("convex-3crv")).NewVault, governance);
    await pushArtifact("VaultV1", convex3CRVVault.target);
    const convexCrvUSDUSDVault = VaultV1__factory.connect((await megaFactory.completedDeployments("convex-crvusd-usdc")).NewVault, governance);
    await pushArtifact("VaultV1", convexCrvUSDUSDVault.target);
    const convexCVXCRVVault = VaultV1__factory.connect((await megaFactory.completedDeployments("convex-cvxcrv")).NewVault, governance);
    await pushArtifact("VaultV1", convexCVXCRVVault.target);
    const convexOETHVault = VaultV1__factory.connect((await megaFactory.completedDeployments("convex-oeth")).NewVault, governance);
    await pushArtifact("VaultV1", convexOETHVault.target);
    const convexSTETHVault = VaultV1__factory.connect((await megaFactory.completedDeployments("convex-steth")).NewVault, governance);
    await pushArtifact("VaultV1", convexSTETHVault.target);
    const idleDAIVault = VaultV1__factory.connect((await megaFactory.completedDeployments("idle-dai")).NewVault, governance);
    await pushArtifact("VaultV1", idleDAIVault.target);
    const idleUSDCVault = VaultV1__factory.connect((await megaFactory.completedDeployments("idle-usdc")).NewVault, governance);
    await pushArtifact("VaultV1", idleUSDCVault.target);
    const idleUSDTVault = VaultV1__factory.connect((await megaFactory.completedDeployments("idle-usdt")).NewVault, governance);
    await pushArtifact("VaultV1", idleUSDTVault.target);
    const yelWETHVault = VaultV1__factory.connect((await megaFactory.completedDeployments("yel-weth")).NewVault, governance);
    await pushArtifact("VaultV1", yelWETHVault.target);

    return {
      compoundVault,
      convex3CRVVault,
      convexCrvUSDUSDVault,
      convexCVXCRVVault,
      convexOETHVault,
      convexSTETHVault,
      idleDAIVault,
      idleUSDCVault,
      idleUSDTVault,
      yelWETHVault,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
