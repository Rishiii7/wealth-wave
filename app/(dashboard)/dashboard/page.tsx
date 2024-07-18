"use client";

import { AccountInputForm } from '@/components/account-form-input';
import { AccountsInputSheet } from '@/components/account-input';
import { useGetAccounts, usePostAccoutInput } from '@/features/accounts/api/user-accounts';
import { UserButton, ClerkLoading, ClerkLoaded } from '@clerk/nextjs';

const DashboardPage = () => {

  // const { data, isLoading } = useGetAccounts();
  // const  mutation  = usePostAccoutInput();

  return (
    <div>
        DashboardPage
        <AccountsInputSheet />
        {/* <AccountInputForm /> */}
      
    </div>
  )
}

export default DashboardPage;