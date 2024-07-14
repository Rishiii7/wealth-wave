import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function SigninPage() {
  return (
    <>
    <div 
        className="min-h-screen w-full grid grid-cols-1
                lg:grid lg:grid-cols-2"
    >
        <div className="h-full flex flex-col items-center justify-center bg-black/10 shadow-xl">
            <SignIn />
        </div>
        <div className="hidden bg-blue-500 lg:flex flex-col items-center justify-center">
            <Image 
                src="/logo.png"
                alt="logo"
                width={500}
                height={100}
                className="rounded-lg "
            /> 
        </div>
    </div>
    </>
  );
}