import React, { useState } from "react";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { api } from "@/services/api";

import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { ChevronLeft, File, Folder } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import { Doc } from "@/interfaces/doc";

interface CardFileExplorerProps {
  data: Doc[];
  defaultSearch: string[] | number[];
}

export function FileExplorer({ data }: CardFileExplorerProps) {
  const [currentFolder, setCurrentFolder] = useState(null);
  const [currentPath, setCurrentPath] = useState([]);

  const handleFolderClick = (e, item) => {
    if (item.type === "d") {
      setCurrentFolder(item);
      setCurrentPath([...currentPath, item.name]); // Mettre à jour le chemin actuel en ajoutant le nom du dossier
    }
  };

  const handleGoBack = () => {
    setCurrentFolder(currentFolder.slice(0, -1));
    setCurrentPath(currentPath.slice(0, -1)); // Retirer le dernier élément du chemin actuel pour remonter d'un niveau
  };

  const currentContent = currentFolder ? currentFolder.children : data;

  return (
    <FileContextMenu>
      <Table>
        <TableBody>
          <div className="flex items-center p-2 bg-gray-50 border-b">
            {currentFolder ? (
              <Button size="sm" variant="link" onClick={handleGoBack}>
                <ChevronLeft />
              </Button>
            ) : (
              <Button disabled size="sm" variant="link" onClick={handleGoBack}>
                <ChevronLeft />
              </Button>
            )}
            <span className="font-semibold text-sm">
              {currentFolder ? currentPath.pop() : "FICHE INTRANET"}
            </span>
          </div>
          <ScrollArea className="overflow-auto h-[70vh]">
            {currentContent.length !== 0 ? (
              currentContent.map((item, index) => (
                <FileExplorerItem
                  key={index}
                  item={item}
                  onContextMenu={(e) => handleFolderClick(e, item)}
                />
              ))
            ) : (
              <div className="flex items-center mt-6 ml-6">
                <div className="space-y-6">
                  <Skeleton className="h-4 w-[290px]" />
                  <Skeleton className="h-4 w-[270px]" />
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[280px]" />
                  <Skeleton className="h-4 w-[300px]" />
                  <Skeleton className="h-4 w-[260px]" />
                </div>
              </div>
            )}
          </ScrollArea>
        </TableBody>
      </Table>
    </FileContextMenu>
  );
}

function FileExplorerItem({ item, onContextMenu }) {
  const icon =
    item.type === "d" ? (
      <Folder className="h-4 w-4" fill="#00AAEA" color="#00AAEA" />
    ) : (
      <File className="h-4 w-4" />
    );

  return (
    <TableRow
      className="cursor-pointer"
      onClick={onContextMenu}
      onContextMenu={onContextMenu}
    >
      <TableCell className="flex items-center gap-2">
        {icon}
        {item.name}
      </TableCell>
    </TableRow>
  );
}

function FileContextMenu({ children }: { children?: React.ReactNode }) {
  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem inset onClick={() => api.downloadFile(file)}>
          Télécharger
          <ContextMenuShortcut>⌘V</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset>
          Rafraîchir
          <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger inset>Créer</ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            <ContextMenuItem>
              Problème...
              <ContextMenuShortcut>⇧⌘P</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>Document...</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem checked>
          Nom de fichier
          <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>
        </ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem>Taille fichier</ContextMenuCheckboxItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
