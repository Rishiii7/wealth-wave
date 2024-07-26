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
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";


const formSchema = InsertTransactionSchema.omit({
  id: true,
});
  
type FormValues = z.input<typeof formSchema>;

type TransactionFormPorps = {
    defaultValues?: FormValues;
    onSubmit: (values: FormValues) => void;
    accountData : {
      id: string;
      name: string;
    }[];
    categoryData: {
      id: string;
      name: string;
    }[];
}

export const TransactionForm = ({
    defaultValues,
    onSubmit,
    accountData,
    categoryData
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
                placeholder="e.g Rishi"
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
        {/* Account Name */}
        <FormField
          control={form.control}
          name="accountId"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Account</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? accountData.find(
                            (data) => data.id === field.value
                          )?.name
                        : "Select Account"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search Account..." />
                    <CommandList>
                      <CommandEmpty>No Account found.</CommandEmpty>
                      <CommandGroup>
                        {accountData.map((data) => (
                          <CommandItem
                            value={data.name}
                            key={data.id}
                            onSelect={() => {
                              form.setValue("accountId", data.id)
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                data.id === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {data.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Category Name */}
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Category</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? categoryData.find(
                            (data) => data.id === field.value
                          )?.name
                        : "Select Category"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search Category..." />
                    <CommandList>
                      <CommandEmpty>No Category found.</CommandEmpty>
                      <CommandGroup>
                        {categoryData.map((data) => (
                          <CommandItem
                            value={data.name}
                            key={data.id}
                            onSelect={() => {
                              form.setValue("categoryId", data.id)
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                data.id === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {data.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Notes */}
        <FormField 
          control={form.control}
          name="notes"
          render={ ({field}) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Get from Safeway"
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
