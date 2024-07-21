"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "./ui/button";

import React, { useState } from 'react';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";


import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { z } from "zod"
import { usePostAccoutInput } from "@/features/accounts/api/user-accounts";
import { Plus } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export const AccountsInputSheet = () => {
  const [open, setOpen] = useState(false);

  const mutation = usePostAccoutInput();

  // console.log("[RESPONSE] : " + JSON.stringify(response));

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // console.log("in the submit")
    console.log(values);
    mutation.mutate( values );
    form.reset();
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
        <DialogContent className="">
        <DialogHeader className="items-center">
          <DialogTitle>Create New Account</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField 
              control={form.control}
              name="name"
              render={ ({field}) => (
                <FormItem>
                  <FormLabel>Account Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="John Doe"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>This will publicly display your name</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogClose 
              asChild
              className="w-full"
            >
              <Button
                type="submit"
              >
                submit
              </Button>
            </DialogClose>
          </form>
        </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
