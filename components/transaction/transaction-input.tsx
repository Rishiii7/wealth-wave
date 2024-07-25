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

import { useCreateTransaction } from "@/features/transaction/user-transaction";



const formSchema = InsertTransactionSchema.omit({
  id: true
})

type TransactionInputDialogProps = {
  title: string;
}


export const TransactionInputDialog = ({
  title,
}: TransactionInputDialogProps) => {
  const [open, setOpen] = useState(false);

  const mutation = useCreateTransaction();

  // console.log("[RESPONSE] : " + JSON.stringify(response));
  const defaultValues = {
    amount: 0,
    payee: "",
    date: new Date(),
    accountId: "clz0jfj9z0006vx1s4gyq9aak",
    notes: "",
    categoryId: "clz0jfxf30007vx1sp8lc9knk",
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // console.log("in the submit")
    console.log("[TRANSACTION FORM VALUES]"+ JSON.stringify(values));
    mutation.mutate( values );
    form.reset();
    setOpen(false);
  }
 
  return (
    <div>
      <Dialog
        open={open}
        onOpenChange={setOpen}
      >
        <DialogTrigger asChild>
          <Button
            className='w-full lg:max-w-56'
            >
              <Plus 
                className='w-5 h-5 mr-2'
              />
            Add new
          </Button>
        </DialogTrigger>
        <DialogContent className="rounded-lg">
        <DialogHeader className="items-center">
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
          <TransactionForm
            defaultValues={defaultValues}
            onSubmit={onSubmit} 
          
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}
