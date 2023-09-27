import { columns } from "@/components/issues/columns";
import { DataTable } from "@/components/issues/data-table";
import { useData } from "@/hooks/useData";

export default function IssuePage() {
  const { issues } = useData();

  return (
    <>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
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
