import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, EyeOff, File, FolderTree } from "lucide-react";
import { Button } from "../ui/button";
import { Doc } from "@/interfaces/doc";
import { cn } from "@/lib/utils";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

interface CardDocsProps {
  docs: Doc[];
  queries: number[];
  path: string;
  onSelect: (doc: Doc) => void;
}

export function CardDocs({
  docs,
  queries,
  path = "",
  onSelect,
}: CardDocsProps) {
  const [isOpen, setIsOpen] = React.useState<boolean | null>(true);
  const [activeDoc, setActiveDoc] = React.useState<Doc | null>(null);

  function handleSelect(doc: Doc) {
    setActiveDoc(doc);
    onSelect(doc);
  }

  const searchDocs = (docs: Doc[], path: string[]) => {
    // Ajouter des types aux paramètres
    return docs.reduce((accumulator: Doc[], doc: Doc) => {
      if (doc.type === "d" && doc.children) {
        const matchingChildren = searchDocs(doc.children, [...path, doc.name]);
        if (matchingChildren.length > 0) {
          accumulator.push(...matchingChildren);
        }
      } else if (
        doc.type === "f" &&
        queries.some((query) =>
          doc.name.toLowerCase().includes(query.toString())
        )
      ) {
        accumulator.push({ ...doc, path: [...path, doc.name].join("/") });
      }
      return accumulator;
    }, []);
  };

  const filteredContent: Doc[] = searchDocs(docs, [path]);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="flex justify-between items-center">
            <span className="inline-flex items-center">
              <FolderTree className="mr-2 h-4 w-4" />
              Documents
            </span>
            <div className="space-x-2">
              <Button
                variant="ghost"
                size="sm"
                className="w-9 p-0"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? (
                  <Eye className="h-4 w-4" />
                ) : (
                  <EyeOff className="h-4 w-4" />
                )}
              </Button>
            </div>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isOpen &&
          filteredContent.length !== 0 &&
          filteredContent.map((doc, index) => (
            <DocItem
              key={index}
              doc={doc}
              activeDoc={activeDoc}
              onClick={() => handleSelect(doc)}
            />
          ))}
      </TableBody>
    </Table>
  );
}

function DocItem({
  doc,
  activeDoc,
  onClick,
}: {
  doc: Doc;
  activeDoc: Doc | null;
  onClick: (event: React.MouseEvent<HTMLTableRowElement>) => void;
}) {
  return (
    <TableRow className="cursor-pointer" onClick={onClick}>
      <TableCell className="flex justify-between items-center h-12">
        <span
          className={cn("inline-flex items-center",{
            "text-[#1F51FF]": activeDoc?.name === doc.name,
          })}
        >
          <File className="mr-1 h-4 w-4" />
          {doc.name}
        </span>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </TableCell>
    </TableRow>
  );
}
