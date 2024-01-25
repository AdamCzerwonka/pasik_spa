import { Button } from "@/components/ui/button";
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useUpdateUser } from "@/data/user/useUpdateUser";
import { useUser } from "@/data/user/useUser";
import { User } from "@/data/user/useUsers";
import { useDialog } from "@/store/dialogStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type EditUserDialogProps = {
  user: User;
};

const updateUserSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  active: z.boolean(),
});

type UpdateUserSchema = z.infer<typeof updateUserSchema>;

const EditUserDialog: FC<EditUserDialogProps> = ({ user: { id } }) => {
  const { isOpen, closeDialog } = useDialog();
  const { user } = useUser(id);
  const { updateUser } = useUpdateUser();
  const methods = useForm<UpdateUserSchema>({
    resolver: zodResolver(updateUserSchema),
    values: {
      ...user!,
    },
  });

  const handleSubmit = methods.handleSubmit((values) => {
    updateUser({
      id: user!.id,
      role: user!.role,
      login: user!.login,
      ...values,
      etag: user!.eTag ?? "",
    });
    closeDialog();
  });
  return (
    <Dialog
      open={isOpen("editUser")}
      onOpenChange={() => {
        closeDialog();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit {user?.login}</DialogTitle>
        </DialogHeader>
        <Form {...methods}>
          <form onSubmit={handleSubmit}>
            <FormField
              control={methods.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input placeholder="First name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={methods.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input placeholder="Last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={methods.control}
              name="active"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Account status</FormLabel>
                    <FormDescription>
                      If account is inactive it cannot make new rents.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserDialog;
