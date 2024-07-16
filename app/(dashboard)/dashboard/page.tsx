"use client";

import { useGetAccounts } from '@/features/accounts/api/user-accounts';
import { UserButton, ClerkLoading, ClerkLoaded } from '@clerk/nextjs';

const DashboardPage = () => {

  const { data, isLoading } = useGetAccounts();

  return (
    <div>
        DashboardPage
        {/* <ClerkLoading>
          <div> Loading ... </div>
        </ClerkLoading>
        <ClerkLoaded>
          <UserButton />
        </ClerkLoaded> */}
        
        {
          isLoading ? <div>loading...</div> : <div>
            {
              data?.map( (account) => (
                <div key={account.id}>
                  { account.name }
                </div>
              ))
            }
          </div>
        }
            
        
      
    </div>
  )
}

export default DashboardPage;