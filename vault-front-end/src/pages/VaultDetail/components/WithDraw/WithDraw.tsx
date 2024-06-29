import { useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { Schema, schema } from 'src/utils/Rules';
import { yupResolver } from '@hookform/resolvers/yup';
import InputNumber from 'src/components/InputNumber';
import { VaultInfo } from 'src/types/vault.type';
import { useEthersSigner } from 'src/utils/ethers';
import { withdrawToVault } from 'src/utils/ContractClient';
import { formatWithDecimal } from 'src/utils/decimal';
import { toast } from 'src/components/ui/use-toast';
import { ToastAction } from '@radix-ui/react-toast';
import bigDecimal from 'js-big-decimal';
import useStateSignContract from 'src/state/loadingSignContract';

type FormData = Pick<Schema, 'withdraw'>;
const registerSchema = schema.pick(['withdraw']);

const Withdraw = ({ vaultDetail }: { vaultDetail: VaultInfo }) => {
    const [localValue, setLocalValue] = useState<string>('');

    const signer = useEthersSigner({ chainId: 31337 });

    const { setIsLoadingSignContract } = useStateSignContract();

    const methods = useForm<FormData>({
        defaultValues: {
            withdraw: '',
        },
        resolver: yupResolver(registerSchema),
    });

    const {
        handleSubmit,
        control,
        // reset,
        setValue,
        formState: { errors },
    } = methods;

    const onSubmit = handleSubmit(async (data) => {
        const { withdraw: value = '0' } = data;
        const isLastDot = value.slice(value.length - 1);
        let quantity = '0';
        if (isLastDot === '.') {
            quantity = value.split('.')[0];
            setValue('withdraw', quantity);
        } else {
            quantity = value;
        }

        const seeTransaction = (txHash: string) => {
            // open a new tab to see transaction
            window.open(`https://app.tryethernal.com/transaction/${txHash}`);
        };

        const amount = new bigDecimal(quantity)
            .multiply(new bigDecimal(Number(10) ** Number(vaultDetail.decimals)))
            .getValue();

        if (signer) {
            try {
                setIsLoadingSignContract(true);
                const txHash = await withdrawToVault({
                    signer,
                    vaultAddress: vaultDetail.vaultAddress,
                    amount,
                });
                setIsLoadingSignContract(false);
                toast({
                    className: 'bg-black',
                    title: `Withdraw`,
                    description: `Successfully withdraw`,
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
                setIsLoadingSignContract(false);
                toast({
                    className: 'bg-red-500',
                    title: `Withdraw`,
                    description: `Failed to withdraw`,
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
                                    <div className="text-[14px] mb-[6px] font-medium">Amount to withdraw</div>
                                    <div className="relative">
                                        <Controller
                                            control={control}
                                            name="withdraw"
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
                                                        errorsMessage={errors.withdraw?.message}
                                                        myMoney={formatWithDecimal(
                                                            vaultDetail.userBalance,
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
                                                src={`../../src/assets/icons/empty-token.png`}
                                            />
                                        </span>
                                        <span className="text-[#344054] ml-2">{vaultDetail.vaultToken.symbol}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4">
                                <button className="block w-full py-[8px] px-[18px] transition-all duration-250 text-center rounded-lg bg-[#15b088] hover:bg-[#2ccda4]">
                                    Withdraw
                                </button>
                            </div>
                        </form>
                    </FormProvider>
                </div>
            </div>
        </div>
    );
};

export default Withdraw;
