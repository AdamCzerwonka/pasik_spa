import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRealEstates } from "@/data/realEstate/useRealEstates";
import { useCreateRentMe } from "@/data/rent/useCreateRentMe";
import { cn } from "@/lib/utils";
import { useDialog } from "@/store/dialogStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const createRentSchema = z.object({
  realEstateId: z.string().min(1, "You must select real estate"),
  startDate: z.date({ required_error: "Start date is required" }),
});

type CreateRentSchema = z.infer<typeof createRentSchema>;

const CreateRentDialog: FC = () => {
  const { isOpen, openDialog, closeDialog } = useDialog();
  const { realEstates } = useRealEstates();
  const { createRent } = useCreateRentMe();
  const form = useForm<CreateRentSchema>({
    resolver: zodResolver(createRentSchema),
    defaultValues: {
      realEstateId: "",
      startDate: undefined,
    },
  });

  const handleSubmit = form.handleSubmit((values) => {
    createRent(values);
    closeDialog();
  });
  return (
    <>
      <Button onClick={() => openDialog("createRent")}>New rent</Button>
      <Dialog
        open={isOpen("createRent")}
        onOpenChange={() => {
          form.reset();
          closeDialog();
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New rent</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={handleSubmit}>
              <FormField
                control={form.control}
                name="startDate"
                render={(field) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Start date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[280px] justify-start text-left font-normal",
                            !field.field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.field.value ? (
                            format(field.field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.field.value}
                          onSelect={(val) => field.field.onChange(val)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="realEstateId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Real estate</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {realEstates.map(({ id, name }) => (
                          <SelectItem value={id} key={id}>
                            {name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit">Create</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateRentDialog;
