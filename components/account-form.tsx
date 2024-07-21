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

const formSchema = z.object({
    name: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
  });
  
type FormValues = z.input<typeof formSchema>;

type AccountFormPorps = {
    defaultValues: FormValues;
    onSubmit: (values: FormValues) => void
}

export const AccountForm = ({
    defaultValues,
    onSubmit
}: AccountFormPorps) => {
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
    </form>
  </Form></div>
  )
}
