import hre from "hardhat";
import {
  IERC20__factory,
  IdleStrategyMainnet_DAI,
  IdleStrategyMainnet_DAI__factory,
  MockImplementStrategy,
  MockImplementStrategy__factory,
  MockVault__factory,
  VaultProxy__factory,
  VaultV2__factory,
} from "../../typechain-types";
import { setUpCoreProtocol } from "../utilities/hardhat-utils";
import { liquidations } from "../liquidation";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";

const ethers = hre.ethers;

const WETH = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
const DAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
const WHALE = "0x47ac0Fb4F2D84898e4D9E7b4DaB3C24507a6D503";
const FARM = WETH;
const IFARM = "0x1571eD0bed4D987fe2b498DdBaE7DFA19519F651";

describe("Upgrade vault", () => {
  async function prepareVault() {
    const accounts = await ethers.getSigners();
    const governance = accounts[0];
    const farmer1 = accounts[1];
    const underlying = IERC20__factory.connect(DAI, accounts[10]);
    const underlyingWhale = await ethers.getImpersonatedSigner(WHALE);

    await accounts[8].sendTransaction({
      to: WHALE,
      value: ethers.parseEther("100"),
    });
    const farmerBalance = await underlying.balanceOf(underlyingWhale.address);
    await underlying
      .connect(underlyingWhale)
      .transfer(farmer1.address, farmerBalance);

    const vaultImplementation = await new VaultV2__factory(governance).deploy();

    const strategyImplementation = await new IdleStrategyMainnet_DAI__factory(
      governance
    ).deploy();

    const { controller: controllerContract, vault: vaultContract } =
      await setUpCoreProtocol(
        {
          vaultImplementation: vaultImplementation.target,
          underlyingAddress: DAI,
          FARMToken: FARM,
          IFARMToken: IFARM,
          WETHToken: WETH,
          liquidation: liquidations,
          strategyImplementation: strategyImplementation.target,
          strategyType: "no-strategy",
        },
        governance
      );

    const controller = controllerContract;
    const vault = vaultContract;

    return {
      accounts,
      underlying,
      underlyingWhale,
      farmer1,
      farmerBalance,
      controller,
      vault,
      governance
    };
  }

  it("Should upgrade the vault", async () => {
    const { vault, governance, farmer1, controller } = await loadFixture(prepareVault);

    const newVaultImplementation = await new MockVault__factory(governance).deploy();
    await vault.connect(governance).scheduleUpgrade(newVaultImplementation.target);
    expect(await vault.nextImplementation()).to.be.equal(newVaultImplementation.target);
    expect((await vault.shouldUpgrade())[0]).to.be.false;
    await hre.network.provider.send("hardhat_mine", ["0x100000"]); // pass time lock 
    expect((await vault.shouldUpgrade())[0]).to.be.true;
    const proxy = VaultProxy__factory.connect(vault.target.toString(), farmer1);
    await proxy.connect(governance).upgrade();
    const newVault = MockVault__factory.connect(vault.target.toString(), governance);
    expect(await newVault.version()).to.be.equal("2.0.0");
    expect(await newVault.underlying()).to.be.equal(DAI);
    expect(await newVault.governance()).to.be.equal(governance.address);
    expect(await newVault.controller()).to.be.equal(controller.target);
  });
});
