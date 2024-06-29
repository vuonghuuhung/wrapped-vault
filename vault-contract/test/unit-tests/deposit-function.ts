import hre from "hardhat";
import {
  IERC20__factory,
  IdleStrategyMainnet_DAI,
  IdleStrategyMainnet_DAI__factory,
  MockImplementStrategy,
  MockImplementStrategy__factory,
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

describe("Unit test Deposit Function", () => {
  async function prepareVaultWithStrategy() {
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

    const {
      controller: controllerContract,
      vault: vaultContract,
      strategy: strategyContract,
    } = await setUpCoreProtocol(
      {
        vaultImplementation: vaultImplementation.target,
        underlyingAddress: DAI,
        FARMToken: FARM,
        IFARMToken: IFARM,
        WETHToken: WETH,
        liquidation: liquidations,
        strategyImplementation: strategyImplementation.target,
        strategyType: "idle-dai",
      },
      governance
    );

    const controller = controllerContract;
    const vault = vaultContract;
    const strategy = strategyContract as IdleStrategyMainnet_DAI;

    return {
      accounts,
      underlying,
      underlyingWhale,
      farmer1,
      farmerBalance,
      controller,
      vault,
      strategy,
    };
  }

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
    };
  }

  async function prepareVaultWithMockArbStrategy() {
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

    const strategyImplementation = await new MockImplementStrategy__factory(
      governance
    ).deploy();

    const {
      controller: controllerContract,
      vault: vaultContract,
      strategy: strategyContract,
    } = await setUpCoreProtocol(
      {
        vaultImplementation: vaultImplementation.target,
        underlyingAddress: DAI,
        FARMToken: FARM,
        IFARMToken: IFARM,
        WETHToken: WETH,
        liquidation: liquidations,
        strategyImplementation: strategyImplementation.target,
        strategyType: "mock-strategy",
      },
      governance
    );

    const controller = controllerContract;
    const vault = vaultContract;
    const strategy = strategyContract as MockImplementStrategy;

    return {
      accounts,
      underlying,
      underlyingWhale,
      farmer1,
      farmerBalance,
      controller,
      vault,
      strategy,
    };
  }

  describe("Test case 1", () => {
    it("Stakeholder deposit amount 0, should revert with reason: Cannot deposit 0", async () => {
      const { vault, farmer1 } = await loadFixture(prepareVault);

      await expect(vault.connect(farmer1).deposit(0)).to.be.revertedWith(
        "Cannot deposit 0"
      );
    });
  });

  describe("Test case 2", () => {
    it("Stakeholder allow for another account, but the reciepient is address 0, should revert", async () => {
      const { vault, farmer1, accounts, underlying } = await loadFixture(
        prepareVault
      );
      const spender = accounts[10];

      expect(spender.address).not.to.be.equal(farmer1.address);
      await underlying.connect(farmer1).approve(spender.address, 1000);
      expect(
        await underlying.allowance(farmer1.address, spender.address)
      ).to.be.equal(1000);

      await expect(
        vault.connect(spender).depositFor(1000, ethers.ZeroAddress)
      ).to.be.revertedWith("holder must be defined");
    });
  });

  describe("Test case 3", () => {
    it("Stakeholder deposit when vault haven't set the strategy yet, should success", async () => {
      const { vault, farmer1, underlying } = await loadFixture(prepareVault);

      expect(await vault.strategy()).to.be.equal(ethers.ZeroAddress);
      await underlying.connect(farmer1).approve(vault.target, 1000);
      await expect(vault.connect(farmer1).deposit(1000))
        .to.emit(vault, "Deposit")
        .withArgs(farmer1.address, farmer1.address, 1000, 1000);
      expect(await vault.getPricePerFullShare()).to.be.equal(
        ethers.parseEther("1")
      );
      expect(await vault.balanceOf(farmer1.address)).to.be.equal(1000);
    });
  });

  describe("Test case 4", () => {
    it("Stakeholder deposit when vault have set a arbitrageable strategy, should revert", async () => {
      const { vault, farmer1, underlying, strategy } = await loadFixture(
        prepareVaultWithMockArbStrategy
      );

      expect(await vault.strategy()).to.be.equal(strategy.target);
      await underlying.connect(farmer1).approve(vault.target, 1000);
      await expect(vault.connect(farmer1).deposit(1000)).to.be.revertedWith(
        "Too much arb"
      );
    });
  });

  describe("Test case 5", () => {
    it("Stakeholder deposit when vault have set a strategy, should success", async () => {
      const { vault, farmer1, underlying, strategy } = await loadFixture(
        prepareVaultWithStrategy
      );

      expect(await vault.strategy()).to.be.equal(strategy.target);
      await underlying.connect(farmer1).approve(vault.target, 1000);
      await expect(vault.connect(farmer1).deposit(1000))
        .to.emit(vault, "Deposit")
        .withArgs(farmer1.address, farmer1.address, 1000, 1000);
      expect(await vault.getPricePerFullShare()).to.be.equal(
        ethers.parseEther("1")
      );
      expect(await vault.balanceOf(farmer1.address)).to.be.equal(1000);
    });
  });
});
