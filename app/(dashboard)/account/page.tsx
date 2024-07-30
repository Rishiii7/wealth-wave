"use client";
import React from 'react';

import {  columns } from '@/components/accounts/accounts-table-columns';
import { AccountsDataTable } from '@/components/accounts/accounts-table';
import { AccountsInputDialog } from '@/components/account-input';
import { useGetAccountByID, useGetAccounts, useUpdateAccountByID} from '@/features/accounts/api/user-accounts';
import { AccountEditDialogComponent } from '@/components/account-edit-dialog';
import { Button } from '@/components/ui/button';
import { useOpenNewAccountButton } from '@/components/hooks/open-edit-account';
import { Plus } from 'lucide-react';

const AccountsPage = () => {

  const {onOpen} = useOpenNewAccountButton();
  // const data = await getData();
  const data = useGetAccounts();
  const accounts = data.data || []
  // console.log( "[Data in accounts/page.tsx] : "  + JSON.stringify(data.data))

  return (
    <div className='-mt-16 flex flex-col justify-center items-center p-2 bg-slate-50 shadow-xl rounded-lg mx-auto max-w-7xl'>
      <div className='pt-6 w-full lg:flex lg:justify-between lg:gap-x-6 lg:items-center space-y-2 lg:space-y-0 px-10'>
        <div className='w-full text-2xl font-bold flex flex-1 justify-center lg:justify-start'>
          Acounts Page
        </div>
        <div>
          <Button
            className='w-full lg:max-w-56'
            onClick={onOpen}
            >
              <Plus 
                className='w-5 h-5 mr-2'
                
                  />
            Add new
          </Button>
        </div>
        
      </div>
        <div className='w-full lg:flex lg:justify-end mr-10'>
          <AccountsInputDialog 
            title='Create New Account'
            data={null}  
          />
        </div>
      <div className='w-full lg:flex lg:justify-end mr-10'>
        <AccountEditDialogComponent title='Edit account'/>
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