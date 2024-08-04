"use client";

import React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  ColumnFiltersState,
  getFilteredRowModel,
  Row
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
import { ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { usePostBulkDelete } from "@/features/accounts/api/user-accounts";
import { useDialogConfirm } from "../dialog-confirmation";
  

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export const AccountsDataTable = <TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) => {

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection
    } 
  });

  const deleteAccounts = usePostBulkDelete();
  const [confirm, ConfirmDialogComponent] = useDialogConfirm({
    title: "Are you sure?",
    description: "You are about to delete an account"
  });

  const onDelete = async (rows: Row<TData>[] ) => {
    const ids = rows.map( (row:any) => row.original.id);

    const ok = await confirm();

    if(ok) {
      deleteAccounts.mutate({ids: ids});
    }
  }

  return (
    <>
    <div>
      <ConfirmDialogComponent />
      <div className="flex items-center justify-between">
        {/* Filter Name */}  
        <div className="flex items-center py-4">
            <Input
              placeholder="Filter name..."
              value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
        </div>
        {/* Delete Button */}
        <div className="flex">
          {
            table.getFilteredSelectedRowModel().rows.length > 0 ? (
              <Button
                onClick={() => {
                  onDelete(table.getSelectedRowModel().rows)

                }}
              >
                <Trash2 className="w-5 h-5 mr-2"/>
                Delete ({table.getFilteredSelectedRowModel().rows.length})
              </Button>
            ) : ""
          }
        </div>
      </div>
      {/* Tables div */}
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
      
      {/* Footer div */}
      <div className="flex justify-between items-center mt-2">
        <div className="flex text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="flex items-center gap-x-2">
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
      </div>
    </div>
    </>
  )
}
