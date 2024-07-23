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
import { useGetCategoryByID, useUpdateCategoryByID } from "@/features/category/api/user-categories";
import { Loader2 } from "lucide-react";
import { useOpenEditCategory } from "../hooks/open-edit-category";
import { CategoryForm } from "./category-form";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

type CategoryEditDialogComponentProps = {
  title: string;
}


export const CategoryEditDialogComponent = ({
  title,
}: CategoryEditDialogComponentProps) => {
  const {isOpen, onClose, id} = useOpenEditCategory()

  const categoryQuery = useGetCategoryByID(id);
  const mutation = useUpdateCategoryByID();

  const isLoading = categoryQuery.isLoading;

  console.log("[CategoryEditDialogComponent] : " + JSON.stringify(categoryQuery.data));
  const defaultValues = categoryQuery.data ? {
    name: categoryQuery.data.name
  } : {
    name: ""
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // console.log("in the submit")
    console.log("[EDIT CATEGORY VALUES] : " + JSON.stringify(values));
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

          <CategoryForm 
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
