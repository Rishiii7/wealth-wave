import React, { useState } from 'react';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

type SelectCSVColumnsProps = {
    columnIndex: number
    columnHeaders: string[],
    onChange : (index: number, value: string) => void
    selectedColumns: string[]
}

export const SelectCSVColumns = ({
    columnIndex,
    columnHeaders,
    onChange,
    selectedColumns,
}: SelectCSVColumnsProps) => {
    console.log("[SELECT_CSV_COLUMN] : "+ selectedColumns);
  return (
    <>
        <Select
            onValueChange={(value) => {
                console.log(value)
                onChange(columnIndex, value);
            }}
        >
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a column" />
            </SelectTrigger>
            <SelectContent>
                {
                    columnHeaders.map( (col, ind) => (
                        <SelectItem 
                            value={col}
                            key={ind}
                            disabled={ selectedColumns.includes(col) }
                        >
                            { col }
                        </SelectItem>
                    ))
                }
            </SelectContent>
        </Select>
    </>
  )
}
