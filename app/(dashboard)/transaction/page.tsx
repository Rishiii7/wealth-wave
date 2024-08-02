"use client";
import React, { useState } from 'react';

import { columns } from '@/components/transaction/transaction-table-columns';
import { TransactionInputDialog } from '@/components/transaction/transaction-input';
import { TransactionEditDialog } from '@/components/transaction/transaction-edit-dialog';
import { TransactionDataTable } from '@/components/transaction/transaction-table';

import { useGetTransactionByAccountId } from '@/features/transaction/user-transaction';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useOpenNewTransactionButton } from '@/components/hooks/open-edit-transaction';
import { UploadCSV } from '@/components/transaction/upload-csv';
import { ImportCSVCard } from '@/components/import-csv-card';

enum VARIANTS  {
  LIST = "LIST",
  IMPORT = "IMPORT",
} 

const INITIAL_IMPORT_RESULT = {
  data: [],
  errors: [],
  meta: {},
}


const TransactionPage = () => {
  const [variant, setVariant] = useState<VARIANTS>(VARIANTS.LIST);
  const [importResults, setImportedResults] = useState(INITIAL_IMPORT_RESULT);
  const data = useGetTransactionByAccountId({});
  const {onOpen} = useOpenNewTransactionButton();
  const transaction = data.data?.data || [];

  const onUpload = ( results: typeof INITIAL_IMPORT_RESULT) => {
    setImportedResults(results);
    // console.log({results})
    setVariant(VARIANTS.IMPORT);
  };

  const onCancel = () => {
    setImportedResults(INITIAL_IMPORT_RESULT);
    setVariant(VARIANTS.LIST);
  }

  if( variant==="IMPORT") {
    return (
      <>
        <ImportCSVCard 
          onCancel={onCancel}
          data = {importResults.data}
        />
      </>
    )
  }

  return (
    <div className='-mt-16 flex flex-col items-center p-2 bg-slate-50 shadow-xl rounded-lg mx-4 lg:mx-auto max-w-7xl'>
    <div className=' pt-6 w-full lg:flex lg:justify-between lg:gap-x-6 lg:items-center space-y-2 lg:space-y-0 px-10'>
        <div className='w-full text-2xl font-bold flex flex-1 justify-center lg:justify-start'>
          Transaction History
        </div>
        <div className='flex gap-x-4'>
          <Button
            className='w-full lg:max-w-56'
            onClick={onOpen}
            >
              <Plus 
                className='w-5 h-5 mr-2'
                
                  />
            Add new
          </Button>
          <UploadCSV 
            onUpload={onUpload}
          />
        </div>
        
      </div>
      <div className='w-full lg:flex lg:justify-end lg:mr-10'>
          <TransactionInputDialog 
            title='Create New Category'  
          />
        </div>
      <div className='w-full lg:flex lg:justify-end lg:mr-10'>
        <TransactionEditDialog 
          title='Edit Transaction'
        />
      </div>

      <div className='container mx-auto py-10 text-center'>
          <TransactionDataTable
              columns={columns}
              data={transaction}
          />
      </div>
      
    </div>
  )
}

export default TransactionPage;