export default {
  // TOKENS
  WETH_TOKEN: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  COMP_TOKEN: "0xc00e94Cb662C3520282E6f5717214004A7f26888",
  FARM_TOKEN: "0xa0246c9032bC3A600820415aE600c6388619A14D",
  IFARM_TOKEN: "0x1571eD0bed4D987fe2b498DdBaE7DFA19519F651",
  CRV_TOKEN: "0xD533a949740bb3306d119CC777fa900bA034cd52",
  CVX_TOKEN: "0x4e3FBD56CD56c3e72c1403e103b45Db9da5B9D2B",
  USDC_TOKEN: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  CURVE_3CRV_TOKEN: "0x6c3F90f043a72FA612cbac8115EE7e52BDe6E490",
  CURVE_USD_USDC_TOKEN: "0x4DEcE678ceceb27446b35C672dC7d61F30bAD69E",
  CURVE_CVX_ETH_TOKEN: "0x3A283D9c08E8b55966afb64C515f5143cf907611",
  CURVE_CVX_CRV_TOKEN: "0x62B9c7356A2Dc64a1969e19C23e4f579F9810Aa7",
  CURVE_OETH_TOKEN: "0x94B17476A93b3262d87B9a326965D1E91f9c13E7",
  CURVE_STETH_TOKEN: "0x21E27a5E5513D6e65C4f830167390997aA84843a",
  DAI_TOKEN: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
  IDLE_TOKEN: "0x3fE7940616e5Bc47b0775a0dccf6237893353bB4",
  USDT_TOKEN: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
  YEL_TOKEN: "0x7815bDa662050D84718B988735218CFfd32f75ea",
  SUSHI_LP_TOKEN: "0xc83cE8612164eF7A13d17DDea4271DD8e8EEbE5d",

  // WHALES
  SUSHI_LP_WHALE: "0x3D42F3561c5bEfF78D3d2Bd08B2AC59F8d82C26A",
  USDT_WHALE: "0xF977814e90dA44bFA03b6295A0616a897441aceC",
  USDC_WHALE: "0x4B16c5dE96EB2117bBE5fd171E4d203624B014aa",
  DAI_WHALE: "0x47ac0Fb4F2D84898e4D9E7b4DaB3C24507a6D503",
  CURVE_STETH_WHALE: "0x9226ADf269B1869A2fe54Cabe1f72f6c01D996Fa",
  CURVE_OETH_WHALE: "0x69e078EBc4631E1947F0c38Ef0357De7ED064644",
  CURVE_CVX_CRV_WHALE: "0x5EC68A1A5a742B24c7B20ff19e375361A1ca279B",
  CURVE_CVX_ETH_WHALE: "0x14D2f4D1b0B5A7bB98b8Ec62Eb3723d461ffBcD2",
  CURVE_USD_USDC_WHALE: "0xbabe61887f1de2713c6f97e567623453d3C79f67",
  CURVE_3CRV_WHALE: "0xD2c828D44e4331defE8b9ED949ADAF187f1dc85E",
  WETH_WHALE: "0x8EB8a3b98659Cce290402893d0123abb75E3ab28",

  // VAULTS-HARDHAT-NETWORK
  COMPOUND_VAULT: "0xe801322B365Be16CD1150F8699E9Acb89927C60B",
  CONVEX_3CRV_VAULT: "0xBf014B8b21b5e7d48D1C718d71135E623Dba68BB",
  CONVEX_CRVUSDUSD_VAULT: "0xB85Df6ADd7578d90bF7af5559af17044EFf0267f",
  CONVEX_CVXCRV_VAULT: "0x99261dBD1d0BC111C27D84Bde6067d41665B28Fe",
  CONVEX_OETH_VAULT: "0xb5d29d839869Dff1E00b7F96b12fB275179AEeD2",
  CONVEX_STETH_VAULT: "0xFff1Ec7b38B27d9166E5a1Fade5196664C587343",
  IDLE_DAI_VAULT: "0x79307ef448577DEC24E78801c83094A8a707B89B",
  IDLE_USDC_VAULT: "0x486BAabd11C7b6C0a2B98362534aA53B46AaadCD",
  IDLE_USDT_VAULT: "0x6de7e16A010AF5FC9FBE99a181669538BF375b55",
  YEL_WETH_VAULT: "0x08Ffb144e8821483E82D19365517afE1666F678D",
};

export const VAULT_LIST = [
  {
    name: "compound-weth",
    vault: "0xe801322B365Be16CD1150F8699E9Acb89927C60B",
  },
  {
    name: "convex-3crv",
    vault: "0xBf014B8b21b5e7d48D1C718d71135E623Dba68BB",
  },
  {
    name: "convex-crvusd-usdc",
    vault: "0xB85Df6ADd7578d90bF7af5559af17044EFf0267f",
  },
  {
    name: "convex-cvxcrv",
    vault: "0x99261dBD1d0BC111C27D84Bde6067d41665B28Fe",
  },
  {
    name: "convex-oeth",
    vault: "0xb5d29d839869Dff1E00b7F96b12fB275179AEeD2",
  },
  {
    name: "convex-steth",
    vault: "0xFff1Ec7b38B27d9166E5a1Fade5196664C587343",
  },
  {
    name: "idle-dai",
    vault: "0x79307ef448577DEC24E78801c83094A8a707B89B",
  },
  {
    name: "idle-usdc",
    vault: "0x486BAabd11C7b6C0a2B98362534aA53B46AaadCD",
  },
  {
    name: "idle-usdt",
    vault: "0x6de7e16A010AF5FC9FBE99a181669538BF375b55",
  },
  {
    name: "yel-weth",
    vault: "0x08Ffb144e8821483E82D19365517afE1666F678D",
  },
];
