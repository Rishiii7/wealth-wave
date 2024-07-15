import { Header } from '@/components/header';
import React from 'react'

const DashboardLayout = ({
    children
}: {
    children :React.ReactNode
}) => {
  return (
    <div>
        <div className='bg-gradient-to-b from-purple-700 to-purple-400 p-10'>
            <Header />
        </div>
        <div>
            {
                children
            }
        </div>
    </div>
  )
}

export default DashboardLayout;