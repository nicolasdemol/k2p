import React from "react";
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
import { Toggle } from "../ui/toggle";
import { useNavigate } from "react-router-dom";
import { Doc } from "@/interfaces/doc";

interface Props {
  doc: Doc;
  scale: number;
  setScale: (scale: number) => void;
  rotation: number;
  setRotation: (scale: number) => void;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  fullScreen: boolean;
  setFullScreen: (fullScreen: boolean) => void;
}

const ButtonGroup = ({
  doc,
  fullScreen,
  setFullScreen,
  scale,
  setScale,
  rotation,
  setRotation,
  setEditMode,
}: Props) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-3 items-center px-4 py-1">
      <div className="space-x-1 flex items-center">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => {
            setFullScreen(!fullScreen);
          }}
        >
          {fullScreen ? (
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
              state: { open: true, label: "doc", title: `${doc.name}` },
            })
          }
        >
          <AlertCircle className="h-5 w-5" />
        </Button>
        <Toggle
          size="sm"
          onClick={() => setEditMode((prevState) => !prevState)}
        >
          <Highlighter className="h-5 w-5" />
        </Toggle>
      </div>

      <div className="space-x-1 flex items-center justify-center">
        <span className="text-slate-900 text-sm font-semibold bg-slate-100 py-1 px-3 rounded-md">
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
      <h4 className="text-right font-semibold tracking-tight">{doc.name}</h4>
    </div>
  );
};

export default ButtonGroup;
