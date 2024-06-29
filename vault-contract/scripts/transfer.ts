import { ethers } from "hardhat";
import { VAULT_LIST } from "./fork-mainnet-config";
import { ERC20__factory, VaultV1__factory } from "../typechain-types";
import { TokenBalance, getUnderlyingTokenBalance } from "./helpers";

async function main() {
  const signer = await ethers.getSigners();

  const governance = signer[0];

  const farmer = signer[1];
  const farmer2 = signer[3];

  const usdc = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48";
  const usdcToken = ERC20__factory.connect(usdc, farmer);
  await usdcToken.connect(farmer).transfer(farmer2.address, await usdcToken.balanceOf(farmer.address));
}

main().catch(console.error);