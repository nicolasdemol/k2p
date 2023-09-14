import * as React from "react";
import { useCardContext } from "../card/context";
import { Button } from "../ui/button";
import {
  RotateCcw,
  Highlighter,
  PanelLeftClose,
  PanelLeftOpen,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import EntityContext from "@/context/entityContext";
import { Toggle } from "../ui/toggle";

interface Props {
  scale: number;
  setScale: (scale: number) => void;
  rotation: number;
  setRotation: (scale: number) => void;
}

const ButtonGroup = ({ scale, setScale, rotation, setRotation }: Props) => {
  const { expand, setExpand, file } = useCardContext();
  const { entity, updateEntity } = React.useContext(EntityContext);

  const toggleEntity = () => {
    if (entity === undefined) {
      updateEntity({
        id: 0,
        name: "Texte",
        color: "#1F51FF",
        entityType: "AREA",
      });
    } else {
      updateEntity(undefined);
    }
  };

  return (
    <div className="grid grid-cols-3 items-center px-4 py-1 bg-white border-b">
      <div className="space-x-1 flex items-center">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => {
            setExpand(!expand);
          }}
        >
          {expand ? (
            <PanelLeftOpen className="h-5 w-5  text-slate-800" />
          ) : (
            <PanelLeftClose className="h-5 w-5  text-slate-800" />
          )}
        </Button>
        <Toggle size="sm" onClick={toggleEntity}>
          {entity ? (
            <Highlighter
              color={entity.color}
              className="h-5 w-5  text-slate-800"
            />
          ) : (
            <Highlighter className="h-5 w-5  text-slate-800" />
          )}
        </Toggle>
      </div>

      <div className="space-x-1 flex items-center justify-center">
        <span className="text-gray-700 text-sm font-bold bg-slate-100 py-2 px-3 rounded-md">
          {Math.round(scale * 100)}%
        </span>

        <Button size="sm" variant="ghost" onClick={() => setScale(scale + 0.2)}>
          <ZoomIn className="h-5 w-5  text-slate-800" />
        </Button>
        <Button size="sm" variant="ghost" onClick={() => setScale(scale - 0.2)}>
          <ZoomOut className="h-5 w-5 text-slate-800" />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => setRotation((rotation - 90) % 360)}
        >
          <RotateCcw className="h-5 w-5  text-slate-800" />
        </Button>
      </div>
      <h4 className="text-right font-semibold tracking-tight">{file.name}</h4>
    </div>
  );
};

export default ButtonGroup;
