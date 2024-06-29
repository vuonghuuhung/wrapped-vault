export type VaultInfo = DisplayValue &
    VaultInfoInContract & {
        id: string;
        chain: string;
        name: string;
        logoUrl: string[];
        apyIconUrls: string[];
        apyTokenSymbols: string[];
        tokenNames: string[];
        platform: string[];
        tags: string[];
        tokenAddress: string;
        decimals: string;
        vaultAddress: string;
        strategyAddress: string;
        cmcRewardTokenSymbols: string[];
        estimatedAPY: string;
        estimatedAPYBreakdown: string[];
        dailyAPY: string;
        boostedEstimatedAPY: string | null;
        usdPrice: string;
        uniswapV3PositionId: string | null;
        uniswapV3UnderlyingTokenPrices: string[];
        uniswapV3ManagedData: string | null;
        inactive: boolean;
        rewardPool: string;
        depositToken: {
            name: string;
            address: string;
            decimal: number;
            usdPrice: string;
            imgUrl: string | null;
        };
        description: string;
    };

export type VaultInfoInContract = {
    vaultAddress: string;
    pricePerFullShare: string;
    underlyingBalanceWithInvestment: string;
    totalSupply: string;
    totalValueLocked: string;
    userBalance: string;
    vaultToken: {
        name: string;
        symbol: string;
    };
};

export type DisplayValue = {
    tvlUsd: string | undefined;
    balanceCompacted: string | undefined;
};

export type ControllerInfo = ControllerInfoInContract & ControllerInfoInBackend;

export type ControllerInfoInContract = {
    profitProtocolReceiver: string;
    profitProtocolNumerator: string;
    profitStrategistNumerator: string;
    implementationDelay: string;
    universalLiquidator: string;
    rewardForwarder: string;

    tempImplementationDelay: string;
    tempProfitProtocolNumerator: string;
    tempProfitStrategistNumerator: string;

    tempImplementationDelayTime: string;
    tempProfitProtocolNumeratorTime: string;
    tempProfitStrategistNumeratorTime: string;
};

export type ControllerInfoInBackend = {
    address: string;
    hardWorkers: string[];
    whiteList: string[];
};

export type StorageInfo = {
    address: string;
    governance: string;
    controller: string;
};

export type HardWorker = {
    address: string;
};

export type WhiteList = {
    address: string;
};

export type TxHistory = {
    block: number;
    eventName: string;
    txHash: string;
    from: string;
    to: string;
    date: string;
    logs: string;
    parsedLog: DepositWithdrawLog | InvestLog | null;
};

export type SharePriceChartData = {
    vault: string;
    sharePrice: string;
    timestamp: string;
};

export type DepositWithdrawLog = {
    depositor: string;
    assets: string;
    shares: string;
    shareSymbol: string;
    assetSymbol: string; 
}

export type InvestLog = {
    vaultInfo: VaultInfoChange;
    platformInfo: PlatformChangeLog;
    strategistInfo: StrategistChangeLog;
    rewardSymbol: string;
    rewardBalance: string;
}

export type VaultInfoChange = {
    newSharePrice: string;
    oldSharePrice: string;
    strategy: string;
    timestamp: string;
    vault: string;
}

export type PlatformChangeLog = {
    platformFee: string;
    platformFeeRecipient: string;
    rewardBalance: string;
    rewardToken: string;
    timestamp: string;
}

export type StrategistChangeLog = {
    rewardBalance: string;
    rewardToken: string;
    strategistFee: string;
    timestamp: string;
    strategist: string | null;
}
