import { FileItem } from "@/hooks/useData";
import { api } from "@/services/api";
import * as React from "react";

export interface FileItemWithPath extends FileItem {
  path: string;
}

const CardContext = React.createContext(null!);

export function CardProvider({ children }: { children?: React.ReactNode }) {
  const [file, setFile] = React.useState<FileItemWithPath>({
    name: "",
    path: "",
    type: "f",
  });
  const [rotate, setRotate] = React.useState<number>(0);
  const [scale, setScale] = React.useState<number>(1);
  const [expand, setExpand] = React.useState<boolean>(false);
  const [annotations, setAnnotations] = React.useState([]);

  const contextValue = {
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

  React.useEffect(() => {
    setRotate(0);
    setScale(1);
  }, [file]);

  return (
    <CardContext.Provider value={contextValue}>{children}</CardContext.Provider>
  );
}

export function useCardContext() {
  return React.useContext(CardContext);
}
