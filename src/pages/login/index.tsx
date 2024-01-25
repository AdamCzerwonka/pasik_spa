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
import { useAuth } from "@/data/auth/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const loginSchema = z.object({
  login: z.string().min(1),
  password: z.string().min(1),
});

type LoginSchema = z.infer<typeof loginSchema>;

const LoginPage: FC = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    values: {
      login: "",
      password: "",
    },
  });

  const handleSubmit = form.handleSubmit(async (values) => {
    await auth(values);
    navigate("/");
  });

  return (
    <div>
      <Form {...form}>
        <form onSubmit={handleSubmit}>
          <FormField
            control={form.control}
            name="login"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button>Login</Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginPage;
