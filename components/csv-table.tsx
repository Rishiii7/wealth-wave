import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { SelectCSVColumns } from './select-csv-import';

type CSVTableProps = {
    header: string[];
    data: string[][];
    selectedColumns: string[];
    onTableSelectChange: (index: number, value: string) => void;
}
export const CSVTable = ({
    header,
    data,
    selectedColumns,
    onTableSelectChange
}: CSVTableProps) => {
    

    console.log("IMPORT CSV CARD")
  return (
    <div className=' rounded-md border mt-10 w-full'>
        <Table>
            <TableHeader>
                <TableRow>
                    {header.map((column, ind) => (
                        <>
                            <TableHead key={`${column}-${ind}`}>
                                <SelectCSVColumns 
                                    columnIndex={ind}
                                    columnHeaders = { header}
                                    onChange={onTableSelectChange}
                                    selectedColumns={selectedColumns}
                                />
                            </TableHead>
                        </>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    data.map( (row, id) => (
                        <TableRow
                            key={id}
                        >
                            {
                                row.map( (cell, ind) => (
                                    <TableCell key={ind}>
                                        { cell }
                                    </TableCell>
                                ))
                            }
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    </div>
  )
}
