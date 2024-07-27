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
import { useOpenEditTransaction } from "../hooks/open-edit-transaction";


export const Actions = ({
    id
} : {
    id : string
}) => {

    const {onOpen}  = useOpenEditTransaction();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant={"ghost"}
                >
                    <span className="sr-only">Open Menu</span>
                    <MoreHorizontal className="h-5 w-5"/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(id)}
                >
                Copy Transaction ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Button
                        variant={"ghost"}
                        className="font-normal"
                        onClick={() => onOpen(id)}
                    >
                        Edit Transaction
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
