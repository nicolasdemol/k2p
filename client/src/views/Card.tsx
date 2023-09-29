import * as React from "react";
import { CardProvider } from "@/hooks/useCard";
import { useData } from "@/hooks/useData";
import { useParams } from "react-router-dom";
import { CardAssocs } from "@/components/card/card-assocs";
import { CardDocs } from "@/components/card/card-docs";
import { CardDocViewer } from "@/components/card/card-doc-viewer";
import { Doc } from "@/interfaces/doc";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { EntityProvider } from "@/hooks/useEntity";
import { ScrollArea } from "@/components/ui/scroll-area";

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

  React.useEffect(() => {
    if (!docs) {
      toast({
        variant: "destructive",
        title: "Aucun documents disponibles.",
        description: "Veuillez contacter l'administrateur.",
      });
    }
  }, [docs]);

  return (
    configs &&
    card && (
      <CardProvider>
        <EntityProvider>
          <div className="flex gap-4 h-full p-4">
            {!fullScreen ? (
              <Card className="w-80">
                <CardHeader className="bg-white drop-shadow-sm rounded-md">
                  <CardTitle>
                    <span className="text-xl font-bold">
                      {card.name}{" "}
                      <span className="text-[#1F51FF]">{card.ref}</span>
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 h-[calc(100%-100px)] overflow-hidden">
                  <ScrollArea className="h-full">
                    <CardAssocs card={card} assoc={assoc} />
                    {docs && (
                      <CardDocs
                        docs={docs}
                        queries={[card.ref]}
                        path=""
                        onSelect={handleSelectDoc}
                      />
                    )}
                  </ScrollArea>
                </CardContent>
              </Card>
            ) : (
              ""
            )}

            <CardDocViewer
              setFullScreen={setFullScreen}
              fullScreen={fullScreen}
              doc={activeDoc}
            />
          </div>
        </EntityProvider>
      </CardProvider>
    )
  );
}
