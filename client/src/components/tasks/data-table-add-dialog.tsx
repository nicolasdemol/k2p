import * as React from "react";
import { labels, priorities, statuses } from "./data/data";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

import { PlusIcon } from "lucide-react";
import { api } from "@/services/api";
import { User } from "@/hooks/useAuth";

const FormSchema = z.object({
  status: z.string({
    required_error: "Non sélectionné.",
  }),
  priority: z.string({
    required_error: "Non sélectionnée.",
  }),
  title: z
    .string({
      required_error: "Champs requis.",
    })
    .min(4, {
      message: "Votre titre doit contenir au moins 4 caractères.",
    }),
  label: z.enum(["documentation", "panne", "feature"]),
});

export function DataTableAddDialog() {
  const [users, setUsers] = React.useState<User[]>([]);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  React.useEffect(() => {
    async function fetchUsers() {
      const { users } = await api.getAllUsers();
      setUsers(users);
    }
    fetchUsers();
  }, []);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    api.addTask(data);
    toast({
      title: "Les informations viennent d'être ajoutées.",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          size="sm"
          className="ml-auto hidden h-8 lg:flex"
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          Ajouter
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Ajouter une tâche</DialogTitle>
              <DialogDescription>
                Faire un changement dans la liste des tâches. Cliquer sur
                ajouter une fois terminé.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="title">Titre</FormLabel>
                      <FormControl>
                        <Input
                          id="title"
                          placeholder="J'ai besoin d'aide avec..."
                          autoComplete="off"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="status">Status</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger
                              id="status"
                              className="line-clamp-1 w-[160px] truncate"
                            >
                              <SelectValue placeholder="Sélectionner" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {statuses.map((status) => (
                              <SelectItem
                                key={status.value}
                                value={status.value}
                              >
                                <div className="flex items-center">
                                  {status.label}
                                  <status.icon className="ml-2 h-4 w-4 text-muted-foreground" />
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="priority"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="priority">Priorité</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger
                              id="priority"
                              className="line-clamp-1 w-[160px] truncate"
                            >
                              <SelectValue placeholder="Sélectionner" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {priorities.map((priority) => (
                              <SelectItem
                                key={priority.value}
                                value={priority.value}
                              >
                                <div className="flex items-center">
                                  {priority.label}
                                  <priority.icon className="ml-2 h-4 w-4 text-muted-foreground" />
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="priority"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="user">Affectée à</FormLabel>
                        <Popover open={open} onOpenChange={setOpen}>
                          <FormControl>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open}
                                className="w-[160px] justify-between"
                              >
                                {value
                                  ? users.find(
                                      (user) => user.username === value
                                    )?.username
                                  : "Sélectionner"}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </PopoverTrigger>
                          </FormControl>
                          <PopoverContent className="w-[160px] p-0">
                            <Command>
                              <CommandInput placeholder="Rechercher..." />
                              <CommandEmpty>Aucun résultat.</CommandEmpty>
                              <CommandGroup>
                                {users.map((user) => (
                                  <CommandItem
                                    key={user._id}
                                    onSelect={(currentValue) => {
                                      setValue(
                                        currentValue === value
                                          ? ""
                                          : currentValue
                                      );
                                      setOpen(false);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        value === user.username
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {user.username}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Appliquer</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
