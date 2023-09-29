import { useMemo, useState } from "react";
import { Annotation } from "@/interfaces/annotation";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { recalculateBoundingBox } from "@/helpers/pdfHelpers";
import { Rectangle } from "tesseract.js";
import { PDFMetaData } from "@/interfaces/pdf";
import AreaTextAnnotation from "./AreaTextAnnotation";

interface Props {
  pdfScale: number;
  pdfRotation: number;
  annotation: Annotation;
  removeAnnotation: (id: number) => void;
  updateAnnotation: (annotation: Annotation) => void;
}

const AreaMark = ({
  pdfScale,
  pdfRotation,
  annotation,
  removeAnnotation,
  updateAnnotation,
}: Props) => {
  const [showInput, setShowInput] = useState(true);

  const {
    areaAnnotation: { boundingBox: bb, pdfInformation: { scale } } = {
      boundingBox: {} as Rectangle,
      pdfInformation: {} as PDFMetaData,
    }, // Fournir des valeurs par défaut pour éviter les erreurs de type
  } = annotation;

  const boundingBox = useMemo(
    () => recalculateBoundingBox(bb, scale, pdfScale),
    [bb, scale, pdfScale]
  );

  return (
    <div
      className="area-annotation__container"
      style={{
        left: `${boundingBox.left}px`,
        top: `${boundingBox.top}px`,
        width: `${boundingBox.width}px`,
        height: `${boundingBox.height + 35}px`,
      }}
    >
      <HoverCard>
        <HoverCardTrigger asChild>
          <div
            role="button"
            aria-label="Area annotation"
            onClick={() => removeAnnotation(annotation.id)}
            className="area-annotation__mark"
            style={
              pdfRotation === 90 || pdfRotation === 270
                ? {
                    width: `${boundingBox.height}px`,
                    height: `${boundingBox.width}px`,
                    border: `2px solid ${annotation.entity.color}`,
                  }
                : {
                    width: `${boundingBox.width}px`,
                    height: `${boundingBox.height}px`,
                    border: `2px solid ${annotation.entity.color}`,
                  }
            }
          >
            <span style={{ backgroundColor: annotation.entity.color }} />
          </div>
        </HoverCardTrigger>
        <HoverCardContent className="w-80 p-2">
          <AreaTextAnnotation
            showInput={showInput}
            annotation={annotation}
            updateAnnotation={updateAnnotation}
          />
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};

export default AreaMark;
