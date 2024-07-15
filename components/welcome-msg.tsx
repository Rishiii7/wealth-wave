"use client";

import { useUser } from "@clerk/nextjs";

export const WelcomeMsg = () => {

    const { user, isSignedIn } = useUser();
    if( !isSignedIn ) return null;

    console.log( user.firstName );
    console.log( "user : " + user.emailAddresses[0].emailAddress.charAt(0) );

    return (
        <>
        <div className=" space-y-2 items-center p-3">
            <div className="text-white items-center w-full sm:text-4xl font-bold text-2xl">
                Welcome Back, { user.emailAddresses[0].emailAddress.charAt(0).toUpperCase() } 👋
            </div>
            <div className="text-white/90 text-sm">
                This is your Financial report
            </div>
        </div>
        </>
  )
}
