import * as React from "react";
import { SERVER_ADDRESS } from "@/config";
import { useCardContext } from "./context";
import { api } from "@/services/api";
import Annotator from "../annotator/Annotator";
import { Entity, IEntityHover } from "@/interfaces/entity";
import { Annotation } from "@/interfaces/annotation";
import { DownloadCloud, Loader2 } from "lucide-react";
import { JSONTree } from "react-json-tree";
import { cn } from "@/lib/utils";

const entities: Array<Entity> = [
  {
    id: 1,
    name: "Location",
    color: "#4DD0E1",
    entityType: "NER",
  },
  {
    id: 2,
    name: "Person",
    color: "#4DB6AC",
    entityType: "NER",
  },
  {
    id: 3,
    name: "Organisation",
    color: "#81C784",
    entityType: "NER",
  },
  {
    id: 4,
    name: "Date",
    color: "#AED581",
    entityType: "NER",
  },
  {
    id: 5,
    name: "Reference",
    color: "#DCE775",
    entityType: "NER",
  },
  {
    id: 6,
    name: "Other",
    color: "#FF8A65",
    entityType: "NER",
  },
  {
    id: 7,
    name: "Logo",
    color: "#b39ddb",
    entityType: "AREA",
  },
];

export const CardPdfViewer = () => {
  const [fileExists, setFileExists] = React.useState<boolean>(false);
  const { file, expand } = useCardContext();
  const [annotations, setAnnotations] = React.useState<Array<Annotation>>();
  const [textMap, setTextMap] = React.useState<any>([]);
  const [selectedEntity, setSelectedEntity] = React.useState(-1);
  const [hoveredEntities, setHoveredEntities] = React.useState<
    Array<IEntityHover>
  >([]);
  const childRef = React.useRef<AnnotatorHandle<typeof Annotator>>();

  const handleEnter = (entityId: number) => {
    setHoveredEntities((prev) => [...prev, { id: entityId }]);
  };

  const handleLeave = (entityId: number) => {
    setHoveredEntities((prev) =>
      [...prev].filter((entity) => entity.id !== entityId)
    );
  };

  React.useEffect(() => {
    if (file.path) {
      api.checkFileExists(file.path).then((exists) => {
        if (!exists) {
          setFileExists(false);
          api
            .downloadDoc(file.path)
            .then((res) => setFileExists(true))
            .catch((err) => console.log("Problème lors du télécharment ", err));
        } else {
          setFileExists(true);
        }
      });
    }
  }, [file]);

  return (
    <div
      className={cn(
        "absolute left-1/4 h-[calc(100vh-57px)] w-3/4 z-30 transition-all ease-in-out",
        {
          "w-full left-0 bg-white": expand,
        }
      )}
    >
      {fileExists && (
        <Annotator
          url={`${SERVER_ADDRESS}/api/tmp/${file.path}`}
          getAnnotations={setAnnotations}
          getTextMaps={setTextMap}
          ref={childRef}
        />
      )}
      {!fileExists && file.path && (
        <div className="flex items-center w-full justify-center h-[calc(100vh-57px)]">
          <Loader2 className="mr-2 h-8 w-8 animate-spin" />
          <h1 className="text-xl tracking-tight lg:text-2xl">Importation...</h1>
        </div>
      )}
      {!file.path && (
        <div className="flex flex-col items-center w-full justify-center h-[calc(100vh-57px)]">
          <DownloadCloud className="w-6 h-6" />
          <h1 className="text-2xl font-bold tracking-tight">
            Charger un document
          </h1>
          <h3 className="font-medium">Sélectionner un document à afficher.</h3>
        </div>
      )}
    </div>
  );
};
