import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type NavButtonProps = {
    href: string;
    label: string;
    isActive: boolean;
}

export const NavButton = ({
    href,
    label,
    isActive
}: NavButtonProps) => {

    console.log(label + isActive);

  return (
    <div>
        <Button 
            variant={"secondary"}
            size={"sm"}
            className={ cn("bg-transparent hover:bg-white/10 transition text-white", isActive ? "bg-white/10 text-white" : "") }
        >
            <Link 
                href={href}
            >
            { label }
            </Link>
        </Button>
    </div>
  )
}
