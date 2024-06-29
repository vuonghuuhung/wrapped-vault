import { useQuery } from '@tanstack/react-query';
import vaultApi from 'src/apis/vault.api';
import { DepositWithdrawLog, TxHistory } from 'src/types/vault.type';
import { ContractClient } from 'src/utils/ContractClient';
import { formatWithDecimal } from 'src/utils/decimal';
import { ERC20__factory } from 'vault-contract-sdk';

export const useUserTxHistory = ({ user, vault }: { user: string | undefined, vault: string | undefined }) => {
    const { data: historyInfo, isLoading, refetch, isFetching } = useQuery({
        queryKey: ['user-tx-history'],
        queryFn: () => getUserTxHistory(user, vault),
        enabled: !!user && !!vault,
    });

    return {
        historyInfo,
        isLoading,
        refetch,
        isFetching
    };
};

export const getUserTxHistory = async (user: string | undefined, vault: string | undefined): Promise<TxHistory[]> => {
    try {
        if (!user || !vault) {
            return [];
        }
        const txHistory = await vaultApi.getUserTxHistory(vault, user);

        const vaultInfo = (await vaultApi.getVault(vault)).data;
        const erc20QueryClient = ERC20__factory.connect(vaultInfo.vaultAddress, ContractClient.getProvider());
        const shareSymbol = await erc20QueryClient.symbol();

        txHistory.data.forEach((tx) => {
            const log = JSON.parse(tx.logs);
            const parsedLog: DepositWithdrawLog = {
                depositor: log.receiver,
                assetSymbol: vaultInfo.depositToken.name,
                shareSymbol: shareSymbol,
                assets: formatWithDecimal(log.assets, vaultInfo.depositToken.decimal.toString()),
                shares: formatWithDecimal(log.shares, vaultInfo.decimals.toString()),
            }
            tx.parsedLog = parsedLog;
        })

        console.log('txHistory', txHistory);

        return txHistory.data;
    } catch (error) {
        console.error('Error getting vault info from contract', error);
        throw error;
    }
};
