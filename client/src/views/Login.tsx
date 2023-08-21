import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import bgLoginPage from "@/assets/bg-login.jpg";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/ui/logo";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  username: z.string().min(1, {
    message: "Un identifiant est requis.",
  }),
  password: z.string().min(6, {
    message: "Le mot de passe doit contenir au moins 6 caractères.",
  }),
});

export default function Login() {
  const auth = useAuth();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    auth
      .logInWithUsername(values.username, values.password)
      .then(() => navigate("/", { replace: true }))
      .catch((error) => {
        // Vérifiez si l'erreur contient un message
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          if (error.response.status === 404) {
            form.setError("username", { message: error.response.data.message });
          } else {
            form.setError("password", { message: error.response.data.message });
          }
        }
      });
  }

  function getBg() {
    const storedImage = localStorage.getItem("backgroundImage");
    if (storedImage) {
      return storedImage;
    } else {
      localStorage.setItem("backgroundImage", bgLoginPage);
      return bgLoginPage;
    }
  }

  return (
    <div className="h-[80vh] flex items-center">
      <div className="absolute overflow-hidden inset-0">
        <img src={getBg()} />
      </div>
      <Card className="z-10 w-[350px] mx-auto">
        <Form {...form}>
          <CardHeader>
            <Logo className="w-1/2 mx-auto" />
            <CardDescription className="text-center">
              Connectez-vous à la plateforme.
            </CardDescription>
          </CardHeader>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="username">Identifiant</FormLabel>
                        <FormControl>
                          <Input id="username" autoComplete="off" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="password">Mot de passe</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            id="password"
                            autoComplete="off"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button type="submit">Se connecter</Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
