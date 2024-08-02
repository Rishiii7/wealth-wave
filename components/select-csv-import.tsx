import React from 'react';

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

const options = [
    "amount",
    "payee",
    "date"
]

export const SelectCSVColumns = ({
    columnIndex,
    onChange,
    selectedColumns,
}: SelectCSVColumnsProps) => {
    // console.log("[SELECT_CSV_COLUMN] : "+ selectedColumns);
  return (
    <>
        <Select
            onValueChange={(value) => {
                console.log(value)
                onChange(columnIndex, value);
            }}
        >
            <SelectTrigger className="w-[150px] bg-transaprent">
                <SelectValue 
                    placeholder="Select a column" 
                />
            </SelectTrigger>
            <SelectContent
                className='bg-purple-500 text-white font-medium'
            >
                {
                    options.map( (col, ind) => (
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
