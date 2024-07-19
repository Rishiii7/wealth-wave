"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Menu, ArrowUpDown } from 'lucide-react';
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type Accounts = {
    id: string;
    amount: number;
    username: string;
    status: "pending" | "processing" | "success" | "failed";
}

export const columns: ColumnDef<Accounts>[] = [
    {
        accessorKey: "status",
        header: () => <div className="text-center">Status</div>,
    },
    {
        accessorKey: "amount",
        header: () => <div className="text-center">Amount</div>,
        cell: ( {row} ) => {
            const amount = parseFloat( row.getValue("amount") );
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD"
            }).format(amount);

            return <div className="font-medium ">{ formatted }</div>
        }
    },
    {
        accessorKey: "username",
        header: ({column}) => {
            return (
                <div className="flex justify-center">

                <Button
                    variant={"ghost"}
                    onClick={ ()=> column.toggleSorting(column.getIsSorted() ==="asc")}
                    className="text-center text-lg "
                    >
                    Username
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
                    </div>
            )
        },
    },
    {
        id: "actions",
        cell: ({row}) => {
            const account = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button>
                            <span className="sr-only">Open Menu</span>
                            <MoreHorizontal className="h-4 w-4"/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                        onClick={() => navigator.clipboard.writeText(account.id)}
                        >
                        Copy Account ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View customer</DropdownMenuItem>
                        <DropdownMenuItem>View payment details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                
            )
        }
    }
]