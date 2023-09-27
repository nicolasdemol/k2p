import { useData } from "@/hooks/useData";
import { CardTableAssoc } from "./card-table-assoc";
import { CardTableFiles } from "./card-table-files";
import { ScrollArea } from "../ui/scroll-area";
import { useCardContext } from "./context";
import { cn } from "@/lib/utils";

export const CardSidebar = ({ card, assoc }) => {
  const { files } = useData();
  const { expand } = useCardContext();
  return (
    card && (
      <ScrollArea className={cn("border-r w-1/4")}>
        <div className="p-4 sticky grid gap-4 top-0 bg-white drop-shadow-sm">
          <span className="font-mono text-lg">
            {card.name} <strong className="text-[#1F51FF]">{card.ref}</strong>
          </span>
        </div>
        <CardTableAssoc card={card} assoc={assoc} />
        <CardTableFiles data={files} defaultSearch={[card.ref]} />
      </ScrollArea>
    )
  );
};
