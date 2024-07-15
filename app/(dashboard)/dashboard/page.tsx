import { UserButton, ClerkLoading, ClerkLoaded } from '@clerk/nextjs';

const DashboardPage = () => {
  return (
    <div>
        DashboardPage
        <ClerkLoading>
          <div> Loading ... </div>
        </ClerkLoading>
        <ClerkLoaded>
          <UserButton />
        </ClerkLoaded>

    </div>
  )
}

export default DashboardPage;