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
import { ChevronsUpDown } from "lucide-react";
import { useData } from "@/hooks/useData";

export function CardAssocs({ assoc, card }) {
  const { cards } = useData();
  const [isOpen, setIsOpen] = React.useState(true);
  const navigate = useNavigate();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="flex justify-between items-center">
            Cartes associées
            <div className="space-x-2">
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
      {isOpen && cards && assoc && (
        <TableBody>
          {assoc.aeb && assoc.aeb !== card.ref && (
            <TableRow className="cursor-pointer">
              <TableCell
                className="px-4 py-3 font-mono text-sm"
                onClick={() => navigate(`/cards/${assoc.aeb}`)}
              >
                {cards.find((card) => card.ref === assoc.aeb).name}{" "}
                <strong className="text-[#1F51FF]">{assoc.aeb}</strong>
              </TableCell>
            </TableRow>
          )}
          {assoc.cms && assoc.cms !== card.ref && (
            <TableRow className="cursor-pointer">
              <TableCell
                className="px-4 py-3 font-mono text-sm"
                onClick={() => navigate(`/cards/${assoc.cms}`)}
              >
                {cards.find((card) => card.ref === assoc.cms).name}{" "}
                <strong className="text-[#1F51FF]">{assoc.cms}</strong>
              </TableCell>
            </TableRow>
          )}
          {assoc.pcb && assoc.pcb !== card.ref && (
            <TableRow className="cursor-pointer">
              <TableCell
                className="px-4 py-3 font-mono text-sm"
                onClick={() => navigate(`/cards/${assoc.pcb}`)}
              >
                {cards.find((card) => card.ref === assoc.pcb).name}{" "}
                <strong className="text-[#1F51FF]">{assoc.pcb}</strong>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      )}
    </Table>
  );
}
