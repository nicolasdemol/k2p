"use client";

import { v4 as uuidv4 } from "uuid";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { toast } from "../ui/use-toast";
import { api } from "@/services/api";
import socket from "@/services/socket";
import { UserPlus } from "lucide-react";

const NewAccountFormSchema = z
  .object({
    role: z.string({
      required_error: "Non sélectionné.",
    }),
    firstname: z
      .string({
        required_error: "Champs requis.",
      })
      .min(3, {
        message: "Le prénom doit contenir au moins 3 caractères.",
      }),
    surname: z
      .string({
        required_error: "Champs requis.",
      })
      .min(3, {
        message: "Le nom doit contenir au moins 3 caractères.",
      }),
    password: z
      .string({
        required_error: "Mot de passe requis.",
      })
      .min(3, {
        message: "Le mot de passe doit contenir au moins 3 caractères.",
      }),
    confirm_password: z
      .string({
        required_error: "Confirmation de mot de passe requis.",
      })
      .min(3, {
        message: "Le mot de passe doit contenir au moins 3 caractères.",
      }),
    username: z.string({
      required_error: "Champs requis.",
    }),
  })
  .refine((data) => data.password === data.confirm_password, {
    path: ["confirm_password"],
    message: "Les mots de passe ne correspondent pas.",
  });

export function CreateAccount() {
  const form = useForm<z.infer<typeof NewAccountFormSchema>>({
    resolver: zodResolver(NewAccountFormSchema),
    defaultValues: {
      role: "prod",
    },
  });

  async function onSubmit(data: z.infer<typeof NewAccountFormSchema>) {
    const userData = {
      _id: uuidv4(),
      firstname: data.firstname,
      surname: data.surname,
      username: data.username,
      password: data.password,
      role: data.role,
    };
    api
      .signUpWithUsername(userData)
      .then((res) => {
        toast({
          title: res.message,
          description: `L'utilisateur ${data.username} a bien été ajouté.`,
        });
        socket.emit("new_user", userData);
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: err.response.data.message,
        });
      });
  }

  return (
    <Card className="h-full">
      <Form {...form}>
        <CardHeader>
          <CardTitle>Créer un nouveau compte</CardTitle>
          <CardDescription>
            Permet d'ajouter un nouveau utilisateur ayant accès aux informations
            internes à l'entreprise.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="firstname">Prénom</FormLabel>
                    <FormControl>
                      <Input id="firstname" placeholder="prénom" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="surname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="surname">Nom</FormLabel>
                    <FormControl>
                      <Input id="surname" placeholder="nom" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="username">Identifiant</FormLabel>
                    <FormControl>
                      <Input
                        id="username"
                        placeholder="prénom.nom (pour se connecter)"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="role">Rôle</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger id="area">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="prod">Production</SelectItem>
                          <SelectItem value="quality">Qualité</SelectItem>
                          <SelectItem value="admin">Administrateur</SelectItem>
                          <SelectItem value="support">Support</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="password">Mot de passe</FormLabel>
                  <FormControl>
                    <Input id="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="confirm_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="confirm_password">
                    Confirmer le mot de passe
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="confirm_password"
                      placeholder="********"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </CardContent>
        <CardFooter className="justify-end space-x-2">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Button>
              <UserPlus className="mr-2 h-5 w-5" />
              Créer le compte
            </Button>
          </form>
        </CardFooter>
      </Form>
    </Card>
  );
}
