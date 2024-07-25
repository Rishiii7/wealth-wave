import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns"
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import z from "zod";
import { Button } from "../ui/button";
import { InsertTransactionSchema } from "@/types/transaction";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";


const formSchema = InsertTransactionSchema.omit({
  id: true
});
  
type FormValues = z.input<typeof formSchema>;

type TransactionFormPorps = {
    defaultValues?: FormValues;
    onSubmit: (values: FormValues) => void;
}

export const TransactionForm = ({
    defaultValues,
    onSubmit,
}: TransactionFormPorps) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues
      });

  return (
    <div className="">
    <Form
     {...form}
    >
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-4"
    >
      {/* Amount Field */}
      <FormField 
        control={form.control}
        name="amount"
        render={ ({field}) => (
          <FormItem>
            <FormLabel>Amount</FormLabel>
            <FormControl>
              <Input
                type="number" 
                placeholder="$100"
                {...field}
                onChange={(e) => field.onChange(parseInt(e.target.value))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* Payee Field */}
      <FormField 
        control={form.control}
        name="payee"
        render={ ({field}) => (
          <FormItem>
            <FormLabel>Payee Name</FormLabel>
            <FormControl>
              <Input 
                placeholder="$100"
                {...field}
              />
            </FormControl>
            <FormDescription>This will publicly display your name</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* Date */}
      <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Your date of birth is used to calculate your age.
              </FormDescription>
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
