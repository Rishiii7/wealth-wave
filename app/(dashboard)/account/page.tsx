import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';
import React from 'react';

import { Accounts, columns } from '@/components/accounts/accounts-table-columns';
import { AccountsDataTable } from '@/components/accounts/accounts-table';


async function getData(): Promise<Accounts[]> {

  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      username: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "success",
      username: "a@example.com",
    },
  ]
  
}

const AccountsPage = async () => {

  const data = await getData();

  return (
    <div className='-mt-16 flex flex-col items-center p-2 bg-slate-50 shadow-xl rounded-lg mx-4 '>
      <div className=' pt-6 w-full lg:flex lg:justify-center lg:gap-x-6 lg:items-center space-y-2 lg:space-y-0'>
        <div className='w-full text-2xl font-bold text-center'>
          Acounts Page
        </div>
        <div className='w-full lg:flex lg:justify-end mr-10'>
          <Button
            className='w-full lg:max-w-56'
            >
              <Plus 
                className='w-5 h-5 mr-2'
              />
            Add new
          </Button>
        </div>
        
      </div>

      <div className='container mx-auto py-10 text-center'>
          <AccountsDataTable
              columns={columns}
              data={data}
          />
      </div>
      
    </div>
  )
}

export default AccountsPage;