import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import z from "zod";
import { Button } from "../ui/button";
import { Category } from './category-table-columns';

const formSchema = z.object({
    name: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
  });
  
type FormValues = z.input<typeof formSchema>;

type CategoryFormPorps = {
    defaultValues: FormValues;
    onSubmit: (values: FormValues) => void;
    onClose: () => void;
}

export const CategoryForm = ({
    defaultValues,
    onSubmit,
    onClose
}: CategoryFormPorps) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues
      });

  return (
    <div><Form {...form}>
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
                placeholder="John Doe"
                {...field}
              />
            </FormControl>
            <FormDescription>This will publicly display your name</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="flex justify-center">
        <Button>
            Save Changes
        </Button>
      </div>
    </form>
  </Form></div>
  )
}
