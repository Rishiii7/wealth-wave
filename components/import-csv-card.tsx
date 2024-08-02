import React from 'react'
import { Button } from './ui/button';
import { CSVTable } from './csv-table';

type ImportCSVCardProps = {
    onCancel: () => void;
    data: string[][];
}

export const ImportCSVCard = ({
    onCancel,
    data
}: ImportCSVCardProps) => {
    const headers = data[0];
    const tableBody = data.slice(1);

  return (
        <>
        <div className='-mt-16 flex flex-col items-center p-2 bg-slate-50 shadow-xl rounded-lg mx-4 xl:mx-auto lg:max-w-7xl'>
            <div className=' pt-6 w-full lg:flex lg:justify-between lg:gap-x-6 lg:items-center space-y-2 lg:space-y-0 px-10'>
            <div className='w-full text-2xl font-bold flex flex-1 justify-center lg:justify-start'>
            Import CSV File
            </div>
            <div className='flex gap-x-4'>
                <Button
                className='w-full lg:max-w-56'
                onClick={onCancel}
                >
                Cancel
                </Button>
            </div>
            </div>
            <CSVTable 
                header={headers}
                data={tableBody}
            />
        </div>
        </>
  )
}
