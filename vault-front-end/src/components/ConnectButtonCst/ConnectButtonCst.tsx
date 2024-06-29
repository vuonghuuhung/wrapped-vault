import { ConnectButton } from '@rainbow-me/rainbowkit';
import IconDot from 'src/assets/IconDot';
import iconAvatarConnectBtn from 'src/assets/imgConnectBtn.png';
const ConnectButtonCst = () => {
    return (
        <ConnectButton.Custom>
            {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                authenticationStatus,
                mounted, 
            }) => {
                const ready = mounted && authenticationStatus !== 'loading'; 
                const connected =
                    ready && account && chain && (!authenticationStatus || authenticationStatus === 'authenticated');
                return (
                    <div
                        {...(!ready && {
                            'aria-hidden': true,
                            style: {
                                opacity: 0,
                                pointerEvents: 'none',
                                userSelect: 'none',
                            },
                        })}
                    >
                        {(() => {
                            if (!connected) {
                                return (
                                    <button
                                        onClick={openConnectModal}
                                        type="button"
                                        className="group min-h-[50px] text-[16px] font-semibold rounded-md flex items-center justify-center w-full border border-borderConnectBtn py-[15px] hover:shadow-shadowConnectBtn"
                                    >
                                        <span className="mr-[25px] text-[#A19D98] group-hover:hover:text-[#12B86A] ">
                                            <IconDot />
                                        </span>
                                        Connect Wallet
                                    </button>
                                );
                            }
                            if (chain.unsupported) {
                                return (
                                    <button onClick={openChainModal} type="button">
                                        Wrong network
                                    </button>
                                );
                            }
                            return (
                                <div style={{ display: 'flex', gap: 12 }}>
                                    <button
                                        onClick={openAccountModal}
                                        type="button"
                                        className="group min-h-[50px] py-[8px] pl-[5px] pr-[18px] text-[16px] font-semibold rounded-[10px] flex items-center justify-between w-full bg-bgMain hover:bg-bgMain"
                                    >
                                        <div className="w-[39px] h-[39px]">
                                            <img src={iconAvatarConnectBtn} alt="image" className="" />
                                        </div>
                                        <div>
                                            {account.displayName}
                                            <div className="flex items-center justify-start">
                                                <span>
                                                    <IconDot fill="#12B86A" width={8} height={8} />
                                                </span>
                                                <div className="text-[12px] font-normal leading-[14px] ml-[5px]">
                                                    Connected
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            {chain.iconUrl && (
                                                <img
                                                    alt={chain.name ?? 'Chain icon'}
                                                    src={chain.iconUrl}
                                                    style={{ width: 17, height: 17 }}
                                                />
                                            )}
                                        </div>
                                    </button>
                                </div>
                            );
                        })()}
                    </div>
                );
            }}
        </ConnectButton.Custom>
    );
};

export default ConnectButtonCst;
