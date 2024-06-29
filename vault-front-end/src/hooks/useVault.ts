import { useQuery } from '@tanstack/react-query';
import vaultApi from 'src/apis/vault.api';
import { DisplayValue, VaultInfo, VaultInfoInContract } from 'src/types/vault.type';
import { ContractClient } from 'src/utils/ContractClient';
import { formatWithDecimal } from 'src/utils/decimal';
import { VaultV1__factory } from 'vault-contract-sdk';

export const useVault = ({ address, user }: { address?: string; user?: string }) => {
    const { data: vaultInfos, isLoading } = useQuery({
        queryKey: ['vault-list', user],
        queryFn: () => getVaultInfos(user),
        enabled: !!user,
    });

    const { data: vaultDetail, isLoading: isLoadingDetail, isFetching: isFetchingVaultDetail } = useQuery({
        queryKey: ['vault-detail'],
        queryFn: () => getVaultDetail(address, user),
        // enabled: !!address && !!user,
    });

    return {
        vaultInfos,
        isLoading,
        vaultDetail,
        isLoadingDetail,
        isFetchingVaultDetail
    };
};

export const getVaultInfoFromContract = async (vault: string, user?: string): Promise<VaultInfoInContract> => {
    try {
        const reader = ContractClient.getReader();
        const vaultContract = VaultV1__factory.connect(vault, ContractClient.getProvider());
        const name = await vaultContract.name();
        const symbol = await vaultContract.symbol();

        const sharePrice = (await reader.vaultSharePrices([vault]))[0];
        const underlyingBalanceWithInvestment = (await reader.underlyingBalancesWithInvestment([vault]))[0];
        const totalSupply = (await reader.totalSupplies([vault]))[0];

        let userBalance = 0n;
        if (user) {
            userBalance = (await reader.underlyingBalanceWithInvestmentForHolder(user, [vault]))[0];
        }

        const vaultInfoFromContract: VaultInfoInContract = {
            vaultAddress: vault,
            pricePerFullShare: sharePrice.toString(),
            underlyingBalanceWithInvestment: underlyingBalanceWithInvestment.toString(),
            totalSupply: totalSupply.toString(),
            totalValueLocked: underlyingBalanceWithInvestment.toString(),
            userBalance: userBalance.toString(),
            vaultToken: {
                name,
                symbol,
            },
        };

        return vaultInfoFromContract;
    } catch (error) {
        console.error('Error getting vault info from contract', error);
        throw error;
    }
};

export const getVaultInfos = async (user?: string): Promise<VaultInfo[]> => {
    try {
        const vaultInfosFromBackEnd = await vaultApi.getAllVault();
        const vaultInfos = await Promise.all(
            vaultInfosFromBackEnd.data.map(async (vaultInfo) => {
                vaultInfo.estimatedAPY = `${vaultInfo.estimatedAPY}%`;
                vaultInfo.dailyAPY = `${vaultInfo.dailyAPY}%`;
                let vaultInfoInContract: VaultInfoInContract;
                if (user) {
                    vaultInfoInContract = await getVaultInfoFromContract(vaultInfo.vaultAddress, user);
                } else {
                    vaultInfoInContract = await getVaultInfoFromContract(vaultInfo.vaultAddress);
                }
                const displayValue: DisplayValue = {
                    tvlUsd: `$${formatWithDecimal(
                        vaultInfoInContract.totalValueLocked,
                        vaultInfo.decimals,
                        vaultInfo.usdPrice,
                    )}`,
                    balanceCompacted: `$${formatWithDecimal(
                        vaultInfoInContract.userBalance,
                        vaultInfo.decimals,
                        vaultInfo.usdPrice,
                    )}`,
                };
                return { ...vaultInfo, ...vaultInfoInContract, ...displayValue };
            }),
        );

        return vaultInfos;
    } catch (error) {
        console.error('Error getting vault info', error);
        throw error;
    }
};

export const getVaultDetail = async (vaultAddress: string | undefined, user?: string): Promise<VaultInfo | null> => {
    try {
        console.log("refected");
        if (!vaultAddress) {
            return null;
        }

        const vaultInfoFromBackEnd = await vaultApi.getVault(vaultAddress);
        const vaultInfoInContract = await getVaultInfoFromContract(vaultAddress, user);
        const displayValue: DisplayValue = {
            tvlUsd: `$${formatWithDecimal(
                vaultInfoInContract.totalValueLocked,
                vaultInfoFromBackEnd.data.decimals,
                vaultInfoFromBackEnd.data.usdPrice,
            )}`,
            balanceCompacted: `$${formatWithDecimal(
                vaultInfoInContract.userBalance,
                vaultInfoFromBackEnd.data.decimals,
                vaultInfoFromBackEnd.data.usdPrice,
            )}`,
        };

        return { ...vaultInfoFromBackEnd.data, ...vaultInfoInContract, ...displayValue };
    } catch (error) {
        console.error('Error getting vault detail', error);
        throw error;
    }
};
