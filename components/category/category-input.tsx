"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";

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
import { usePostCategoryInput } from "@/features/category/api/user-categories";
import { Plus } from "lucide-react";
import { useOpenNewCategoryButton } from "../hooks/open-edit-category";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

type CategoryInputDialogProps = {
  title: string;
  data: {
    id?: string;
    name?: string;
  } | null | undefined;
  // onSubmit: () => void;

}


export const CategoryInputDialog = ({
  title,
  data
}: CategoryInputDialogProps) => {
  const {isOpen, onClose} = useOpenNewCategoryButton();

  const mutation = usePostCategoryInput();

  // console.log("[RESPONSE] : " + JSON.stringify(response));

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data?.name,
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
        open={isOpen}
        onOpenChange={onClose}
      >
        <DialogContent className="rounded-lg">
        <DialogHeader className="items-center">
          <DialogTitle>{title}</DialogTitle>
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
                  <FormLabel>Category Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g. Food, Travel "
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
