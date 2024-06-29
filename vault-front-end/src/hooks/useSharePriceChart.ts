import { useQuery } from '@tanstack/react-query';
import vaultApi from 'src/apis/vault.api';
import { SharePriceChartData } from 'src/types/vault.type';

export const useSharePriceChart = (vault: string) => {
    const { data: historyInfo, isLoading } = useQuery({
        queryKey: ['share-price-chart'],
        queryFn: () => getSharePriceChart(vault),
        enabled: !!vault,
        refetchInterval: 7000
    });

    return {
        historyInfo,
        isLoading,
    };
};

export const getSharePriceChart = async (vault: string | undefined): Promise<SharePriceChartData[]> => {
    try {
        if (!vault) {
            return [];
        }
        const chartData = await vaultApi.getSharePriceData(vault);
        return chartData.data;
    } catch (error) {
        console.error('Error getting vault info from contract', error);
        throw error;
    }
};
