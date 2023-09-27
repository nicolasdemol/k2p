import * as React from "react";
import { v4 as uuidv4 } from "uuid";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { labels, statuses, priorities } from "./data/data";
import { useLocation } from "react-router-dom";
import { toast } from "../ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { api } from "@/services/api";
import { useAuth } from "@/hooks/useAuth";

const FormSchema = z.object({
  status: z.string({
    required_error: "Non sélectionné.",
  }),
  priority: z.string({
    required_error: "Non sélectionnée.",
  }),
  label: z.string({
    required_error: "Non sélectionné.",
  }),
  title: z
    .string({
      required_error: "Champs requis.",
    })
    .min(4, {
      message: "Votre titre doit contenir au moins 4 caractères.",
    }),
  description: z.string({
    required_error: "Champs requis.",
  }),
});

export function DataTableReport() {
  const { state } = useLocation();
  const { user } = useAuth();
  const [open, setOpen] = React.useState(false);
  const [openStatus, setOpenStatus] = React.useState(false);
  const [openLabel, setOpenLabel] = React.useState(false);
  const [openPriority, setOpenPriority] = React.useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: state?.title || "",
      label: state?.label,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const issueData = {
      _id: uuidv4(),
      reportedBy: user?._id,
      ...data,
    };
    api.addIssue(issueData).then(() => {
      toast({
        title: "Les informations viennent d'être ajoutées.",
      });
      setOpen(false);
    });
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
      defaultOpen={state?.open || false}
    >
      <DialogTrigger asChild>
        <Button variant="secondary" size="sm" className="h-8">
          <AlertCircle className="h-4 w-4 mr-2" />
          Ajouter un signalement
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <DialogHeader>
            <DialogTitle>Ajouter un signalement</DialogTitle>
            <DialogDescription>
              Permet d'ajouter un signalement dans la liste des problèmes
              rencontrés.
            </DialogDescription>
          </DialogHeader>
          <div className="grid">
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col w-full col-span-3">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Titre du signalement"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex items-start space-x-4">
                <FormField
                  control={form.control}
                  name="label"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Popover open={openLabel} onOpenChange={setOpenLabel}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-full justify-between",
                                !field.value && "text-slate-500"
                              )}
                            >
                              {field.value ? (
                                labels.map(
                                  (label) =>
                                    label.value === field.value && (
                                      <div
                                        key={label.value}
                                        className="flex items-center"
                                      >
                                        <label.icon className="mr-2 h-4 w-4" />
                                        <span>{label.label}</span>
                                      </div>
                                    )
                                )
                              ) : (
                                <>
                                  {"Type"}
                                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent
                            className="p-0 w-[140px]"
                            side="right"
                            align="start"
                          >
                            <Command>
                              <CommandList>
                                <CommandGroup>
                                  {labels.map((label) => (
                                    <CommandItem
                                      value={label.label}
                                      key={label.value}
                                      onSelect={() => {
                                        form.setValue("label", label.value);
                                        setOpenLabel(false);
                                      }}
                                    >
                                      <label.icon
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          label.value === field.value
                                            ? "opacity-100"
                                            : "opacity-40"
                                        )}
                                      />
                                      <span>{label.label}</span>
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex items-start space-x-4">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Popover open={openStatus} onOpenChange={setOpenStatus}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-full justify-between",
                                !field.value && "text-slate-500"
                              )}
                            >
                              {field.value
                                ? statuses.find(
                                    (status) => status.value === field.value
                                  )?.label
                                : "Status"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent
                            className="p-0 w-[140px]"
                            side="right"
                            align="start"
                          >
                            <Command>
                              <CommandList>
                                <CommandGroup>
                                  {statuses.map((status) => (
                                    <CommandItem
                                      value={status.label}
                                      key={status.value}
                                      onSelect={() => {
                                        form.setValue("status", status.value);
                                        setOpenStatus(false);
                                      }}
                                    >
                                      <status.icon
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          status.value === field.value
                                            ? "opacity-100"
                                            : "opacity-40"
                                        )}
                                      />
                                      <span>{status.label}</span>
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex items-start space-x-4">
                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Popover
                          open={openPriority}
                          onOpenChange={setOpenPriority}
                        >
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-full justify-between",
                                !field.value && "text-slate-500"
                              )}
                            >
                              {field.value
                                ? priorities.find(
                                    (priority) => priority.value === field.value
                                  )?.label
                                : "Priorité"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent
                            className="p-0 w-[140px]"
                            side="right"
                            align="start"
                          >
                            <Command>
                              <CommandList>
                                <CommandGroup>
                                  {priorities.map((priority) => (
                                    <CommandItem
                                      value={priority.label}
                                      key={priority.value}
                                      onSelect={() => {
                                        form.setValue(
                                          "priority",
                                          priority.value
                                        );
                                        setOpenPriority(false);
                                      }}
                                    >
                                      <priority.icon
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          priority.value === field.value
                                            ? "opacity-100"
                                            : "opacity-40"
                                        )}
                                      />
                                      <span>{priority.label}</span>
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-3">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          rows={6}
                          placeholder="Veuillez inclure toutes les informations pertinentes à votre problème."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Button type="submit" size="sm">
                Enregistrer le signalement
              </Button>
            </form>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
