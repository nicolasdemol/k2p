import * as React from "react";
import { columns } from "@/components/issues/columns";
import { DataTable } from "@/components/issues/data-table";
import { useData } from "@/hooks/useData";
import socket from "@/services/socket";
import { History } from "lucide-react";

export default function IssuePage() {
  const { issues, setIssues } = useData();

  React.useEffect(() => {
    // Mise à jour en temps réel du nouvel utilisateur
    socket.on("new_issue", (newIssue) => {
      setIssues((prevIssues) => [...prevIssues, newIssue]);
      console.log(newIssue);
    });
  }, [setIssues]);

  return (
    <>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight inline-flex items-center">
              <History className="mr-2 h-6 w-6" />
              Historique des problèmes signalés
            </h2>
            <p className="text-muted-foreground">
              Liste des problèmes rencontrés avec une carte ou un document.
            </p>
          </div>
          <div className="flex items-center space-x-2"></div>
        </div>
        <DataTable data={issues} columns={columns} />
      </div>
    </>
  );
}
