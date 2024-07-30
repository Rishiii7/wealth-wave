"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { InferResponseType } from "hono";
import { client } from "@/lib/hono";
import { Actions } from "./actions";
import { format } from "date-fns";

type TransactionResponse = InferResponseType<typeof client.api.transaction["$get"]>['data'][0];

export type Transaction = Omit<TransactionResponse, "account"| "category"> & {
    category: string;
    account: string;
}


export const columns: ColumnDef<Transaction>[] = [
    {
        id: "id",
        header: ({ table }) => (
          <div className="flex justify-center">

          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
            id="checkbox-header"
            />
          </div>
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
        accessorKey: "amount",
        header: ({column}) => {
            return (
                <div className="flex justify-center">

                <Button
                    variant={"ghost"}
                    onClick={ ()=> column.toggleSorting(column.getIsSorted() ==="asc")}
                    className="text-center text-lg "
                    >
                    Amount 
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
                    </div>
            )
        },
        cell: ({row}) => {
            return(
                <>
                    <span>
                        ${row.original.amount}
                    </span>
                </>
            )
        }
    },
    {
      accessorKey: "payee",
      header: ({column}) => {
          return (
              <div className="flex justify-center">

              <Button
                  variant={"ghost"}
                  onClick={ ()=> column.toggleSorting(column.getIsSorted() ==="asc")}
                  className="text-center text-lg "
                  >
                  Payee 
                  <ArrowUpDown className="ml-2 h-4 w-4"/>
              </Button>
                  </div>
          )
      },
    },
    {
      accessorKey: "account",
      header: ({column}) => {
          return (
              <div className="flex justify-center">

              <Button
                  variant={"ghost"}
                  onClick={ ()=> column.toggleSorting(column.getIsSorted() ==="asc")}
                  className="text-center text-lg "
                  >
                  Account Name 
                  <ArrowUpDown className="ml-2 h-4 w-4"/>
              </Button>
                  </div>
          )
      },
    },
    {
      accessorKey: "notes",
      header: ({column}) => {
          return (
              <div className="flex justify-center">

              <Button
                  variant={"ghost"}
                  onClick={ ()=> column.toggleSorting(column.getIsSorted() ==="asc")}
                  className="text-center text-lg "
                  >
                  Notes 
                  <ArrowUpDown className="ml-2 h-4 w-4"/>
              </Button>
                  </div>
          )
      },
    },
    {
      accessorKey: "date",
      header: ({column}) => {
          return (
              <div className="flex justify-center">

              <Button
                  variant={"ghost"}
                  onClick={ ()=> column.toggleSorting(column.getIsSorted() ==="asc")}
                  className="text-center text-lg "
                  >
                  Date 
                  <ArrowUpDown className="ml-2 h-4 w-4"/>
              </Button>
                  </div>
          )
      },
        cell: ({row}) => {
            return(
                <>
                <span>
                    { format(row.original.date, "dd/MM/yyyy")}
                </span>
                </>
            )
        }
    },
    {
      accessorKey: "category",
      header: ({column}) => {
          return (
              <div className="flex justify-center">

              <Button
                  variant={"ghost"}
                  onClick={ ()=> column.toggleSorting(column.getIsSorted() ==="asc")}
                  className="text-center text-lg "
                  >
                  Category Name 
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