"use client";
import React from 'react';

import {  columns } from '@/components/accounts/accounts-table-columns';
import { AccountsDataTable } from '@/components/accounts/accounts-table';
import { AccountsInputSheet } from '@/components/account-input';
import { useGetAccounts, usePostBulkDelete } from '@/features/accounts/api/user-accounts';
import { Row } from '@tanstack/react-table';

const AccountsPage = () => {

  // const data = await getData();
  const data = useGetAccounts();
  const accountDelets = usePostBulkDelete();
  const accounts = data.data || []
  // console.log( "[Data in accounts/page.tsx] : "  + JSON.stringify(data.data))

  return (
    <div className='-mt-16 flex flex-col items-center p-2 bg-slate-50 shadow-xl rounded-lg mx-4 '>
      <div className=' pt-6 w-full lg:flex lg:justify-center lg:gap-x-6 lg:items-center space-y-2 lg:space-y-0'>
        <div className='w-full text-2xl font-bold text-center'>
          Acounts Page
        </div>
        <div className='w-full lg:flex lg:justify-end mr-10'>
          {/* <Butto
            className='w-full lg:max-w-56'
            >
              <Plus 
                className='w-5 h-5 mr-2'
              />
            Add new
          </Button> */}
          <AccountsInputSheet />
        </div>
        
      </div>

      <div className='container mx-auto py-10 text-center'>
          <AccountsDataTable
              columns={columns}
              data={accounts}
          />
      </div>
      
    </div>
  )
}

export default AccountsPage;