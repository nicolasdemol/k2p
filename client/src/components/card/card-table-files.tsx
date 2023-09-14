import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronsUpDown, File, Folder, Plus } from "lucide-react";
import { FileStructure } from "@/hooks/useData";
import { useCardContext } from "./context";
import { Button } from "../ui/button";

interface CardFileExplorerProps {
  data: FileStructure;
  defaultSearch: string[] | number[];
}

export function CardTableFiles({ data, defaultSearch }: CardFileExplorerProps) {
  const [isOpen, setIsOpen] = React.useState(true);
  // Fonction récursive pour rechercher à l'intérieur des dossiers
  const searchFiles = (items, queries, path = []) => {
    return items.reduce((accumulator, item) => {
      if (item.type === "d" && item.children) {
        const matchingChildren = searchFiles(item.children, queries, [
          ...path,
          item.name,
        ]);
        if (matchingChildren.length > 0) {
          accumulator.push(...matchingChildren);
        }
      } else if (
        item.type === "f" &&
        queries.some((query) => item.name.toLowerCase().includes(query))
      ) {
        accumulator.push({ ...item, path: [...path, item.name].join("/") });
      }
      return accumulator;
    }, []);
  };

  const filteredContent = searchFiles(data, defaultSearch);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="flex justify-between items-center">
            Documents associés
            <div className="space-x-2">
              <Button variant="ghost" size="sm" className="w-9 p-0">
                <Plus className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-9 p-0"
                onClick={() => setIsOpen(!isOpen)}
              >
                <ChevronsUpDown className="h-4 w-4" />
              </Button>
            </div>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isOpen &&
          filteredContent.length !== 0 &&
          filteredContent.map((item, index) => (
            <FileExplorerItem key={index} item={item} />
          ))}
      </TableBody>
    </Table>
  );
}

function FileExplorerItem({ item }) {
  const { setFile } = useCardContext();
  const icon =
    item.type === "d" ? (
      <Folder className="h-4 w-4" />
    ) : (
      <File className="h-4 w-4" />
    );

  return (
    <TableRow
      className="cursor-pointer"
      onClick={() => setFile(item)}
      onContextMenu={() => setFile(item)}
    >
      <TableCell className="flex items-center gap-1">
        {icon}
        {item.name}
      </TableCell>
    </TableRow>
  );
}
