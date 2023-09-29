import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { User } from "@/interfaces/user";
import { api } from "@/services/api";
import { toast } from "../ui/use-toast";
import { useData } from "@/hooks/useData";

export function AlertDeleteUser({
  user,
  setDeleteUser,
}: {
  user: User;
  setDeleteUser: (user: User | null) => void;
}) {
  const { setUsers } = useData();
  const handleDeleteUser = (user: User) => {
    api
      .removeUser(user._id)
      .then((res) => {
        toast({
          title: res.message,
          description: `L'utilisateur ${user.username} a bien été supprimé.`,
        });

        setUsers((prevUsers: User[]) =>
          prevUsers.filter((u) => u._id !== user._id)
        );
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: err.response.data.message,
        });
      });
  };
  return (
    <AlertDialog defaultOpen={true}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Êtes-vous sûr de supprimer {user.username}
          </AlertDialogTitle>
          <AlertDialogDescription>
            Cette action ne peut pas être annulée. Cela supprimera
            définitivement le compte {user.username} et supprimez toutes les
            données de l'utilisateur du serveur.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setDeleteUser(null)}>
            Annuler
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              handleDeleteUser(user);
              setDeleteUser(null);
            }}
          >
            Supprimer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
