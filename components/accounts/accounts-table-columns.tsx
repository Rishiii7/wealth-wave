"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { InferResponseType } from "hono";
import { client } from "@/lib/hono";
import { Actions } from "./actions";

export type Accounts = InferResponseType<typeof client.api.accounts.$get>['message'][0]


export const columns: ColumnDef<Accounts>[] = [
    {
        id: "id",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
    },
    {
        accessorKey: "name",
        header: ({column}) => {
            return (
                <div className="flex justify-center">

                <Button
                    variant={"ghost"}
                    onClick={ ()=> column.toggleSorting(column.getIsSorted() ==="asc")}
                    className="text-center text-lg "
                    >
                    Name 
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
                    </div>
            )
        },
    },
    {
        id: "actions",
        cell: ({row}) => <Actions id={row.original.id}/>
    }
]