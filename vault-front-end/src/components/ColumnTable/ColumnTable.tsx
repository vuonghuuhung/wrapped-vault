import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import IconChain from 'src/assets/IconChain';
import { VaultInfo } from 'src/types/vault.type';

export const columnsTable: ColumnDef<VaultInfo>[] = [
    {
        accessorKey: 'chain',
        header: () => <div className="text-[12px] text-left w-[45%]">Farm</div>,
        cell: ({ row }) => {
            return (
                <div className="flex items-center w-full justify-between">
                    <div className="w-[15%]">
                        <div className="w-[23px] h-[23px] border-[2px] border-[#29ce84] rounded-[8px] flex items-center justify-center">
                            <IconChain />
                        </div>
                    </div>
                    <div className="flex items-center justify-start w-[45%]">
                        {row.original.logoUrl.map((icon, index) => {
                            const logoUrl = icon.split('./')[1];
                            return (
                                <div key={index} className={`w-[37px] h-[37px] mr-1`}>
                                    <img className="w-[37px] h-[37px] block" src={`src/assets/${logoUrl}`} />
                                </div>
                            );
                        })}
                    </div>
                    <div className="pr-4 flex-1 text-left">
                        <div className="font-semibold">{row.original.name}</div>
                        <div className="font-medium">{row.original.platform[0]}</div>
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: 'estimatedAPY',
        header: ({ column }) => {
            return (
                <button
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="m-auto flex items-center justify-center text-white text-[12px] hover:text-[#ff9400]"
                >
                    APY
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </button>
            );
        },
    },
    {
        accessorKey: 'dailyAPY',
        header: ({ column }) => {
            return (
                <button
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="m-auto flex items-center justify-center text-white text-[12px] hover:text-[#ff9400]"
                >
                    Daily APY
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </button>
            );
        },
    },
    {
        accessorKey: 'tvlUsd',
        header: ({ column }) => {
            return (
                <button
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="m-auto flex items-center justify-center text-white text-[12px] hover:text-[#ff9400]"
                >
                    TVL
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </button>
            );
        },
    },
    {
        accessorKey: 'balanceCompacted',
        header: ({ column }) => {
            return (
                <button
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="m-auto flex items-center justify-center text-white text-[12px] hover:text-[#ff9400]"
                >
                    My balance
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </button>
            );
        },
    },
];
