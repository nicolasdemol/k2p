import * as React from "react";
import socket from "@/services/socket";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useData } from "@/hooks/useData";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { UserMinus } from "lucide-react";
import { AlertDeleteUser } from "./alert-delete-user";
import { User } from "@/interfaces/user";

export function ActiveUsers() {
  const { users, setUsers } = useData();
  const [deleteUser, setDeleteUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    // Mise à jour en temps réel du nouvel utilisateur
    socket.on("new_user", (newUser) => {
      console.log(newUser);
    });
  }, [setUsers]);

  return (
    <Card className="h-full" id="sidebar-content">
      <CardHeader>
        <CardTitle>Gérer les utilisateurs</CardTitle>
        <CardDescription>
          Modifier un utilisateur, changer les permissions des utilisateurs.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {users &&
            users.map((user) => (
              <div key={user._id} className="flex justify-between items-center">
                <div className="flex">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback>
                      {user.firstname && user.firstname[0] + user.surname[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user.firstname + " " + user.surname}
                    </p>
                    <p className="text-sm text-muted-foreground">{user.role}</p>
                  </div>
                </div>
                <div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setDeleteUser(user)}
                  >
                    <UserMinus className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            ))}
          {deleteUser && (
            <AlertDeleteUser setDeleteUser={setDeleteUser} user={deleteUser} />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
