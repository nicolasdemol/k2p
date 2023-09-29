"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "../ui/input";
import { FolderTree, Loader2 } from "lucide-react";
import { api } from "@/services/api";
import { useData } from "@/hooks/useData";
import { toast } from "../ui/use-toast";

export function UpdateConfig() {
  const { configs } = useData();
  const [loading, setLoading] = React.useState(false);
  const [remotePath, setRemotePath] = React.useState(
    configs && configs[0]?.remotePath
  );

  const handleRefreshDocList = () => {
    setLoading(true);
    toast({
      title: "L'actualisation des fichiers est en cours...",
      description: `Le serveur traite les informations de chaque document situé en ${configs[0]?.remotePath}, vous pouvez quitter sans problème.`,
    });
    api
      .refreshDocList()
      .then((res) => {
        toast({
          title: res.message,
        });
        setLoading(false);
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: err.response.data.message,
        });
        setLoading(false);
      });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurer les documents</CardTitle>
        <CardDescription>
          Permet de configurer l'algorithme de recherche de documents.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex gap-4">
          <Input
            placeholder="Dossier de recherche"
            value={remotePath}
            onChange={(e) => setRemotePath(e.target.value)}
          />
          <Button
            className="flex-shrink-0"
            disabled={remotePath === configs[0]?.remotePath}
          >
            Mettre à jour
          </Button>
        </div>
        <Button onClick={handleRefreshDocList} disabled={loading}>
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin mr-2" />
          ) : (
            <FolderTree className="mr-2 h-5 w-5" />
          )}
          Actualiser la liste des documents
        </Button>
      </CardContent>
    </Card>
  );
}
