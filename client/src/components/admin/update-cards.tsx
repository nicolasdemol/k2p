"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card as Cardd,
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
import { cn } from "@/lib/utils";
import { Card } from "@/interfaces/card";
import { Loader2 } from "lucide-react";

export function UpdateCards() {
  const { cards } = useData();
  const [validJSON, setValidJSON] = React.useState(true);

  const cardsWithoutId = cards.map(({ _id, __v, createdAt, ...rest }) => rest);

  const [newCardsWithoutId, setNewCardsWithoutId] = React.useState<Card[]>([]);

  const handleUpdateCards = (newCards: Card[]) => {
    if (validJSON) {
      api
        .updateAssocs(newCards)
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
    <Cardd className="h-full">
      <CardHeader>
        <CardTitle>Gérer les cartes</CardTitle>
        <CardDescription>
          Permet de modifier la liste des cartes.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Editor
          className={cn("border rounded-md overflow-hidden", {
            "!border-red-500": !validJSON,
          })}
          height="46vh"
          defaultLanguage="json"
          loading={
            <div className="flex items-center justify-center w-full h-full">
              <Loader2 className="mr-2 h-8 w-8 animate-spin" />
              <h1 className="text-xl tracking-tight lg:text-2xl">
                Chargement...
              </h1>
            </div>
          }
          defaultValue={JSON.stringify(cardsWithoutId, null, 2)}
          onChange={(value: string | undefined) => {
            if (value) {
              try {
                const parsedValue = JSON.parse(value) as Card[];
                setNewCardsWithoutId(parsedValue);
                setValidJSON(true);
              } catch (error) {
                setValidJSON(false);
              }
            } else {
              setNewCardsWithoutId([]);
            }
          }}
        />
      </CardContent>
      <CardFooter className="justify-end">
        <Button
          size="sm"
          onClick={() => handleUpdateCards(newCardsWithoutId)}
          disabled={!newCardsWithoutId.length}
        >
          Mettre à jour
        </Button>
      </CardFooter>
    </Cardd>
  );
}
