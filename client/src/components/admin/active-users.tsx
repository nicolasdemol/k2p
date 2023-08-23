import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/hooks/useAuth";
import { api } from "@/services/api";

export function ActiveUsers() {
  const [users, setUsers] = React.useState<User[]>([]);
  React.useEffect(() => {
    async function fetchUsers() {
      const { users } = await api.getAllUsers();
      setUsers(users);
    }
    fetchUsers();
  }, []);
  return (
    <div className="space-y-8">
      {users &&
        users.map((user) => (
          <div className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarImage src="/avatars/01.png" alt="Avatar" />
              <AvatarFallback>
                {user.firstname && user.firstname[0] + user.surname[0]}
              </AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">
                {user.firstname + " " + user.surname}
              </p>
              <p className="text-sm text-muted-foreground">
                {user.role}
              </p>
            </div>
            <div className="ml-auto font-medium">+$1,999.00</div>
          </div>
        ))}
    </div>
  );
}
