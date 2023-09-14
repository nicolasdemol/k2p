import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown, Plus } from "lucide-react";

export function CardTableAssoc({ assoc, card }) {
  const [isOpen, setIsOpen] = React.useState(true);
  const navigate = useNavigate();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="flex justify-between items-center">
            Cartes associées
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
        {isOpen && assoc && assoc.pcb && assoc.aeb && (
          <TableRow className="cursor-pointer">
            <TableCell
              className="px-4 py-3 font-mono text-sm"
              onClick={() =>
                navigate(
                  `/cards/${
                    card.ref !== assoc.pcb.ref ? assoc.pcb.ref : assoc.aeb.ref
                  }`
                )
              }
            >
              {card.name !== assoc.pcb.name ? assoc.pcb.name : assoc.aeb.name}{" "}
              <strong className="text-[#1F51FF]">
                {card.ref !== assoc.pcb.ref ? assoc.pcb.ref : assoc.aeb.ref}
              </strong>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
