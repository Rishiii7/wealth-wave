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
}
export const CSVTable = ({
    header,
    data
}: CSVTableProps) => {
    const [selectedColumns, setSelectedColumns] = useState<string[]>(Array(header.length).fill(''));

    const onChange = (index: number, value: string) => {
        setSelectedColumns(prev => {
            let columns = [...prev];
            columns[index] =  value;
            return columns
        });
        console.log(selectedColumns)
    }

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
                                    onChange={onChange}
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
