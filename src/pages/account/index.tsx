import RentTable from "@/components/RentTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLoggedInUserRents } from "@/data/rent/useLoggedInUserRents";
import { useLoggedInUser } from "@/data/user/useLoggedInUser";
import { useResetPassword } from "@/data/user/useResetPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const changePasswordSchema = z.object({
  oldPassword: z.string().min(1),
  newPassword: z.string().min(1),
});

type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;

const AccountPage: FC = () => {
  const form = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
    values: {
      oldPassword: "",
      newPassword: "",
    },
  });
  const { user } = useLoggedInUser();
  const { rents } = useLoggedInUserRents();
  const { changePassword } = useResetPassword();
  const handleSubmit = form.handleSubmit(async (values) => {
    await changePassword(values);
    form.reset();
  });
  return (
    <div>
      <Form {...form}>
        <form onSubmit={handleSubmit}>
          <FormField
            control={form.control}
            name="oldPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Old password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button>Change password</Button>
        </form>
      </Form>
      <div>First name: {user?.login}</div>
      <div>First name: {user?.firstName}</div>
      <div>First name: {user?.lastName}</div>
      <div>
        First name:{" "}
        <Badge variant={user?.active ? "default" : "secondary"}>
          {user?.active ? "Active" : "Inactive"}
        </Badge>
      </div>
      <div>First name: {user?.role}</div>
      {rents && <RentTable rents={rents} />}
    </div>
  );
};

export default AccountPage;
