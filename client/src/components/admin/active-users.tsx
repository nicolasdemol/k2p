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
import { UserCog, UserMinus } from "lucide-react";

export function ActiveUsers() {
  const { users } = useData();
  return (
    <Card className="h-full">
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
                  <Button variant="ghost" size="icon">
                    <UserCog className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <UserMinus className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
