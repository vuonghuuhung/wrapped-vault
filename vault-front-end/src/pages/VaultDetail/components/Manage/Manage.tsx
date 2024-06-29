import { ToastAction } from '@radix-ui/react-toast';
import { useState } from 'react';
import Loading from 'src/components/Loading/Loading';
import { toast } from 'src/components/ui/use-toast';
import { useInvestHistory } from 'src/hooks/useInvestHistory';
import useStateSignContract from 'src/state/loadingSignContract';

import { InvestLog, VaultInfo } from 'src/types/vault.type';
import { doHardWork } from 'src/utils/ContractClient';
import { useEthersSigner } from 'src/utils/ethers';
import InvestHistory from '../InvestHistory';

const Manage = ({ vaultDetail }: { vaultDetail: VaultInfo }) => {
    const [selectedTx, setSelectedTx] = useState('');

    const toggleDetails = (txHash: string) => {
        if (selectedTx === txHash) {
            setSelectedTx('');
        } else {
            setSelectedTx(txHash);
        }
    };

    const signer = useEthersSigner({ chainId: 31337 });

    const { setIsLoadingSignContract } = useStateSignContract();

    const { historyInfo, isLoading } = useInvestHistory(vaultDetail.vaultAddress);

    const seeTransaction = (txHash: string) => {
        // open a new tab to see transaction
        window.open(`https://app.tryethernal.com/transaction/${txHash}`);
    };

    const invest = async () => {
        if (signer) {
            try {
                setIsLoadingSignContract(true);
                const tx = await doHardWork({
                    signer,
                    vaultAddress: vaultDetail.vaultAddress,
                });
                setIsLoadingSignContract(false);
                toast({
                    className: 'bg-black',
                    title: `Invest/Re-invest`,
                    description: `Successfully invested/re-invested`,
                    action: (
                        <ToastAction
                            className="bg-white-500 text-white"
                            altText="Click to see transaction"
                            onClick={() => seeTransaction(tx)}
                        >
                            See transaction
                        </ToastAction>
                    ),
                });
            } catch (error) {
                    setIsLoadingSignContract(false);
                    toast({
                        className: 'bg-red-500',
                        title: `Unauthorized`,
                        description: `${(error as any).message}`,
                    });
            }
        }
    };

    return (
        <>
            {vaultDetail && (
                <div>
                    <div className="grid grid-cols-4 gap-4 mv-[25px]">
                        <div className="boxContent p-6 h-[120px] flex justify-center flex-col col-span-1">
                            <h3 className="text-[#d9d9d9] text-[14px] font-medium text-center">Live APY</h3>
                            <h2 className="text-[22px] font-semibold text-center">{vaultDetail.estimatedAPY}%</h2>
                        </div>
                        <div className="boxContent p-6 h-[120px] flex justify-center flex-col col-span-1">
                            <h3 className="text-[#d9d9d9] text-[14px] font-medium text-center">Daily APY</h3>
                            <h2 className="text-[22px] font-semibold text-center">{vaultDetail.dailyAPY}%</h2>
                        </div>
                        <div className="boxContent p-6 h-[120px] flex justify-center flex-col col-span-1">
                            <h3 className="text-[#d9d9d9] text-[14px] font-medium text-center">TVL</h3>
                            <h2 className="text-[22px] font-semibold text-center">{vaultDetail.tvlUsd}</h2>
                        </div>
                        <div className="boxContent p-6 h-[120px] flex justify-center flex-col col-span-1">
                            <button
                                className="block w-full py-[8px] px-[18px] transition-all duration-250 text-center rounded-lg bg-[#15b088] hover:bg-[#2ccda4]"
                                onClick={() => invest()}
                            >
                                Invest For Vault
                            </button>
                        </div>
                    </div>
                    <div className="mt-[25px] flex justify-center gap-6">
                        {historyInfo && (
                            <div className="p-6 h-auto justify-center w-full rounded shadow-md">
                                <h1 className="block w-full text-center text-2xl font-bold mb-4 text-white">
                                    Transaction History
                                </h1>
                                <div className="flex flex-col space-y-4">
                                    {historyInfo.map((history) => (
                                        <div key={history.txHash} className="flex flex-col p-4 border rounded-lg">
                                            <div className="flex justify-between items-center">
                                                <div
                                                    className="w-2/6 text-sm cursor-pointer"
                                                    onClick={() => seeTransaction(history.txHash)}
                                                >
                                                    <p className="truncate">{history.txHash}</p>
                                                </div>
                                                <div className="w-1/6 text-sm">
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
                                                        {selectedTx === history.txHash
                                                            ? 'Hide Details'
                                                            : 'See Distribution detail'}
                                                    </button>
                                                </div>
                                            </div>
                                            {selectedTx === history.txHash && (
                                                <div className="text-sm mt-4 p-4 bg-gray-700 rounded-lg">
                                                    {history.parsedLog && (
                                                        <InvestHistory txHistory={history.parsedLog as InvestLog} />
                                                    )}
                                                    <hr className="border-t border-gray-600 my-2" />
                                                    <p>Raw:</p>
                                                    {history.logs &&
                                                        JSON.parse(history.logs).map((log: any, index: any) => (
                                                            <div key={index} className="mb-4 ml-5 mt-2">
                                                                {Object.entries(log).map(([key, value]) => (
                                                                    <p key={key} className="mb-2">
                                                                        <strong>{key}: </strong>
                                                                        {value as any}
                                                                    </p>
                                                                ))}
                                                                {index !== JSON.parse(history.logs).length - 1 && (
                                                                    <hr className="border-t border-gray-600 my-2" />
                                                                )}
                                                            </div>
                                                        ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {isLoading && (
                            <div className="fixed top-0 left-0 right-0 bottom-0 z-10 w-screen h-screen">
                                <Loading isSignContract />
                            </div>
                        )}
                    </div>
                </div>
            )}
            {!vaultDetail && (
                <div className="fixed top-0 left-0 right-0 bottom-0 z-10 w-screen h-screen">
                    <Loading isSignContract />
                </div>
            )}
        </>
    );
};

export default Manage;
