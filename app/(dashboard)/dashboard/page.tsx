"use client";

import { useGetAccounts, usePostAccoutInput } from '@/features/accounts/api/user-accounts';
import { UserButton, ClerkLoading, ClerkLoaded } from '@clerk/nextjs';

const DashboardPage = () => {

  const { data, isLoading } = useGetAccounts();
  // const { data, isLoading } = usePostAccoutInput("Rishikesh");

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
                data?.map( (account, ind) => (
                  <>
                    <div>
                      { account.id }
                    </div>
                  </>
                ))
            }
          </div>
        }
      
    </div>
  )
}

export default DashboardPage;