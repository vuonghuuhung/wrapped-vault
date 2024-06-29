import { useQuery } from '@tanstack/react-query';
import vaultApi from 'src/apis/vault.api';
import { InvestLog, PlatformChangeLog, StrategistChangeLog, TxHistory, VaultInfoChange } from 'src/types/vault.type';
import { ContractClient } from 'src/utils/ContractClient';
import { formatWithDecimal } from 'src/utils/decimal';
import { BaseUpgradeableStrategyStorage__factory, ERC20__factory } from 'vault-contract-sdk';

export const useInvestHistory = (vault: string) => {
    const { data: historyInfo, isLoading } = useQuery({
        queryKey: ['invest-history'],
        queryFn: () => getInvestHistory(vault),
        enabled: !!vault,
    });

    return {
        historyInfo,
        isLoading,
    };
};

export const getInvestHistory = async (vault: string | undefined): Promise<TxHistory[]> => {
    try {
        if (!vault) {
            return [];
        }
        const txHistory = await vaultApi.getInvestHistory(vault);

        const parseTxHistory = await Promise.all(txHistory.data.map(async (tx) => {
            const log = JSON.parse(tx.logs);
            const [vaultInfo, platformInfo, strategistInfo] = log;
            const rewardToken = ERC20__factory.connect(platformInfo.rewardToken, ContractClient.getProvider());
            (platformInfo as PlatformChangeLog).platformFee = formatWithDecimal(platformInfo.platformFee, (await rewardToken.decimals()).toString());
            (strategistInfo as StrategistChangeLog).strategistFee = formatWithDecimal(strategistInfo.strategistFee, (await rewardToken.decimals()).toString());
            const strategy = BaseUpgradeableStrategyStorage__factory.connect((vaultInfo as VaultInfoChange).strategy, ContractClient.getProvider());
            const strategist = await strategy.strategist();
            (strategistInfo as StrategistChangeLog).strategist = strategist;
            const parsedLog: InvestLog = {
                vaultInfo,
                platformInfo,
                strategistInfo,
                rewardSymbol: await rewardToken.symbol(),
                rewardBalance: formatWithDecimal(platformInfo.rewardBalance, (await rewardToken.decimals()).toString()),
            }
            tx.parsedLog = parsedLog;
            return tx;
        }));

        return parseTxHistory;
    } catch (error) {
        console.error('Error getting vault info from contract', error);
        throw error;
    }
};
