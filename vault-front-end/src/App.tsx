import Loading from './components/Loading/Loading';
import useScrollTop from './hooks/useScrollTop';
import useStateSignContract from './state/loadingSignContract';
import useRouterElements from './useRouterElements';

import '@rainbow-me/rainbowkit/styles.css';

import { darkTheme, getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { useWatchContractEvent, WagmiProvider } from 'wagmi';
import { hardhat } from 'wagmi/chains';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { Controller__factory, ERC20__factory, VaultV1__factory } from 'vault-contract-sdk';
import { useToast } from './components/ui/use-toast';
// import { ToastAction } from '@radix-ui/react-toast';
import { ContractClient } from './utils/ContractClient';
import { Toaster } from './components/ui/toaster';
import { formatWithDecimal } from './utils/decimal';

const config = getDefaultConfig({
    appName: 'Vault Finance',
    projectId: '646de3fbcd9249720674095b92e89848', // just for default, we use hardhat local network
    chains: [hardhat],
    ssr: false, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();

function App() {
    const routeElements = useRouterElements();
    const { isLoadingSignContract } = useStateSignContract();
    const { toast } = useToast();

    // const seeTransaction = (txHash: string) => {
    //     window.open(`https://app.tryethernal.com/transaction/${txHash}`);
    // };

    useWatchContractEvent({
        abi: VaultV1__factory.abi,
        strict: true,
        eventName: 'Deposit',
        onLogs(logs) {
            logs.forEach(async (log) => {
                const args = log.args;
                const vault = VaultV1__factory.connect(log.address, ContractClient.getProvider());
                const underlying = await vault.underlying();
                const token = ERC20__factory.connect(underlying, ContractClient.getProvider());
                const tokenSymbol = await token.symbol();
                const decimal = await token.decimals();
                const asset = formatWithDecimal(args.assets.toString(), decimal.toString());
                toast({
                    className: 'bg-green-400 top-right',
                    title: `Blockchain World`,
                    description: `New deposit, ${asset} ${tokenSymbol}`, 
                    duration: 5000
                });
            });
        },
        config: config,
    });

    useWatchContractEvent({
        abi: VaultV1__factory.abi,
        strict: true,
        eventName: 'Withdraw',
        onLogs(logs) {
            logs.forEach(async (log) => {
                const args = log.args;
                const vault = VaultV1__factory.connect(log.address, ContractClient.getProvider());
                const underlying = await vault.underlying();
                const token = ERC20__factory.connect(underlying, ContractClient.getProvider());
                const tokenSymbol = await token.symbol();
                const decimal = await token.decimals();
                const asset = formatWithDecimal(args.assets.toString(), decimal.toString());
                toast({
                    // make this toast on top right of the screen
                    className: 'bg-yellow-400 top-right text-black',
                    title: `Blockchain World`,
                    description: `New withdraw, ${asset} ${tokenSymbol}`, 
                    duration: 5000
                });
            });
        },
        config: config,
    });

    useWatchContractEvent({
        abi: Controller__factory.abi,
        strict: true,
        eventName: 'SharePriceChangeLog',
        onLogs(logs) {
            logs.forEach(async () => {
                toast({
                    // make this toast on top right of the screen
                    className: 'bg-blue-400 top-right text-black',
                    title: `Blockchain World`,
                    description: `Vault Investment`, 
                    duration: 5000 
                });
            });
        },
        config: config,
    });

    useScrollTop();
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider coolMode={true} theme={darkTheme()}>
                    <div>
                        {routeElements}
                        {isLoadingSignContract && (
                            <div className="fixed top-0 left-0 right-0 bottom-0 z-10 w-screen h-screen">
                                <Loading isSignContract />
                            </div>
                        )}
                    </div>
                    <Toaster />
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
}

export default App;
