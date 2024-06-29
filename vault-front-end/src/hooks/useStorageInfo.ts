import { useQuery } from '@tanstack/react-query';
import { StorageInfo } from 'src/types/vault.type';
import { ContractClient } from 'src/utils/ContractClient';

export const useStorageInfo = () => {
    const { data: storageInfo, isLoading } = useQuery({
        queryKey: ['storage-info'],
        queryFn: () => getStorageInfo(),
    });

    return {
        storageInfo,
        isStorageLoading: isLoading,
    };
};

export const getStorageInfo = async (): Promise<StorageInfo> => {
    try {
        const storage = ContractClient.getStorage();
        const controller = await storage.controller();
        const governance = await storage.governance();

        return {
            address: storage.target.toString(),
            controller: controller,
            governance: governance,
        };
    } catch (error) {
        console.error('Error getting vault info from contract', error);
        throw error;
    }
};
