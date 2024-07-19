"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState
} from "@tanstack/react-table";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
  

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[]
}

export const AccountsDataTable = <TData, TValue>({
  columns,
  data
}: DataTableProps<TData, TValue>) => {

  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting
    } 
  })

  return (
    <>
    <div>
      <Table className="text-md lg:text-lg ">
        <TableHeader>
          {
            table.getHeaderGroups().map( (headerGrp) => (
              <TableRow key={headerGrp.id}>
                {
                  headerGrp.headers.map( (header) => (
                    <TableHead key={header.id}>
                      {
                        header.isPlaceholder 
                        ? null 
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )
                      }
                    </TableHead>
                  ))
                }
              </TableRow>
            ))
          }
        </TableHeader>
        <TableBody>
          {
            table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map( (row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {
                  row.getVisibleCells().map( (cell) => (
                    <TableCell
                      key={cell.id}
                    >
                      {
                        flexRender(cell.column.columnDef.cell, cell.getContext())
                      }
                    </TableCell>
                  ))
                }
              </TableRow>
              ))
              
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No Result
                </TableCell>
              </TableRow>
            )
          }
        </TableBody>
      </Table>
    </div>
    <div className="flex items-center justify-end gap-x-2">
      <Button
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        <ChevronLeft />
        Previous
      </Button>
      <Button
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        Next
        <ChevronRight />
      </Button>
    </div>
    </>
  )
}
