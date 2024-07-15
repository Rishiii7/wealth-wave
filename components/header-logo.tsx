
import Image from 'next/image';
import Link from 'next/link';


export const HeaderLogo = () => {
  return (
    <div>
        <Link 
            href={"/dashboard"}
            className='flex items-center gap-x-4 '
        >
            <Image 
                src={"/logo.jpeg"}
                alt={"logo"}
                height={"50"}
                width={"50"}
                className='rounded-full'
            />
            <p className='text-white font-bold text-2xl'>
                Wealth Wave
            </p>
        </Link>
</div>
  )
}
