import hre from "hardhat";
import { ERC20__factory, VaultV1 } from "../typechain-types";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { BigNumberish } from "ethers";
// import { Addressable } from "ethers";

const ethers = hre.ethers;

export type TokenBalance = {
  name: string;
  symbol: string;
  balance: string;
};

export const getUnderlyingTokenBalance = async (
  tokenAddress: string,
  accountAddress: string
): Promise<TokenBalance> => {
  const token = ERC20__factory.connect(tokenAddress, ethers.provider);
  const balance = await token.balanceOf(accountAddress);
  const decimals = await token.decimals();
  const symbol = await token.symbol();
  const name = await token.name();

  return {
    name,
    symbol,
    balance: ethers.formatUnits(balance, decimals),
  };
};

// export const pushArtifact = async (name: string, address: string | Addressable) => {
//   await hre.ethernal.push({
//     name: name,
//     address: address.toString(),
//   });
// }

export const depositToVault = async (
  _farmer: HardhatEthersSigner,
  _underlying: string,
  _vault: VaultV1,
  _amount: BigNumberish
) => {
  const underlying = ERC20__factory.connect(_underlying, ethers.provider);
  const decimal = await underlying.decimals();
  await underlying.connect(_farmer).approve(_vault.target, ethers.parseUnits(_amount.toString(), decimal));
  await _vault.connect(_farmer).deposit(ethers.parseUnits(_amount.toString(), decimal));
};
