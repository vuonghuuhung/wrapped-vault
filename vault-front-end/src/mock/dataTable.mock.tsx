import IconChain from 'src/assets/IconChain';
import IconChainType from 'src/assets/IconChainType';
import IconChainTypeS from 'src/assets/IconChainTypeS';

export const dataTableMock = [
    {
        id: '0',
        chain: {
            iconChain: <IconChain />,
            iconChainType: [<IconChainType />, <IconChainTypeS />],
            name: 'OVN, USD+',
            description: 'Aerodrome',
        },
        apy: 873.7,
        dailyApy: 0.625,
        tvl: 49.26,
        myBalance: 0.0,
    },
    {
        id: '1',
        chain: {
            iconChain: <IconChain />,
            iconChainType: [<IconChainType />, <IconChainTypeS />],
            name: 'AVN, USD+',
            description: 'Camelot V3 - Narrow',
        },
        apy: 837.7,
        dailyApy: 0.625,
        tvl: 49.26,
        myBalance: 0.0,
    },
    {
        id: '2',
        chain: {
            iconChain: <IconChain />,
            iconChainType: [<IconChainType />, <IconChainTypeS />],
            name: 'OVN, USD+',
            description: 'Aerodrome',
        },
        apy: 823.7,
        dailyApy: 0.625,
        tvl: 49.26,
        myBalance: 0.0,
    },
    {
        id: '3',
        chain: {
            iconChain: <IconChain />,
            iconChainType: [<IconChainType />, <IconChainTypeS />],
            name: 'AVN, USD+',
            description: 'BAerodrome',
        },
        apy: 833.7,
        dailyApy: 0.25,
        tvl: 35.26,
        myBalance: 0.5,
    },
    {
        id: '4',
        chain: {
            iconChain: <IconChain />,
            iconChainType: [<IconChainType />, <IconChainTypeS />],
            name: 'OVN, USD+',
            description: 'Camelot V3 - Narrow',
        },
        apy: 877.7,
        dailyApy: 0.285,
        tvl: 29.26,
        myBalance: 1.5,
    },
    {
        id: '5',
        chain: {
            iconChain: <IconChain />,
            iconChainType: [<IconChainType />, <IconChainTypeS />],
            name: 'AVN, USD+',
            description: 'BAerodrome',
        },
        apy: 823.7,
        dailyApy: 0.625,
        tvl: 49.26,
        myBalance: 0.0,
    },
    {
        id: '6',
        chain: {
            iconChain: <IconChain />,
            iconChainType: [<IconChainType />, <IconChainTypeS />],
            name: 'TVN, USD+',
            description: 'Camelot V3 - Narrow',
        },
        apy: 823.7,
        dailyApy: 0.625,
        tvl: 49.26,
        myBalance: 0.0,
    },
    {
        id: '7',
        chain: {
            iconChain: <IconChain />,
            iconChainType: [<IconChainType />, <IconChainTypeS />],
            name: 'OVN, USD+',
            description: 'BAerodrome',
        },
        apy: 823.7,
        dailyApy: 0.625,
        tvl: 49.26,
        myBalance: 0.0,
    },
    {
        id: '8',
        chain: {
            iconChain: <IconChain />,
            iconChainType: [<IconChainType />, <IconChainTypeS />],
            name: 'OVN, USD+',
            description: 'Camelot V3 - Narrow',
        },
        apy: 823.7,
        dailyApy: 0.625,
        tvl: 49.26,
        myBalance: 0.0,
    },
    {
        id: '9',
        chain: {
            iconChain: <IconChain />,
            iconChainType: [<IconChainType />, <IconChainTypeS />],
            name: 'OVN, USD+',
            description: 'Aerodrome',
        },
        apy: 823.7,
        dailyApy: 0.625,
        tvl: 49.26,
        myBalance: 0.0,
    },
    {
        id: '10',
        chain: {
            iconChain: <IconChain />,
            iconChainType: [<IconChainType />, <IconChainTypeS />],
            name: 'OVN, USD+',
            description: 'Aerodrome',
        },
        apy: 823.7,
        dailyApy: 0.625,
        tvl: 49.26,
        myBalance: 0.0,
    },
];

export type dataTableType = {
    id: string;
    chain: {
        iconChain: JSX.Element;
        iconChainType: JSX.Element[];
        name: string;
        description: string;
    };
    apy: number;
    dailyApy: number;
    tvl: number;
    myBalance: number;
};
