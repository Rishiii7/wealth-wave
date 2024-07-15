
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
import { UserButton } from '@clerk/nextjs';
import { shadesOfPurple } from '@clerk/themes';

export const Header = () => {
  return (
    <>
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
            <div >
                <UserButton
                    appearance={{
                        baseTheme: shadesOfPurple
                        
                    }}
                />
            </div>
        </div>
    </>
  )
}
