"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import { useOpenEditAccount } from "../hooks/open-edit-account";

export const Actions = ({
    id
} : {
    id : string
}) => {

    const {onOpen}  = useOpenEditAccount();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button>
                    <span className="sr-only">Open Menu</span>
                    <MoreHorizontal className="h-4 w-4"/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(id)}
                >
                Copy Account ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Button
                        variant={"ghost"}
                        className="font-normal"
                        onClick={() => onOpen(id)}
                    >
                        Edit Account
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
