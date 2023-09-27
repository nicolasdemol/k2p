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
  AlertCircle,
} from "lucide-react";
import EntityContext from "@/context/entityContext";
import { Toggle } from "../ui/toggle";
import { Link, useNavigate } from "react-router-dom";

interface Props {
  scale: number;
  setScale: (scale: number) => void;
  rotation: number;
  setRotation: (scale: number) => void;
}

const ButtonGroup = ({ scale, setScale, rotation, setRotation }: Props) => {
  const { expand, setExpand, file } = useCardContext();
  const { entity, updateEntity } = React.useContext(EntityContext);
  const navigate = useNavigate();

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
            <PanelLeftOpen className="h-5 w-5" />
          ) : (
            <PanelLeftClose className="h-5 w-5" />
          )}
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={() =>
            navigate("/issues", {
              state: { open: true, label: "doc", title: `${file.name}` },
            })
          }
        >
          <AlertCircle className="h-5 w-5" />
        </Button>
        <Toggle size="sm" onClick={toggleEntity}>
          {entity ? (
            <Highlighter color={entity.color} className="mr-2 h-5 w-5" />
          ) : (
            <Highlighter className="mr-2 h-5 w-5" />
          )}
          Modifier
        </Toggle>
      </div>

      <div className="space-x-1 flex items-center justify-center">
        <span className="text-gray-700 text-sm font-semibold bg-slate-100 py-1 px-2 rounded-md">
          {Math.round(scale * 100)}%
        </span>

        <Button size="sm" variant="ghost" onClick={() => setScale(scale + 0.2)}>
          <ZoomIn className="h-5 w-5" />
        </Button>
        <Button size="sm" variant="ghost" onClick={() => setScale(scale - 0.2)}>
          <ZoomOut className="h-5 w-5" />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => setRotation((rotation - 90) % 360)}
        >
          <RotateCcw className="h-5 w-5" />
        </Button>
      </div>
      <h4 className="text-right font-semibold tracking-tight">{file.name}</h4>
    </div>
  );
};

export default ButtonGroup;
