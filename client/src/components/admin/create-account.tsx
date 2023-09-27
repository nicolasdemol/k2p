"use client";

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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function CreateAccount() {
  return (
    <Card className="h-full">
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
            <Input id="subject" placeholder="Prénom" />
          </div>
          <div className="grid gap-2">
            <Input id="subject" placeholder="Nom" />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="subject">Identifiant</Label>
          <Input
            id="subject"
            placeholder="prénom.nom (Utilisé pour se connecter)"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="subject">Mot de passe</Label>
          <Input id="subject" placeholder="********" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="subject">Confirmer le mot de passe</Label>
          <Input id="subject" placeholder="********" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="area">Rôle</Label>
          <Select defaultValue="prod">
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
        </div>
      </CardContent>
      <CardFooter className="justify-end space-x-2">
        <Button size="sm">Créer le compte</Button>
      </CardFooter>
    </Card>
  );
}
