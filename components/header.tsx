
import { NavBar } from '@/components/navbar';
import { Menu } from 'lucide-react';
import { 
    Sheet, 
    SheetContent, 
    SheetHeader, 
    SheetTitle, 
    SheetTrigger 
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { HeaderLogo } from '@/components/header-logo';
import { ClerkLoaded, ClerkLoading, UserButton } from '@clerk/nextjs';
import { shadesOfPurple } from '@clerk/themes';
import { WelcomeMsg } from './welcome-msg';

export const Header = () => {
  return (
    <>
    <div className='space-y-12 pb-16'>

        <div className=' flex items-center justify-between'>
            <div className=' lg:flex items-center lg:gap-x-5'>
                <div className='hidden lg:flex items-center'>
                <HeaderLogo />
                </div>

                <div className='hidden lg:flex items-center ml-10'>
                    <NavBar />
                </div>

                <div className='lg:hidden text-white  p-2 rounded-lg'>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant={"secondary"}
                                >
                                <Menu />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side={"left"} className='bg-gradient-to-b from-purple-700 to-purple-400 space-y-4 items-center w-full lg:hidden'>
                            <SheetHeader>
                                <SheetTitle>
                                    <HeaderLogo />
                                </SheetTitle>
                            </SheetHeader>
                            <div className='w-full py-3'>
                                <NavBar />
                            </div>
                        </SheetContent>
                    </Sheet>

                </div>
            </div>
            <div className='p-2'>
                <ClerkLoading>
                    <div
                        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] text-white"
                        role="status">
                        <span
                        className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                        >Loading...</span>
                    </div>
                </ClerkLoading>
                <ClerkLoaded>
                    <UserButton />
                </ClerkLoaded>
            </div>
        </div>
        <div>
            <WelcomeMsg />
        </div>
        </div>
    </>
  )
}
