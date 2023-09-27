import * as React from "react";
import { api } from "@/services/api";
import Annotator from "../annotator/Annotator";
import { Annotation } from "@/interfaces/annotation";
import { DownloadCloud, Loader2 } from "lucide-react";
import { Doc } from "@/interfaces/doc";

export const CardDocViewer = ({
  doc,
  fullScreen,
  setFullScreen,
}: {
  doc: Doc | null;
  fullScreen: boolean;
  setFullScreen: (fullScreen: boolean) => void;
}) => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [url, setUrl] = React.useState<string | undefined>(undefined);
  const [annotations, setAnnotations] = React.useState<Annotation[]>([]);
  const childRef = React.useRef();

  React.useEffect(() => {
    if (doc && doc.name) {
      api.buildDocUrl(doc).then((res) => {
        setUrl(res.url);
        setLoading(false);
      });
    }
  }, [doc]);

  return doc?.name ? (
    <div className="h-full">
      {loading ? (
        <div className="flex items-center w-full justify-center">
          <Loader2 className="mr-2 h-8 w-8 animate-spin" />
          <h1 className="text-xl tracking-tight lg:text-2xl">Importation...</h1>
        </div>
      ) : (
        <>
          <Annotator
            doc={doc}
            url={url}
            fullScreen={fullScreen}
            setFullScreen={setFullScreen}
            getAnnotations={setAnnotations}
            ref={childRef}
          />
          <div className="hidden">{JSON.stringify(annotations)}</div>
        </>
      )}
    </div>
  ) : (
    <div className="flex flex-col items-center w-full justify-center h-full">
      <DownloadCloud className="w-6 h-6" />
      <h1 className="text-2xl font-bold tracking-tight">Charger un document</h1>
      <h3 className="font-medium">Sélectionner un document à afficher.</h3>
    </div>
  );
};
