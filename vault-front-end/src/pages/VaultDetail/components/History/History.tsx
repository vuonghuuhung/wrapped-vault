import Loading from 'src/components/Loading/Loading';
import { DepositWithdrawLog, VaultInfo } from 'src/types/vault.type';
import { useAccount } from 'wagmi';
import { useUserTxHistory } from 'src/hooks/useUserTxHistory';
import { useEffect, useState } from 'react';
import UserHistory from '../UserHistory';

const History = ({ vaultDetail }: { vaultDetail: VaultInfo }) => {
    const [selectedTx, setSelectedTx] = useState('');

    const toggleDetails = (txHash: string) => {
        if (selectedTx === txHash) {
            setSelectedTx('');
        } else {
            setSelectedTx(txHash);
        }
    };
    const account = useAccount();

    const { historyInfo, isLoading, refetch, isFetching } = useUserTxHistory({ user: account.address, vault: vaultDetail.vaultAddress });

    useEffect(() => {
        console.log("call refetch")
        refetch();
    }, [account.address])

    const seeTransaction = (txHash: string) => {
        // open a new tab to see transaction
        window.open(`https://app.tryethernal.com/transaction/${txHash}`);
    };

    return (
        <>
            {historyInfo && (
                <div className="p-6 h-auto justify-center max-w-7xl rounded shadow-md">
                    <h1 className="block w-full text-center text-2xl font-bold mb-4 text-white">Transaction History</h1>
                    <div className="flex flex-col space-y-4">
                        {historyInfo.map((history) => (
                            <div key={history.txHash} className="flex flex-col p-4 border rounded-lg">
                                <div key={history.txHash} className="flex justify-between items-center">
                                    <div className="w-1/6 text-sm">
                                        <p
                                            className="truncate cursor-pointer"
                                            onClick={() => seeTransaction(history.txHash)}
                                        >
                                            {history.txHash}
                                        </p>
                                    </div>
                                    <div className="text-sm">
                                        <p>{history.eventName}</p>
                                    </div>
                                    <div className="w-1/6 text-sm">
                                        <p>{history.date}</p>
                                    </div>
                                    <div className="w-1/6 text-sm">
                                        <button
                                            className="block w-auto py-[8px] px-[18px] transition-all duration-250 text-center rounded-lg bg-[#15b088] hover:bg-[#2ccda4]"
                                            onClick={() => toggleDetails(history.txHash)}
                                        >
                                            {selectedTx === history.txHash ? 'Hide Detail' : 'See Detail'}
                                        </button>
                                    </div>
                                </div>

                                {selectedTx === history.txHash && (
                                    <div className="text-sm mt-4 p-4 bg-gray-700 rounded-lg">
                                        {history.parsedLog && <UserHistory txHistory={history.parsedLog as DepositWithdrawLog} />}
                                        <hr className="border-t border-gray-600 my-2" />
                                        {history.logs && <p>Raw: {Object.keys(JSON.parse(history.logs)).map((attr, index) => {
                                            return <div>
                                                <p className='ml-4 mt-2'>{attr}: {JSON.parse(history.logs)[attr]}</p>
                                                {index !== JSON.parse(history.logs).length - 1 && <br/>}
                                            </div>;
                                        })}</p>}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {isLoading || isFetching && (
                <div className="fixed top-0 left-0 right-0 bottom-0 z-10 w-screen h-screen">
                    <Loading isSignContract />
                </div>
            )}
        </>
    );
};

export default History;
