import { Link, useParams } from 'react-router-dom';
import IconArrowLeft from 'src/assets/IconArrowLeft';
import IconDetailVault from 'src/assets/IconDetailVault';
import IconManageVault from 'src/assets/IconManageVault';
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'src/components/ui/tabs';
import path from 'src/constants/path';
import DetailsVault from './components/DetailsVault';
import { useVault } from 'src/hooks/useVault';
import Loading from 'src/components/Loading/Loading';
import { useAccount } from 'wagmi';
import Manage from './components/Manage/Manage';
import History from './components/History';

const VaultDetail = () => {
    const { id: vaultAddress } = useParams();
    const account = useAccount();
    const { vaultDetail, isFetchingVaultDetail } = useVault({ address: vaultAddress, user: account.address });

    return (
        <div className="">
            {vaultDetail && (
                <Tabs defaultValue="details">
                    <div className="pl-[76px] pr-[72px] bg-bgVaultDetail pt-[50px]">
                        <div className="mb-[49px]">
                            <Link
                                to={path.farms}
                                className="flex hover:bg-[#ecececb3] h-[35px] w-[96px] rounded-[5px] items-center justify-between px-[15px] py-[5px] border-[0.5px] border-white"
                            >
                                <IconArrowLeft />
                                <span className="pl-[15px] text-[14px] font-semibold">Back</span>
                            </Link>
                        </div>
                        <div className="flex items-center">
                            <div className="flex items-center">
                                {vaultDetail.logoUrl.map((icon, index) => {
                                    const logoUrl = icon.split('./')[1];
                                    return (
                                        <img
                                            key={index}
                                            className="w-[69px] h-[69px] block"
                                            src={`../../src/assets/${logoUrl}`}
                                        />
                                    );
                                })}
                            </div>
                            <h1 className="block ml-[12px] text-[25px] font-semibold">
                                {vaultDetail.tokenNames.join(' • ')}
                            </h1>
                        </div>
                        <div className="flex items-center mt-3 mb-[49px]">
                            <div className="rounded-[5px] w-fit py-[2px] px-2 text-[14px] font-medium mr-[10px] border-[1.3px] border-white">
                                {vaultDetail.estimatedAPY}% APY
                            </div>
                            <div className="rounded-[5px] w-fit py-[2px] px-2 text-[14px] font-medium mr-[10px] border-[1.3px] border-white">
                                {vaultDetail.tvlUsd} TVL
                            </div>
                        </div>
                        <div>
                            <div>
                                <TabsList defaultValue="details">
                                    <TabsTrigger
                                        value="details"
                                        className="bg-transparent rounded-t-[6px] rounded-b-none py-3 px-[15px] font-semibold data-[state=active]:bg-[#161B26] text-white"
                                    >
                                        <div className="mr-2">
                                            <IconDetailVault />
                                        </div>
                                        <span>Details</span>
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="history"
                                        className="bg-transparent rounded-t-[6px] rounded-b-none py-3 px-[15px] font-semibold data-[state=active]:bg-[#161B26] text-white"
                                    >
                                        <div className="mr-2">
                                            <IconManageVault />
                                        </div>
                                        <span>History</span>
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="invest"
                                        className="bg-transparent rounded-t-[6px] rounded-b-none py-3 px-[15px] font-semibold data-[state=active]:bg-[#161B26] text-white"
                                    >
                                        <div className="mr-2">
                                            <IconManageVault />
                                        </div>
                                        <span>Manage</span>
                                    </TabsTrigger>
                                </TabsList>
                            </div>
                        </div>
                    </div>
                    <div className="pt-[25px] pl-[76px] pr-[72px] pb-[200px]">
                        <TabsContent value="details" className="mt-0">
                            <DetailsVault vaultDetail={vaultDetail}/>
                        </TabsContent>
                        <TabsContent value="history" className="mt-0">
                            <History vaultDetail={vaultDetail} />
                        </TabsContent>
                        <TabsContent value="invest" className="mt-0">
                            <Manage vaultDetail={vaultDetail} />
                        </TabsContent>
                    </div>
                </Tabs>
            )}
            {isFetchingVaultDetail && (
                <div className="fixed top-0 left-0 right-0 bottom-0 z-10 w-screen h-screen">
                    <Loading isSignContract />
                </div>
            )}
        </div>
    );
};

export default VaultDetail;
