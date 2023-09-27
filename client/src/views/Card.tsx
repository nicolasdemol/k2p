import * as React from "react";
import { CardProvider } from "@/hooks/useCard";
import { useData } from "@/hooks/useData";
import { useParams } from "react-router-dom";
// import { CardPdfViewer } from "@/components/card/card-pdf-viewer";
// import { CardAssocs } from "@/components/card/card-assocs";
import { CardDocs } from "@/components/card/card-docs";
import { CardDocViewer } from "@/components/card/card-doc-viewer";
import { Doc } from "@/interfaces/doc";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CardPage() {
  const { ref } = useParams();
  const [activeDoc, setActiveDoc] = React.useState<Doc | null>(null);
  const [fullScreen, setFullScreen] = React.useState<boolean>(false);
  const { cards, assocs, docs, configs } = useData();
  const card = cards.find((card) => card.ref.toString() === ref);
  const assoc =
    assocs.find((assoc) => assoc.aeb.toString() === ref) ||
    assocs.find((assoc) => assoc.pcb.toString() === ref);

  const handleSelectDoc = (doc: Doc) => {
    // Faites quelque chose avec le document sélectionné, par exemple :
    setActiveDoc(doc);
    console.log("Document sélectionné :", doc);
  };

  return (
    configs &&
    card && (
      <CardProvider>
        <div className="flex gap-4 h-full p-4">
          {!fullScreen ? (
            <Card className="w-80 h-full">
              <CardHeader>
                <CardTitle>
                  <span className="font-mono text-lg">
                    {card.name}{" "}
                    <strong className="text-[#1F51FF]">{card.ref}</strong>
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {/* <CardAssocs card={card} assoc={assoc} /> */}
                <CardDocs
                  docs={docs}
                  queries={[card.ref]}
                  path=""
                  onSelect={handleSelectDoc}
                />
              </CardContent>
            </Card>
          ) : (
            ""
          )}
          <Card className="w-[50vw] flex-1 h-full border-dashed">
            <CardDocViewer
              setFullScreen={setFullScreen}
              fullScreen={fullScreen}
              doc={activeDoc}
            />
          </Card>
        </div>
      </CardProvider>
    )
  );
}
