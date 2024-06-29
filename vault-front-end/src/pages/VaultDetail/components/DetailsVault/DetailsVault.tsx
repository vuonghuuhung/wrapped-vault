import IconArrowDown from 'src/assets/IconArrowDown';
import IconArrowUp from 'src/assets/IconArrowUp';
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'src/components/ui/tabs';
import Deposit from '../Deposit';
import WithDraw from '../WithDraw';
import Loading from 'src/components/Loading/Loading';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { VaultInfo } from 'src/types/vault.type';
import { useSharePriceChart } from 'src/hooks/useSharePriceChart';
import { formatDate } from 'src/utils/helper';

const DetailsVault = ({ vaultDetail }: { vaultDetail: VaultInfo }) => {
    const { historyInfo } = useSharePriceChart(vaultDetail.vaultAddress);
    // console.log({ historyInfo });

    const seeAddress = (address: string) => {
        // open a new tab to see transaction
        window.open(`https://app.tryethernal.com/address/${address}`);
    };

    return (
        <>
            {vaultDetail && historyInfo && (
                <div>
                    <div className="grid grid-cols-3 gap-4 mv-[25px]">
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
                    </div>
                    <div className="mt-[25px] flex justify-center gap-6">
                        <div className="w-[60%] h-[500px] boxContent py-10">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart
                                    width={500}
                                    height={200}
                                    data={historyInfo}
                                    syncId="anyId"
                                    margin={{
                                        top: 10,
                                        right: 30,
                                        left: 50,
                                        bottom: 0,
                                    }}
                                >
                                    <CartesianGrid horizontal vertical={false} stroke="#29384E" />
                                    <XAxis
                                        dataKey="timestamp"
                                        className="text-[12px] text-white"
                                        tickFormatter={(data, index) => {
                                            if (index % Math.ceil(historyInfo.length / 10) !== 0) {
                                                return '';
                                            }
                                            const value = formatDate(data);
                                            return value;
                                        }}
                                    />
                                    <YAxis className="text-[12px] text-white" domain={['dataMin', 'dataMax']} />
                                    <Tooltip
                                        content={({ payload, active }) => {
                                            if (active && payload && payload.length) {
                                                const price = payload[0].payload.sharePrice;
                                                const timestamp = payload[0].payload.timestamp;
                                                const formattedTimestamp = formatDate(timestamp);
                                                return (
                                                    <div className="bg-[#1A262D] p-2 rounded shadow-shadowTooltip">
                                                         <p className="text-[12px] text-white">{`Time: ${formattedTimestamp}`}</p>
                                                        <p className="text-[12px] text-white">{`Price: $${price}`}</p>
                                                    </div>
                                                );
                                            }
                                            return null;
                                        }}
                                    />
                                    <Area type="monotone" dataKey="sharePrice" stroke="#00D26B" fill="#1A262D" />
                                </AreaChart>
                            </ResponsiveContainer>
                            {/* <div className="h-[40px] text-right text-[14px] px-10 flex items-center gap-6 justify-end pb-4">
                                <div>1W</div>
                                <div>1M</div>
                                <div>1Y</div>
                                <div>ALL</div>
                            </div> */}
                        </div>
                        <div className="w-[40%]">
                            <div className="h-fit boxContent p-4 flex justify-center">
                                <Tabs defaultValue="deposit" className="w-full">
                                    <TabsList className="w-full p-1 border border-[#f8f8f8]">
                                        <TabsTrigger
                                            value="deposit"
                                            className="w-1/2 bg-transparent rounded-md data-[state=active]:bg-[#242c3c] data-[state=active]:text-white text-[#d9d9d9]"
                                        >
                                            <span className="mr-[5px]">
                                                <IconArrowDown />
                                            </span>
                                            Deposit
                                        </TabsTrigger>
                                        <TabsTrigger
                                            value="withdraw"
                                            className="w-1/2 bg-transparent rounded-md data-[state=active]:bg-[#242c3c] data-[state=active]:text-white text-[#d9d9d9]"
                                        >
                                            <span className="mr-[5px]">
                                                <IconArrowUp />
                                            </span>
                                            Withdraw
                                        </TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="deposit">
                                        <Deposit vaultDetail={vaultDetail} />
                                    </TabsContent>
                                    <TabsContent value="withdraw">
                                        <WithDraw vaultDetail={vaultDetail} />
                                    </TabsContent>
                                </Tabs>
                            </div>
                            <div className="mt-4 h-fit boxContent p-4">
                                <p className="text-sm">{vaultDetail.description}</p>
                                <button
                                    className="py-[8px] px-[18px] transition-all duration-250 text-center rounded-lg bg-[#15b088] hover:bg-[#2ccda4] m-2"
                                    onClick={() => seeAddress(vaultDetail.vaultAddress)}
                                >
                                    Vault Address
                                </button>
                                <button
                                    className="py-[8px] px-[18px] transition-all duration-250 text-center rounded-lg bg-[#15b088] hover:bg-[#2ccda4] m-2"
                                    onClick={() => seeAddress(vaultDetail.strategyAddress)}
                                >
                                    Strategy Address
                                </button>
                            </div>
                        </div>
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

export default DetailsVault;
