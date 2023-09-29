import { FileExplorer } from "@/components/common/file-explorer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useData } from "@/hooks/useData";
import { Folders } from "lucide-react";

export default function DocPage() {
  const { docs } = useData();
  return (
    <div className="flex justify-center items-center h-full">
      <Card className=" max-w-5xl w-full overflow-hidden">
        <CardHeader className="border-b">
          <CardTitle className="inline-flex items-center text-xl">
            <Folders className="mr-2 h-6 w-6" /> Documents partagés
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <FileExplorer data={docs} defaultSearch={[]} />
        </CardContent>
      </Card>
    </div>
  );
}
