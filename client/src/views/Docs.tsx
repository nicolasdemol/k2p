import { FileExplorer } from "@/components/common/file-explorer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useData } from "@/hooks/useData";

export default function DocPage() {
  const { files } = useData();
  return (
    <div className="flex justify-center items-center h-[calc(100vh-70px)]">
      <Card className="w-[800px] overflow-hidden">
        <CardHeader className="border-b">
          <CardTitle>Documents</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <FileExplorer data={files} defaultSearch={[]} />
        </CardContent>
      </Card>
    </div>
  );
}
