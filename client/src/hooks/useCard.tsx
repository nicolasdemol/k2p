import { Annotation } from "@/interfaces/annotation";
import { Doc } from "@/interfaces/doc";
import * as React from "react";

export interface FileItemWithPath extends Doc {
  path: string;
}

interface CardContextType {
  file: FileItemWithPath | null;
  setFile: (file: FileItemWithPath | null) => void;
  rotate: number;
  setRotate: (rotate: number) => void;
  scale: number;
  setScale: (scale: number) => void;
  expand: boolean;
  setExpand: (expand: boolean) => void;
  annotations: Annotation[]; // Remplacez YourAnnotationType par le type réel de vos annotations
  setAnnotations: (annotations: Annotation[]) => void;
}

const CardContext = React.createContext<CardContextType | undefined>(undefined);

export function CardProvider({ children }: { children?: React.ReactNode }) {
  const [file, setFile] = React.useState<Doc | null>(null);
  const [rotate, setRotate] = React.useState<number>(0);
  const [scale, setScale] = React.useState<number>(1);
  const [expand, setExpand] = React.useState<boolean>(false);
  const [annotations, setAnnotations] = React.useState<Annotation[]>([]);

  React.useEffect(() => {
    setRotate(0);
    setScale(1);
  }, [file]);

  const contextValue: CardContextType = {
    file,
    setFile,
    rotate,
    setRotate,
    scale,
    setScale,
    expand,
    setExpand,
    annotations,
    setAnnotations,
  };

  return (
    <CardContext.Provider value={contextValue}>{children}</CardContext.Provider>
  );
}

export function useCard() {
  const context = React.useContext(CardContext);
  if (context === undefined) {
    throw new Error("useCardContext must be used within a CardProvider");
  }
  return context;
}
