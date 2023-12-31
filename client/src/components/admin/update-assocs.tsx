"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useData } from "@/hooks/useData";
import Editor from "@monaco-editor/react";
import { api } from "@/services/api";
import { toast } from "../ui/use-toast";
import { Assoc } from "@/interfaces/assoc";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export function UpdateAssocs() {
  const { assocs } = useData();
  const [validJSON, setValidJSON] = React.useState(true);

  const assocsWithoutId = assocs.map((object) => {
    const { aeb, pcb } = object;
    return { aeb, pcb };
  });

  const [newAssocsWithoutId, setNewAssocsWithoutId] = React.useState<Assoc[]>(
    []
  );

  const handleUpdateAssocs = (newAssocs: Assoc[]) => {
    if (validJSON) {
      api
        .updateAssocs(newAssocs)
        .then((data) => {
          toast({
            title: `Associations mise à jour.`,
            description: (
              <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <code className="text-white">
                  {JSON.stringify(data.message, null, 2)}
                </code>
              </pre>
            ),
          });
        })
        .catch((error) =>
          console.error("Erreur lors de la mise à jour :", error)
        );
    } else {
      toast({
        variant: "destructive",
        title: `Configuration Invalide.`,
        description:
          "La saisie ne respecte pas la bonne structure. Vérifier puis réessayer à nouveau.",
      });
    }
  };
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Gérer les associations</CardTitle>
        <CardDescription>
          Permet de modifier la liste des associations entre chaque carte.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Editor
          className={cn("border rounded-md overflow-hidden", {
            "!border-red-500": !validJSON,
          })}
          height="46vh"
          defaultLanguage="json"
          defaultValue={JSON.stringify(assocsWithoutId, null, 2)}
          loading={
            <div className="flex items-center justify-center w-full h-full">
              <Loader2 className="mr-2 h-8 w-8 animate-spin" />
              <h1 className="text-xl tracking-tight lg:text-2xl">
                Chargement...
              </h1>
            </div>
          }
          onChange={(value: string | undefined) => {
            if (value) {
              try {
                const parsedValue = JSON.parse(value) as Assoc[];
                setNewAssocsWithoutId(parsedValue);
                setValidJSON(true);
              } catch (error) {
                setValidJSON(false);
              }
            } else {
              setNewAssocsWithoutId([]);
            }
          }}
        />
      </CardContent>
      <CardFooter className="justify-end">
        <Button
          size="sm"
          onClick={() => handleUpdateAssocs(newAssocsWithoutId)}
          disabled={!newAssocsWithoutId.length}
        >
          Mettre à jour
        </Button>
      </CardFooter>
    </Card>
  );
}
