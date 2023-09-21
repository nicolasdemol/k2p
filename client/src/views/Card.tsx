import { CardProvider } from "@/components/card/context";
import { useData } from "@/hooks/useData";
import { useParams } from "react-router-dom";
import { CardPdfViewer } from "@/components/card/card-pdf-viewer";
import { CardSidebar } from "@/components/card/card-sidebar";

export default function CardPage() {
  const { ref } = useParams();
  const { cards, assocs } = useData();
  const card = cards.find((card) => card.ref.toString() === ref);
  const assoc =
    assocs.find((assoc) => assoc.aeb.ref.toString() === ref) ||
    assocs.find((assoc) => assoc.pcb.ref.toString() === ref);
  return (
    <CardProvider>
      <div className="relative flex h-[calc(100vh-57px)]">
        <CardSidebar card={card} assoc={assoc} />
        <CardPdfViewer />
      </div>
    </CardProvider>
  );
}
