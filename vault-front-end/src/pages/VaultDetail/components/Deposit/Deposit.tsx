import { useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { Schema, schema } from 'src/utils/Rules';
import { yupResolver } from '@hookform/resolvers/yup';
import InputNumber from 'src/components/InputNumber';
import { useAccount, useBalance } from 'wagmi';
import { depositToVault } from 'src/utils/ContractClient';
import { VaultInfo } from 'src/types/vault.type';
import { useEthersSigner } from 'src/utils/ethers';
import { formatWithDecimal } from 'src/utils/decimal';
import bigDecimal from 'js-big-decimal';
import useStateSignContract from 'src/state/loadingSignContract';
// import { QueryClient } from '@tanstack/react-query';
import { toast } from 'src/components/ui/use-toast';
import { ToastAction } from '@radix-ui/react-toast';

type FormData = Pick<Schema, 'deposit'>;
const registerSchema = schema.pick(['deposit']);

const Deposit = ({ vaultDetail }: { vaultDetail: VaultInfo }) => {
    // const queryClient = new QueryClient();

    const [localValue, setLocalValue] = useState<string>('');

    const { setIsLoadingSignContract } = useStateSignContract();

    const account = useAccount();
    const signer = useEthersSigner({ chainId: 31337 });

    const balance = useBalance({
        address: account.address,
        token: vaultDetail.depositToken.address as `0x${string}`,
    });

    const methods = useForm<FormData>({
        defaultValues: {
            deposit: '',
        },
        resolver: yupResolver(registerSchema),
    });

    const {
        handleSubmit,
        control,
        // reset,
        // setError,
        setValue,
        formState: { errors },
    } = methods;

    const seeTransaction = (txHash: string) => {
        // open a new tab to see transaction
        window.open(`https://app.tryethernal.com/transaction/${txHash}`);
    };

    const onSubmit = handleSubmit(async (data) => {
        const { deposit: value = '0' } = data;
        const isLastDot = value.slice(value.length - 1);
        let quantity = '0';
        if (isLastDot === '.') {
            quantity = value.split('.')[0];
            setValue('deposit', quantity);
        } else {
            quantity = value;
        }
        // if (Number(quantity) > 1000) {
        //     console.log(false);

        //     setError('deposit', {
        //         type: 'error',
        //         message: 'error thieu tien',
        //     });
        // }

        const amount = new bigDecimal(quantity)
            .multiply(new bigDecimal(Number(10) ** vaultDetail.depositToken.decimal))
            .getValue();
        // console.log({ amount });

        if (signer) {
            try {
                setIsLoadingSignContract(true);
                const txHash = await depositToVault({
                    signer,
                    vaultAddress: vaultDetail.vaultAddress,
                    amount: amount,
                    depositToken: {
                        address: vaultDetail.depositToken.address,
                        decimals: vaultDetail.depositToken.decimal.toString(),
                    },
                });
                setIsLoadingSignContract(false);
                toast({
                    className: 'bg-black',
                    title: `Deposit`,
                    description: `Successfully Deposit`,
                    action: (
                        <ToastAction
                            className="bg-white-500 text-white"
                            altText="Click to see transaction"
                            onClick={() => seeTransaction(txHash)}
                        >
                            See transaction
                        </ToastAction>
                    ),
                });
            } catch (error) {
                console.error(error);
                setIsLoadingSignContract(false);
                toast({
                    className: 'bg-red-500',
                    title: `Deposit`,
                    description: `Failed to Deposit`,
                });
            }
        }
    });

    return (
        <div>
            <div>
                <div>
                    <FormProvider {...methods}>
                        <form onSubmit={onSubmit} autoComplete="off">
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <div className="text-[14px] mb-[6px] font-medium">Amount to deposit</div>
                                    <div className="relative">
                                        <Controller
                                            control={control}
                                            name="deposit"
                                            render={({ field }) => {
                                                return (
                                                    <InputNumber
                                                        type="text"
                                                        name="deposit"
                                                        placeholder="0"
                                                        setLocalValue={setLocalValue}
                                                        localValue={localValue}
                                                        onChange={field.onChange}
                                                        value={field.value}
                                                        ref={field.ref}
                                                        errorsMessage={errors.deposit?.message}
                                                        myMoney={formatWithDecimal(
                                                            balance.data?.value.toString(),
                                                            vaultDetail.depositToken.decimal.toString(),
                                                        )}
                                                    />
                                                );
                                            }}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="text-[14px] mb-[6px] font-medium">Input Token</div>
                                    <div className="flex items-center h-[45px] py-[10px] px-[14px] bg-white rounded-lg">
                                        <span className="block w-[21px] h-[21px]">
                                            <img
                                                className="w-[21px] h-[21px] block"
                                                src={`../../src/assets/${
                                                    vaultDetail.depositToken.imgUrl
                                                        ? vaultDetail.depositToken.imgUrl
                                                        : 'icons/empty-token.png'
                                                }`}
                                            />
                                        </span>
                                        <span className="text-[#344054] ml-2">{vaultDetail.depositToken.name}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4">
                                <button className="block w-full py-[8px] px-[18px] transition-all duration-250 text-center rounded-lg bg-[#15b088] hover:bg-[#2ccda4]">
                                    Deposit
                                </button>
                            </div>
                        </form>
                    </FormProvider>
                </div>
            </div>
        </div>
    );
};

export default Deposit;
