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
import { useConfig } from "@/hooks/useConfig";
import { Loader2 } from "lucide-react";
import { api } from "@/services/api";

export function UpdateConfig() {
  const { config } = useConfig();
  const [loading, setLoading] = React.useState(false);
  const [remotePath, setRemotePath] = React.useState(
    config && config[0]?.remotePath
  );

  const handleRefreshDocList = () => {
    setLoading(true);
    api.refreshDocList().then(() => setLoading(false));
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
            id="subject"
            placeholder="Dossier de recherche"
            value={remotePath}
            onChange={(e) => setRemotePath(e.target.value)}
          />
          <Button
            className="flex-shrink-0"
            disabled={remotePath === config[0]?.remotePath}
          >
            Mettre à jour
          </Button>
        </div>
        <Button onClick={handleRefreshDocList} disabled={loading}>
          {loading && <Loader2 className="h-5 w-5 animate-spin mr-2" />}
          Rafraîchir la liste des documents
        </Button>
      </CardContent>
    </Card>
  );
}
