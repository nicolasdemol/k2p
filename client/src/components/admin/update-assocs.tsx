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

export function UpdateAssocs() {
  const { assocs } = useData();

  const assocsWithoutId = assocs.map((object) => {
    const { aeb, pcb } = object;
    return { aeb, pcb };
  });

  const [newAssocsWithoutId, setNewAssocsWithoutId] = React.useState([]);

  function handleEditorChange(value, event) {
    setNewAssocsWithoutId(value);
  }

  const handleUpdateAssocs = (newAssocs) => {
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
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gérer les associations</CardTitle>
        <CardDescription>
          Permet de modifier les associations (aeb/cms/pcb).
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Editor
          className="border rounded-md overflow-hidden"
          height="20vh"
          defaultLanguage="json"
          defaultValue={JSON.stringify(assocsWithoutId, null, 2)}
          onChange={handleEditorChange}
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
