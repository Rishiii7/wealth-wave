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
import { useGetCategories, useGetCategoryByID, useUpdateCategoryByID } from "@/features/category/api/user-categories";
import { Loader2 } from "lucide-react";
import { useOpenEditCategory } from "../hooks/open-edit-category";
import { TransactionForm } from "./transaction-form";
import { InsertTransactionSchema } from "@/types/transaction";
import { useOpenEditTransaction } from "../hooks/open-edit-transaction";
import { useGetTransactionByAccountId, useGetTransactionByID, useUpdateTransactionById } from "@/features/transaction/user-transaction";
import { useGetAccounts } from "@/features/accounts/api/user-accounts";


const formSchema = InsertTransactionSchema.omit({
  id: true
});

type TransactionEditDialogProps = {
  title: string;
}


export const TransactionEditDialog = ({
  title,
}: TransactionEditDialogProps) => {
  const {isOpen, onClose, id} = useOpenEditTransaction();

  console.log('[EDIT TRANSACTION ID] : ' + id);

  const transactionQuery = useGetTransactionByID(id);
  const mutation = useUpdateTransactionById(id);
  const accountQuery = useGetAccounts();
  const categoryQuery = useGetCategories();

  const isLoading = transactionQuery.isLoading || accountQuery.isLoading || categoryQuery.isLoading;

  console.log("[TransactionEditDialog] : " + JSON.stringify(transactionQuery.data));
  const defaultValues = transactionQuery.data && id ? {
     amount: transactionQuery.data.amount,
     payee: transactionQuery.data.payee,
     notes: transactionQuery.data.notes || undefined,
     date: new Date(transactionQuery.data.date),
     accountId: transactionQuery.data.accountId,
     categoryId: transactionQuery.data.categoryId,
  } : {
    amount: 0,
    payee: "",
    date: new Date(),
    accountId: "",
    notes: "",
    categoryId: "",
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // console.log("in the submit")
    console.log("[EDIT Transaction VALUES] : " + JSON.stringify(values));
    console.log("[ID] : " + id)
    if( !id ) return;
    mutation.mutate( { ...values} );
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

          <TransactionForm 
            defaultValues={defaultValues}
            onSubmit={onSubmit}
            accountData={accountQuery.data || []}
            categoryData={categoryQuery.data || []}
          />

          </>
        }
        
        </DialogContent>
      </Dialog>
    </div>
  )
}
