import { Dialog } from "@radix-ui/react-dialog";
import { useState } from "react";

import { DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { useGetAccounts } from "@/features/accounts/api/user-accounts";
import { useGetCategories } from "@/features/category/api/user-categories";

type ConfirmDialogProps = {
    onSelectChange: (data: string) => void
}

type TransactionImportConfirmProps = {
    title: string;
    data: {
        id: string,
        name: string
    }[] | undefined;
}

export const useTransactionImportConfirm = ({
    title,
    data
}: TransactionImportConfirmProps):[() => Promise<unknown>, (props: ConfirmDialogProps) => JSX.Element] => {
    const [promise, setPromise] = useState<{resolve: (value: boolean)=> void} | null>(null);

    const confirm = () => new Promise((resolve, reject) => {
        setPromise({ resolve });
    });

    const handleClose = () => {
        setPromise(null);
    }

    const handleConfirm = () => {
        promise?.resolve(true);
        handleClose();
    }

    const handleCancel = () => {
        promise?.resolve(false);
        handleClose();
    }

    const ConfirmDialog = ({
        onSelectChange,
    }: ConfirmDialogProps) => {
        return (
            <>
                <Dialog
                    open={promise!==null}
                >
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                { title }
                            </DialogTitle>
                        </DialogHeader>
                        <div className=" flex flex-col justify-center w-full items-center">
                            <Select
                                onValueChange={onSelectChange}
                                >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select an account" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                    {
                                        data?.map( (acc, ind) => (
                                            <>
                                            <SelectItem
                                                value={acc.id}
                                                key={`${acc.id}-${ind}`}
                                                >
                                                { acc.name}
                                            </SelectItem>

                                            </>
                                        ))
                                    }
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex justify-center gap-4">
                            <Button
                                size={"lg"}
                                onClick={handleConfirm}
                            >
                                Confirm
                            </Button>
                            <Button
                                variant={"destructive"}
                                size={"lg"}
                                onClick={handleCancel}
                            >
                                Cancel
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </>
            
        )
    };

    return [confirm, ConfirmDialog];
}