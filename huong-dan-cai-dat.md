# Hướng dẫn cài đặt 

## Chuẩn bị môi trường

Yêu cầu:
- FE: Chuẩn bị Browser có Metamask extension
- Docker
- Node version: 20.x.x
- Biến môi trường giống với file .env.example cho từng folder: vault-back-end và vault-contract

Install dependencies:
- Chạy `npm install` ở từng folder vault-back-end, vault-contract và vault-front-end để install các packages cần thiết

Build contracts: 
- Chạy `cd vault-contract && npx hardhat compile` để compile các smart contracts

```
cd vault-contract && npx hardhat compile
... warnings ... 
Generating typings for: 110 artifacts in dir: typechain-types for target: ethers-v6
Successfully generated 310 typings!
Compiled 106 Solidity files successfully (evm target: paris).
```


## Chạy thủ công

1. Khởi động Hardhat Node để chạy mạng local: `cd vault-contract && npx hardhat node`, node có rpc: localhost:8545

```
cd vault-contract && npx hardhat node
[Ethernal]  Authenticated with API token.
[Ethernal]  Using workspace "Hardhat Local Network"
[Ethernal]  Resetting workspace "Hardhat Local Network"...
[Ethernal]  Workspace "Hardhat Local Network" has been reset!
Started HTTP and WebSocket JSON-RPC server at http://127.0.0.1:8545/
```

2. Mở thêm 1 terminal triển khai hệ thống lên local network: `cd vault-contract && npm run deploy-contracts`

```
cd vault-contract && npm run deploy-contracts

> vault-contract-sdk@1.0.3 deploy-contracts
> npx hardhat run scripts/deployment.ts --network localhost --no-compile

Forking mainnet and starting deploy
Preparing accounts
Preparing manager
Storage deployed at:  0x273c507D8E21cDE039491B14647Fe9278D88e91D
{ governance: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266' }
Preparing factories
Deploying vaults
Deployed contracts
{
  GOVERNANCE: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  FARMER: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
  CONTROLLER: '0x798f111c92E38F102931F34D1e0ea7e671BDBE31',
  STORAGE: '0x273c507D8E21cDE039491B14647Fe9278D88e91D',
  UNIVERSAL_LIQUIDATOR_REGISTRY: '0x93B800CD7ACdcA13754624D4B1A2760A86bE0D1f',
  FEE_REWARD_FORWARDER: '0x8Aed6FE10dF3d6d981B101496C9c7245AE65cAEc',
  NOTIFY_HELPER: '0x3Af511B1bdD6A0377e23796aD6B7391d8De68636',
  REWARD_FORWARDER: '0x10537D7bD661C9c34F547b38EC662D6FD482Ae95',
  UNIVERSAL_LIQUIDATOR: '0xBD2fe040D03EB1d1E5A151fbcc19A03333223019',
  MEGA_FACTORY: '0xA496E0071780CF57cd699cb1D5Ac0CdCD6cCD673',
  POT_POOL_FACTORY: '0x4E76FbE44fa5Dae076a7f4f676250e7941421fbA',
  REGULAR_VAULT_FACTORY: '0x00B0517de6b2b09aBD3a7B69d66D85eFdb2c7d94',
  UPGRADABLE_STRATEGY_FACTORY: '0x49AeF2C4005Bf572665b09014A563B5b9E46Df21',
  OWNABLE_WHITELIST: '0xa9efDEf197130B945462163a0B852019BA529a66',
  READER: '0xA3b48c7b901fede641B596A4C10a4630052449A6',
  COMPOUND_VAULT: '0x6ef58f48120a3D2FcEFBE5880Af97201e86c99CD',
  CONVEX_3CRV_VAULT: '0x9c97fFfb9860AaEe3C5Fc464F8c45D9866E20D95',
  CONVEX_CRVUSDUSD_VAULT: '0x94ab5aDE0F93ed4304c37e5bB089E7ee6a825cF7',
  CONVEX_CVXCRV_VAULT: '0x3060A9876FcA4415635454544C882b3F32A47cD5',
  CONVEX_OETH_VAULT: '0xA9C36e8e1E2EE1a159024B74C49F36f3B3Ab7012',
  CONVEX_STETH_VAULT: '0x9Ea3D73703EcD6cE4E801AF58dE7f3A328fF9070',
  IDLE_DAI_VAULT: '0x50076ad711E01babe374ccF94a25c3c5ec754774',
  IDLE_USDC_VAULT: '0x67AA10451c01fecF8c29aa0c401037071Efa1F02',
  IDLE_USDT_VAULT: '0xF0Aa60d73032FaC6Cd9CFD2EDa9e1118D3c79593',
  YEL_WETH_VAULT: '0x8ed104A8399456fCA008aaC07F6b6f0DA5A05C9D'
}
{ balanceWETH: 28065922751838762108435n }
```

3. Mở terminal mới chạy back-end: `cd vault-back-end && npm run start`, back-end chạy ở cồng 3001 

```
cd vault-back-end && npm run start

> vault-back-end@0.0.1 start
> nest start

...
[Nest] 18658  - 06/30/2024, 12:27:36 PM     LOG [NestApplication] Nest application successfully started +672ms
cron share price: 84.903ms
```

4. Mở terminal mới chạy front-end: `cd vault-front-end && npm run dev`, front-end chạy ở cổng 3000 

```
cd vault-front-end && npm run dev

> projectgraduation@0.0.0 dev
> vite


  VITE v5.2.10  ready in 134 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: http://192.168.0.114:3000/
  ➜  press h + enter to show help
```

## Sử dụng Docker

Chạy `docker compose up -d` để build và chạy các container cần thiết

- vault-contract port: 8545
- vault-back-end port: 3001
- vault-front-end port: 3000