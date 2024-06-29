import { HardWorker, SharePriceChartData, TxHistory, VaultInfo, WhiteList } from 'src/types/vault.type';
import http from 'src/utils/http';

export const URL_GET_ALL_VAULTS = '/vaults';
export const URL_GET_ALL_HARD_WORKERS = '/hard-worker';
export const URL_GET_ALL_WHITE_LIST = '/white-list';
export const URL_GET_USER_TX_HISTORY = '/tx-history';
export const URL_GET_SHARE_PRICE_DATA = '/share-price-crawler';

const vaultApi = {
    getAllVault() {
        return http.get<VaultInfo[]>(URL_GET_ALL_VAULTS);
    },
    getVault(id: string) {
        return http.get<VaultInfo>(`${URL_GET_ALL_VAULTS}/${id}`);
    },
    getHardWotkers() {
        return http.get<HardWorker[]>(`${URL_GET_ALL_HARD_WORKERS}`);
    },
    getWhiteList() {
        return http.get<WhiteList[]>(`${URL_GET_ALL_WHITE_LIST}`);
    },
    getUserTxHistory(vault: string, address: string) {
        return http.get<TxHistory[]>(`${URL_GET_USER_TX_HISTORY}/user-history?vaullt=${vault}&address=${address}`);
    },
    getInvestHistory(vault: string) {
        return http.get<TxHistory[]>(`${URL_GET_USER_TX_HISTORY}/invest-history?vault=${vault}`);
    },
    getSharePriceData(vault: string) {
        return http.get<SharePriceChartData[]>(`${URL_GET_SHARE_PRICE_DATA}?vault=${vault}`);
    }
};

export default vaultApi;
