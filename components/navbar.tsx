"use client";

import { NavButton } from "@/components/nav-button";
import { usePathname } from "next/navigation";


const routes = [
    {
        label: "Overview",
        href: "/dashboard"
    },
    {
        label: "Transaction",
        href: "/transaction"
    },
    {
        label: "Accounts",
        href: "/account"
    },
    {
        label: "Category",
        href: "/category"
    },
    {
        label: "Settings",
        href: "/setting"
    },
]

export const NavBar = () => {

    const pathname = usePathname();

  return (
    <>
        <div className="space-y-2 lg:space-y-0 lg:flex justify-evenly lg:gap-x-5  text-white lg:text-lg">
            {
                routes.map( (route, ind) => {
                    return (
                        <div key={`${route.label}-${ind}`}>
                            <NavButton 
                                href={ route.href}
                                label={ route.label }
                                isActive = {  pathname === route.href }
                            />
                            
                        </div>
                    )
                })
            }
        </div>
    </>
  )
}
