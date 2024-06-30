import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-network-helpers";
import "@nomicfoundation/hardhat-ethers";
import "@nomicfoundation/hardhat-verify";
import "hardhat-tracer";
import "hardhat-ethernal";
import "dotenv/config";

// import process.env from "./dev-process.env.json";
import { EthernalConfig } from "hardhat-ethernal/dist/types";

const ethernalConfig: EthernalConfig = {
  apiToken: process.env.ethernalApiKey,
  resetOnStart: "Hardhat Local Network",
  workspace: "Hardhat Local Network",
  disableSync: false,
  disableTrace: true,
  skipFirstBlock: false,
  verbose: false,
  disabled: false,
  uploadAst: false,
  email: "vuonghuuhung2002@gmail.com",
  password: process.env.ethernalPassword,
  serverSync: false,
};

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.24",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  networks: {
    hardhat: {
      forking: {
        url: "https://eth-mainnet.g.alchemy.com/v2/" + process.env.alchemyKeyMainnet,
        blockNumber: 19819900,
      },
      mining: {
        auto: true,
        interval: 2000,
      },
    },
    localhost: {
      url: process.env.HARDHAT_NODE_URL || "http://localhost:8545",
    }
  },
  mocha: {
    timeout: 100000000,
  },
  ethernal: ethernalConfig
};

export default config;
