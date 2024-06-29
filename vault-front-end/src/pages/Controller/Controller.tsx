import { ToastAction } from '@radix-ui/react-toast';
import { useState } from 'react';
import Loading from 'src/components/Loading/Loading';
import { toast } from 'src/components/ui/use-toast';
import { useControllerInfo } from 'src/hooks/useControllerInfo';
import { useStorageInfo } from 'src/hooks/useStorageInfo';
import useStateSignContract from 'src/state/loadingSignContract';
import {
    addHardWorker,
    addToWhiteList,
    confirmImplementationDelay,
    confirmProtocolFeeNumerator,
    confirmStrategistFeeNumerator,
    removeFromWhiteList,
    removeHardWorker,
    setController,
    setGovernance,
    setImplementationDelay,
    setProtocolFeeNumerator,
    setRewardForwarder,
    setStrategistFeeNumerator,
    setUniversalLiquidator,
} from 'src/utils/ContractClient';
import { useEthersSigner } from 'src/utils/ethers';

const Controller = () => {
    const { controllerInfos, isLoading, blockTime } = useControllerInfo();
    const { storageInfo, isStorageLoading } = useStorageInfo();

    const [newHardWorker, setNewHardWorker] = useState<string>('');
    const [removeNewHardWorker, setRemoveNewHardWorker] = useState<string>('');
    const [newAddress, setNewAddress] = useState<string>('');
    const [removeAddress, setRemoveAddress] = useState<string>('');
    const [newUniversalLiquidator, setNewUniversalLiquidator] = useState<string>('');
    const [newRewardForwarder, setNewRewardForwarder] = useState<string>('');
    const [newGovernance, setNewGovernance] = useState<string>('');
    const [newController, setNewController] = useState<string>('');
    const [newImplementationDelay, setNewImplementationDelay] = useState<string>('');
    const [newProtocolFeeNumerator, setNewProtocolFeeNumerator] = useState<string>('');
    const [newStrategistFeeNumerator, setNewStrategistFeeNumerator] = useState<string>('');

    const signer = useEthersSigner({ chainId: 31337 });

    const { setIsLoadingSignContract } = useStateSignContract();

    const seeAddress = (address: string) => {
        // open a new tab to see transaction
        window.open(`https://app.tryethernal.com/address/${address}`);
    };

    const seeTransaction = (txHash: string) => {
        // open a new tab to see transaction
        window.open(`https://app.tryethernal.com/transaction/${txHash}`);
    };

    const handleAddHardWorker = async () => {
        try {
            if (signer && newHardWorker != '') {
                try {
                    setIsLoadingSignContract(true);
                    const tx = await addHardWorker({ signer, worker: newHardWorker });
                    console.log(tx);
                    setIsLoadingSignContract(false);
                    toast({
                        className: 'bg-black',
                        title: `Update Global Config`,
                        description: `New hard worker added`,
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
                        title: `Update config failed`,
                        description: `${(error as any).message}`,
                    });
                }
            }
        } catch (error) {
            console.error('Error adding hard worker', error);
        }
    };

    const handleSetNewImplementationDelay = async () => {
        try {
            if (signer && newImplementationDelay != '') {
                try {
                    setIsLoadingSignContract(true);
                    const tx = await setImplementationDelay({ signer, delay: newImplementationDelay });
                    console.log(tx);
                    setIsLoadingSignContract(false);
                    toast({
                        className: 'bg-black',
                        title: `Update Global Config`,
                        description: `New implementation delay queued`,
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
                        title: `Update config failed`,
                        description: `${(error as any).message}`,
                    });
                }
            }
        } catch (error) {
            console.error('Error adding hard worker', error);
        }
    };

    const handleSetNewProtocolFeeNumerator = async () => {
        try {
            if (signer && newProtocolFeeNumerator != '') {
                try {
                    setIsLoadingSignContract(true);
                    const tx = await setProtocolFeeNumerator({ signer, numerator: newProtocolFeeNumerator });
                    console.log(tx);
                    setIsLoadingSignContract(false);
                    toast({
                        className: 'bg-black',
                        title: `Update Global Config`,
                        description: `New protocol fee numerator queued`,
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
                        title: `Update config failed`,
                        description: `${(error as any).message}`,
                    });
                }
            }
        } catch (error) {
            console.error('Error adding hard worker', error);
        }
    };

    const handleSetNewStrategistFeeNumerator = async () => {
        try {
            if (signer && newStrategistFeeNumerator != '') {
                try {
                    setIsLoadingSignContract(true);
                    const tx = await setStrategistFeeNumerator({ signer, numerator: newStrategistFeeNumerator });
                    console.log(tx);
                    setIsLoadingSignContract(false);
                    toast({
                        className: 'bg-black',
                        title: `Update Global Config`,
                        description: `New strategist fee numerator queued`,
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
                        title: `Update config failed`,
                        description: `${(error as any).message}`,
                    });
                }
            }
        } catch (error) {
            console.error('Error adding hard worker', error);
        }
    };

    const handleConfirmNewProtocolFeeNumerator = async () => {
        try {
            if (signer) {
                try {
                    setIsLoadingSignContract(true);
                    const tx = await confirmProtocolFeeNumerator({ signer });
                    console.log(tx);
                    setIsLoadingSignContract(false);
                    toast({
                        className: 'bg-black',
                        title: `Update Global Config`,
                        description: `New protocol fee numerator confirmed`,
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
                        title: `Update config failed`,
                        description: `${(error as any).message}`,
                    });
                }
            }
        } catch (error) {
            console.error('Error adding hard worker', error);
        }
    };

    const handleConfirmNewStrategistFeeNumerator = async () => {
        try {
            if (signer) {
                try {
                    setIsLoadingSignContract(true);
                    const tx = await confirmStrategistFeeNumerator({ signer });
                    console.log(tx);
                    setIsLoadingSignContract(false);
                    toast({
                        className: 'bg-black',
                        title: `Update Global Config`,
                        description: `New strategist fee numerator confirmed`,
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
                        title: `Update config failed`,
                        description: `${(error as any).message}`,
                    });
                }
            }
        } catch (error) {
            console.error('Error adding hard worker', error);
        }
    };

    const handleRemoveHardWorker = async () => {
        try {
            if (signer && removeNewHardWorker != '') {
                try {
                    setIsLoadingSignContract(true);
                    const tx = await removeHardWorker({ signer, worker: removeNewHardWorker });
                    console.log(tx);
                    setIsLoadingSignContract(false);
                    toast({
                        className: 'bg-black',
                        title: `Update Global Config`,
                        description: `Hard worker removed`,
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
                        title: `Update config failed`,
                        description: `${(error as any).message}`,
                    });
                }
            }
        } catch (error) {
            console.error('Error adding hard worker', error);
        }
    };

    const handleSetNewUniversalLiquidator = async () => {
        try {
            if (signer && newUniversalLiquidator != '') {
                try {
                    setIsLoadingSignContract(true);
                    const tx = await setUniversalLiquidator({ signer, address: newUniversalLiquidator });
                    console.log(tx);
                    setIsLoadingSignContract(false);
                    toast({
                        className: 'bg-black',
                        title: `Update Global Config`,
                        description: `New universal liquidator set`,
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
                        title: `Update config failed`,
                        description: `${(error as any).message}`,
                    });
                }
            }
        } catch (error) {
            console.error('Error adding hard worker', error);
        }
    };

    const handleSetNewRewardForwarder = async () => {
        try {
            if (signer && newRewardForwarder != '') {
                try {
                    setIsLoadingSignContract(true);
                    const tx = await setRewardForwarder({ signer, address: newRewardForwarder });
                    console.log(tx);
                    setIsLoadingSignContract(false);
                    toast({
                        className: 'bg-black',
                        title: `Update Global Config`,
                        description: `New reward forwarder set`,
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
                        title: `Update config failed`,
                        description: `${(error as any).message}`,
                    });
                }
            }
        } catch (error) {
            console.error('Error adding hard worker', error);
        }
    };

    const handleSetNewGovernance = async () => {
        try {
            if (signer && newGovernance != '') {
                try {
                    setIsLoadingSignContract(true);
                    const tx = await setGovernance({ signer, address: newGovernance });
                    console.log(tx);
                    setIsLoadingSignContract(false);
                    toast({
                        className: 'bg-black',
                        title: `Update Global Config`,
                        description: `New governance set`,
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
                        title: `Update config failed`,
                        description: `${(error as any).message}`,
                    });
                }
            }
        } catch (error) {
            console.error('Error adding hard worker', error);
        }
    };

    const handleSetNewController = async () => {
        try {
            if (signer && newController != '') {
                try {
                    setIsLoadingSignContract(true);
                    const tx = await setController({ signer, address: newController });
                    console.log(tx);
                    setIsLoadingSignContract(false);
                    toast({
                        className: 'bg-black',
                        title: `Update Global Config`,
                        description: `New controller set`,
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
                        title: `Update config failed`,
                        description: `${(error as any).message}`,
                    });
                }
            }
        } catch (error) {
            console.error('Error adding hard worker', error);
        }
    };

    const handleAddToWhiteList = async () => {
        try {
            if (signer && newAddress != '') {
                try {
                    setIsLoadingSignContract(true);
                    const tx = await addToWhiteList({ signer, address: newAddress });
                    console.log(tx);
                    setIsLoadingSignContract(false);
                    toast({
                        className: 'bg-black',
                        title: `Update Global Config`,
                        description: `New address added to white list`,
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
                        title: `Update config failed`,
                        description: `${(error as any).message}`,
                    });
                }
            }
        } catch (error) {
            console.error('Error adding hard worker', error);
        }
    };

    const handleRemoveFromWhiteList = async () => {
        try {
            if (signer && removeAddress != '') {
                try {
                    setIsLoadingSignContract(true);
                    const tx = await removeFromWhiteList({ signer, address: removeAddress });
                    console.log(tx);
                    setIsLoadingSignContract(false);
                    toast({
                        className: 'bg-black',
                        title: `Update Global Config`,
                        description: `Address removed from white list`,
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
                        title: `Update config failed`,
                        description: `${(error as any).message}`,
                    });
                }
            }
        } catch (error) {
            console.error('Error adding hard worker', error);
        }
    };

    const handleConfirmNewImplementationDelay = async () => {
        try {
            if (signer) {
                try {
                    setIsLoadingSignContract(true);
                    const tx = await confirmImplementationDelay({ signer });
                    console.log(tx);
                    setIsLoadingSignContract(false);
                    toast({
                        className: 'bg-black',
                        title: `Update Global Config`,
                        description: `New implementation delay confirmed`,
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
                        title: `Update config failed`,
                        description: `${(error as any).message}`,
                    });
                }
            }
        } catch (error) {
            console.error('Error adding hard worker', error);
        }
    };

    return (
        <div>
            {controllerInfos && storageInfo && (
                <div className="min-h-screen p-10 bg-bgMain">
                    <div className="bg-bgMain p-6 rounded shadow-md">
                        <h1 className="text-2xl font-bold mb-4 text-white">Controller configurations</h1>
                        <p className="mb-6 text-white" onClick={() => seeAddress(controllerInfos.address)}>
                            Contract address: {controllerInfos.address}
                        </p>

                        <div className="mb-10">
                            <h2 className="text-xl font-semibold mb-2 text-white">Hard Worker Data</h2>
                            <p className="mb-4 text-white">Hard Worker addresses: </p>
                            <ul>
                                {controllerInfos.hardWorkers.map((worker, index) => (
                                    <li key={index} className="text-white" onClick={() => seeAddress(worker)}>
                                        {worker}
                                    </li>
                                ))}
                            </ul>
                            <div className="mb-4">
                                <div className="flex items-center h-full rounded-[10px] overflow-hidden  border border-borderConnectBtn outline-none">
                                    <input
                                        type="text"
                                        value={newHardWorker}
                                        onChange={(e) => setNewHardWorker(e.target.value)}
                                        placeholder="Hard Worker address"
                                        className="block h-full bg-bgButton flex-1 py-[9px] px-[10px] text-[14px] "
                                    />
                                    <button
                                        onClick={handleAddHardWorker}
                                        className="grid place-items-center px-[18px] py-2 bg-[#15b088] hover:bg-[#2ccda4] h-full"
                                    >
                                        Add new Hard Worker
                                    </button>
                                </div>
                            </div>
                            <div className="mb-4">
                                <div className="flex items-center h-full rounded-[10px] overflow-hidden  border border-borderConnectBtn outline-none">
                                    <input
                                        type="text"
                                        value={removeNewHardWorker}
                                        onChange={(e) => setRemoveNewHardWorker(e.target.value)}
                                        placeholder="Hard Worker address"
                                        className="block h-full bg-bgButton flex-1 py-[9px] px-[10px] text-[14px] "
                                    />
                                    <button
                                        onClick={handleRemoveHardWorker}
                                        className="grid place-items-center px-[18px] py-2 bg-[#15b088] hover:bg-[#2ccda4] h-full"
                                    >
                                        Remove Hard Worker
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="mb-10">
                            <h2 className="text-xl font-semibold mb-2 text-white">White list</h2>
                            <p className="mb-4 text-white">White list addresses: </p>
                            <ul>
                                {controllerInfos.whiteList.map((address, index) => (
                                    <li key={index} className="text-white" onClick={() => seeAddress(address)}>
                                        {address}
                                    </li>
                                ))}
                            </ul>
                            <div className="mb-4">
                                <div className="flex items-center h-full rounded-[10px] overflow-hidden  border border-borderConnectBtn outline-none">
                                    <input
                                        type="text"
                                        value={newAddress}
                                        onChange={(e) => setNewAddress(e.target.value)}
                                        placeholder="Address"
                                        className="block h-full bg-bgButton flex-1 py-[9px] px-[10px] text-[14px] "
                                    />
                                    <button
                                        onClick={handleAddToWhiteList}
                                        className="grid place-items-center px-[18px] py-2 bg-[#15b088] hover:bg-[#2ccda4] h-full"
                                    >
                                        Add address to white list
                                    </button>
                                </div>
                            </div>
                            <div className="mb-4">
                                <div className="flex items-center h-full rounded-[10px] overflow-hidden  border border-borderConnectBtn outline-none">
                                    <input
                                        type="text"
                                        value={removeAddress}
                                        onChange={(e) => setRemoveAddress(e.target.value)}
                                        placeholder="Address"
                                        className="block h-full bg-bgButton flex-1 py-[9px] px-[10px] text-[14px] "
                                    />
                                    <button
                                        onClick={handleRemoveFromWhiteList}
                                        className="grid place-items-center px-[18px] py-2 bg-[#15b088] hover:bg-[#2ccda4] h-full"
                                    >
                                        Remove address from white list
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="mb-10">
                            <h2 className="text-xl font-semibold mb-2 text-white">Fee Config</h2>
                            <p
                                className="mb-4 text-white"
                                onClick={() => seeAddress(controllerInfos.profitProtocolReceiver)}
                            >
                                Profit protocol receiver: {controllerInfos.profitProtocolReceiver}
                            </p>
                            {controllerInfos.tempProfitProtocolNumerator == '0' ? (
                                <p className="mb-4 text-white">
                                    Profit protocol numerator: {controllerInfos.profitProtocolNumerator}
                                </p>
                            ) : (
                                <div>
                                    <p className="mb-4 text-white">
                                        Temp profit protocol numerator: {controllerInfos.tempProfitProtocolNumerator}
                                    </p>
                                    <p className="mb-4 text-white">
                                        Temp profit protocol numerator time:{' '}
                                        {controllerInfos.tempProfitProtocolNumeratorTime} - Current time: {blockTime}
                                    </p>
                                </div>
                            )}
                            {controllerInfos.tempProfitProtocolNumerator == '0' ? (
                                <div className="mb-4">
                                    <div className="flex items-center h-full rounded-[10px] overflow-hidden  border border-borderConnectBtn outline-none">
                                        <input
                                            type="text"
                                            value={newProtocolFeeNumerator}
                                            onChange={(e) => setNewProtocolFeeNumerator(e.target.value)}
                                            placeholder="New numerator"
                                            className="block h-full bg-bgButton flex-1 py-[9px] px-[10px] text-[14px] "
                                        />
                                        <button
                                            onClick={handleSetNewProtocolFeeNumerator}
                                            className="grid place-items-center px-[18px] py-2 bg-[#15b088] hover:bg-[#2ccda4] h-full"
                                        >
                                            Set new numerator
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="mb-4">
                                    <div className="flex items-center h-full rounded-[10px] overflow-hidden  border border-borderConnectBtn outline-none">
                                        <input
                                            type="text"
                                            value={controllerInfos.tempProfitProtocolNumerator}
                                            className="block h-full bg-bgButton flex-1 py-[9px] px-[10px] text-[14px] "
                                            disabled
                                        />
                                        <button
                                            onClick={handleConfirmNewProtocolFeeNumerator}
                                            className="grid place-items-center px-[18px] py-2 bg-[#15b088] hover:bg-[#2ccda4] h-full"
                                            disabled={
                                                Number(controllerInfos.tempProfitProtocolNumeratorTime) >=
                                                Number(blockTime)
                                            }
                                        >
                                            Confirm new numerator
                                        </button>
                                    </div>
                                </div>
                            )}
                            {controllerInfos.tempProfitStrategistNumerator == '0' ? (
                                <p className="mb-4 text-white">
                                    Profit protocol numerator: {controllerInfos.profitStrategistNumerator}
                                </p>
                            ) : (
                                <div>
                                    <p className="mb-4 text-white">
                                        Temp profit protocol numerator: {controllerInfos.tempProfitStrategistNumerator}
                                    </p>
                                    <p className="mb-4 text-white">
                                        Temp strategist fee numerator time:{' '}
                                        {controllerInfos.tempProfitStrategistNumeratorTime} - Current time: {blockTime}
                                    </p>
                                </div>
                            )}
                            {controllerInfos.tempProfitStrategistNumerator == '0' ? (
                                <div className="mb-4">
                                    <div className="flex items-center h-full rounded-[10px] overflow-hidden  border border-borderConnectBtn outline-none">
                                        <input
                                            type="text"
                                            value={newStrategistFeeNumerator}
                                            onChange={(e) => setNewStrategistFeeNumerator(e.target.value)}
                                            placeholder="New numerator"
                                            className="block h-full bg-bgButton flex-1 py-[9px] px-[10px] text-[14px] "
                                        />
                                        <button
                                            onClick={handleSetNewStrategistFeeNumerator}
                                            className="grid place-items-center px-[18px] py-2 bg-[#15b088] hover:bg-[#2ccda4] h-full"
                                        >
                                            Set new numerator
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="mb-4">
                                    <div className="flex items-center h-full rounded-[10px] overflow-hidden  border border-borderConnectBtn outline-none">
                                        <input
                                            type="text"
                                            value={controllerInfos.tempProfitStrategistNumerator}
                                            className="block h-full bg-bgButton flex-1 py-[9px] px-[10px] text-[14px] "
                                            disabled
                                        />
                                        <button
                                            onClick={handleConfirmNewStrategistFeeNumerator}
                                            className="grid place-items-center px-[18px] py-2 bg-[#15b088] hover:bg-[#2ccda4] h-full"
                                            disabled={
                                                Number(controllerInfos.tempProfitProtocolNumeratorTime) >=
                                                Number(blockTime)
                                            }
                                        >
                                            Confirm new numerator
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {controllerInfos.tempImplementationDelay == '0' ? (
                            <div className="mb-10">
                                <h2 className="text-xl font-semibold mb-2 text-white">Update config</h2>
                                <p className="mb-4 text-white">
                                    Implementation delay: {controllerInfos.implementationDelay}
                                </p>
                                <div className="mb-4">
                                    <div className="flex items-center h-full rounded-[10px] overflow-hidden  border border-borderConnectBtn outline-none">
                                        <input
                                            type="text"
                                            value={newImplementationDelay}
                                            onChange={(e) => setNewImplementationDelay(e.target.value)}
                                            placeholder="Delay time in seconds"
                                            className="block h-full bg-bgButton flex-1 py-[9px] px-[10px] text-[14px] "
                                        />
                                        <button
                                            onClick={handleSetNewImplementationDelay}
                                            className="grid place-items-center px-[18px] py-2 bg-[#15b088] hover:bg-[#2ccda4] h-full"
                                        >
                                            Set new implementation delay
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="mb-10">
                                <h2 className="text-xl font-semibold mb-2 text-white">Update config</h2>
                                <p className="mb-4 text-white">
                                    Implementation delay: {controllerInfos.implementationDelay}
                                </p>
                                <p className="mb-4 text-white">
                                    Temp implementation delay: {controllerInfos.tempImplementationDelay}
                                </p>
                                <p className="mb-4 text-white">
                                    Temp implementation delay time: {controllerInfos.tempImplementationDelayTime} -
                                    Current time: {blockTime}
                                </p>

                                <div className="mb-4">
                                    <div className="flex items-center h-full rounded-[10px] overflow-hidden  border border-borderConnectBtn outline-none">
                                        <input
                                            type="text"
                                            value={controllerInfos.tempImplementationDelay}
                                            className="block h-full bg-bgButton flex-1 py-[9px] px-[10px] text-[14px] "
                                            disabled
                                        />
                                        <button
                                            onClick={handleConfirmNewImplementationDelay}
                                            className="grid place-items-center px-[18px] py-2 bg-[#15b088] hover:bg-[#2ccda4] h-full"
                                            disabled={
                                                Number(controllerInfos.tempImplementationDelayTime) >= Number(blockTime)
                                            }
                                        >
                                            Confirm new implementation delay
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="mb-10">
                            <h2 className="text-xl font-semibold mb-2 text-white">Rotation config</h2>
                            <p
                                className="mb-4 text-white"
                                onClick={() => seeAddress(controllerInfos.universalLiquidator)}
                            >
                                Universal Liquidator: {controllerInfos.universalLiquidator}
                            </p>
                            <div className="mb-4">
                                <div className="flex items-center h-full rounded-[10px] overflow-hidden  border border-borderConnectBtn outline-none">
                                    <input
                                        type="text"
                                        value={newUniversalLiquidator}
                                        onChange={(e) => setNewUniversalLiquidator(e.target.value)}
                                        placeholder="Address"
                                        className="block h-full bg-bgButton flex-1 py-[9px] px-[10px] text-[14px] "
                                    />
                                    <button
                                        onClick={handleSetNewUniversalLiquidator}
                                        className="grid place-items-center px-[18px] py-2 bg-[#15b088] hover:bg-[#2ccda4] h-full"
                                    >
                                        Set new universal liquidator
                                    </button>
                                </div>
                            </div>
                            <p className="mb-4 text-white" onClick={() => seeAddress(controllerInfos.rewardForwarder)}>
                                Reward Forwarder: {controllerInfos.rewardForwarder}
                            </p>
                            <div className="mb-4">
                                <div className="flex items-center h-full rounded-[10px] overflow-hidden  border border-borderConnectBtn outline-none">
                                    <input
                                        type="text"
                                        value={newRewardForwarder}
                                        onChange={(e) => setNewRewardForwarder(e.target.value)}
                                        placeholder="Address"
                                        className="block h-full bg-bgButton flex-1 py-[9px] px-[10px] text-[14px] "
                                    />
                                    <button
                                        onClick={handleSetNewRewardForwarder}
                                        className="grid place-items-center px-[18px] py-2 bg-[#15b088] hover:bg-[#2ccda4] h-full"
                                    >
                                        Set new reward forwarder
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-bgMain p-6 rounded shadow-md mt-10">
                        <h1 className="text-2xl font-bold mb-4 text-white">Storage data:</h1>
                        <p className="mb-4 text-white" onClick={() => seeAddress(storageInfo.address)}>
                            Contract address: {storageInfo.address}
                        </p>
                        <p className="mb-4 text-white" onClick={() => seeAddress(storageInfo.governance)}>
                            Governance address: {storageInfo.governance}
                        </p>
                        <p className="mb-4 text-white" onClick={() => seeAddress(storageInfo.controller)}>
                            Controller address: {storageInfo.controller}
                        </p>
                        <div className="mb-4">
                            <div className="flex items-center h-full rounded-[10px] overflow-hidden  border border-borderConnectBtn outline-none">
                                <input
                                    type="text"
                                    value={newGovernance}
                                    onChange={(e) => setNewGovernance(e.target.value)}
                                    placeholder="Address"
                                    className="block h-full bg-bgButton flex-1 py-[9px] px-[10px] text-[14px] "
                                />
                                <button
                                    onClick={handleSetNewGovernance}
                                    className="grid place-items-center px-[18px] py-2 bg-[#15b088] hover:bg-[#2ccda4] h-full"
                                >
                                    Set new governance
                                </button>
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className="flex items-center h-full rounded-[10px] overflow-hidden  border border-borderConnectBtn outline-none">
                                <input
                                    type="text"
                                    value={newController}
                                    onChange={(e) => setNewController(e.target.value)}
                                    placeholder="Address"
                                    className="block h-full bg-bgButton flex-1 py-[9px] px-[10px] text-[14px] "
                                />
                                <button
                                    onClick={handleSetNewController}
                                    className="grid place-items-center px-[18px] py-2 bg-[#15b088] hover:bg-[#2ccda4] h-full"
                                >
                                    Set new controller
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {(isLoading || isStorageLoading) && (
                <div className="fixed top-0 left-0 right-0 bottom-0 z-10 w-screen h-screen">
                    <Loading isSignContract />
                </div>
            )}
        </div>
    );
};

export default Controller;
