import React from 'react'
import { Button } from '../ui/button'
import { UploadIcon } from 'lucide-react'
import { useCSVReader } from 'react-papaparse';

type UploadCSVProps = {
    onUpload: (resulst: any) => void,
}

export const UploadCSV = ({
    onUpload
}: UploadCSVProps) => {
    const { CSVReader } = useCSVReader();
    return (
        <>
        <CSVReader 
            onUploadAccepted={onUpload}
        >
        {({getRootProps}: any) => (
            <>
                <Button
                    className='w-full lg:max-w-56'
                    onClick={() => {}}
                    {...getRootProps()}
                    >
                    <UploadIcon 
                        className='w-5 h-5 mr-2'
                    />
                    Import
                </Button>
            </>
        )}
        </CSVReader>
        </>
    )
}
