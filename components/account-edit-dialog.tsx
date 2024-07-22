"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { z } from "zod"
import { useGetAccountByID, usePostAccoutInput, useUpdateAccountByID } from "@/features/accounts/api/user-accounts";
import { Loader2 } from "lucide-react";
import { useOpenEditAccount } from './hooks/open-edit-account';
import { AccountForm } from "./account-form";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

type AccountEditDialogComponentProps = {
  title: string;
}


export const AccountEditDialogComponent = ({
  title,
}: AccountEditDialogComponentProps) => {
  const {isOpen, onClose, id} = useOpenEditAccount()

  const accountQuery = useGetAccountByID(id);
  const mutation = useUpdateAccountByID();

  const isLoading = accountQuery.isLoading;

  console.log("[AccountEditDialogComponent] : " + JSON.stringify(accountQuery.data));
  const defaultValues = accountQuery.data ? {
    name: accountQuery.data.name
  } : {
    name: ""
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // console.log("in the submit")
    console.log("[EDIT ACCOUNT VALUES] : " + JSON.stringify(values));
    console.log("[ID] : " + id)
    if( !id ) return;
    mutation.mutate( { id: id, name: values.name} );
    form.reset();
    onClose();
  }

 
  return (
    <div>
      
      <Dialog
        open={isOpen}
        onOpenChange={onClose}
      >
        <DialogContent className="rounded-lg">
        <DialogHeader className="items-center">
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {
          isLoading ? <>
          <div className="items-center flex justify-center py-5">
          <Loader2 />
          </div>
          </> : <>

          <AccountForm 
            defaultValues={defaultValues}
            onSubmit={onSubmit}
            onClose={onClose}
          />

          </>
        }
        
        </DialogContent>
      </Dialog>
    </div>
  )
}
