"use client";
import React from 'react';


import { columns } from '@/components/transaction/transaction-table-columns';
import { TransactionInputDialog } from '@/components/transaction/transaction-input';
import { TransactionEditDialog } from '@/components/transaction/transaction-edit-dialog';
import { TransactionDataTable } from '@/components/transaction/transaction-table';

import { useGetTransactionByAccountId } from '@/features/transaction/user-transaction';

const TransactionPage = () => {
  const data = useGetTransactionByAccountId({});
  const transaction = data.data?.data || []

  console.log('[TRANSACTION DATA FETCH] : '+ JSON.stringify(transaction))

  return (
    <div className='-mt-16 flex flex-col items-center p-2 bg-slate-50 shadow-xl rounded-lg mx-4 '>
      <div className=' pt-6 w-full lg:flex lg:justify-center lg:gap-x-6 lg:items-center space-y-2 lg:space-y-0'>
        <div className='w-full text-2xl font-bold text-center'>
          Transaction History
        </div>
        <div className='w-full lg:flex lg:justify-end mr-10'>
          <TransactionInputDialog 
            title='Create New Category'  
          />
        </div>
        <div className='w-full lg:flex lg:justify-end mr-10'>
          <TransactionEditDialog 
            title='Edit Transaction'
          />
        </div>
        
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