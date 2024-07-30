"use client";

import { z } from "zod";
import { Plus } from "lucide-react";
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TransactionForm } from "@/components/transaction/transaction-form";

import { InsertTransactionSchema } from "@/types/transaction";

import { useCreateTransaction, useGetTransactionByAccountId } from "@/features/transaction/user-transaction";
import { useGetAccountByID, useGetAccounts } from "@/features/accounts/api/user-accounts";
import { useGetCategories } from "@/features/category/api/user-categories";
import { useOpenNewTransactionButton } from "../hooks/open-edit-transaction";



const formSchema = InsertTransactionSchema.omit({
  id: true,
})

type TransactionInputDialogProps = {
  title: string;
}


export const TransactionInputDialog = ({
  title,
}: TransactionInputDialogProps) => {

  const {isOpen, onClose} = useOpenNewTransactionButton();

  const mutation = useCreateTransaction();
  const accountQuery = useGetAccounts();
  const categoryQuery = useGetCategories();

  console.log("[GET_ALL_ACCOUNT]" + JSON.stringify(accountQuery.data))
  console.log("[GET_ALL_Category]" + JSON.stringify(categoryQuery.data))

  // console.log("[RESPONSE] : " + JSON.stringify(response));
  const defaultValues = {
    amount: 0,
    payee: "",
    date: new Date(),
    accountId: "",
    notes: "",
    categoryId: "",
    account: "",
    category: ""
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // console.log("in the submit")
    // console.log("[TRANSACTION FORM VALUES]"+ JSON.stringify(values));
    mutation.mutate( values );
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
          <TransactionForm
            defaultValues={defaultValues}
            onSubmit={onSubmit}
            accountData = {accountQuery.data || []} 
            categoryData = {categoryQuery.data || []}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}
