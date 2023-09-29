import { ChangeEvent, useState } from "react";
import { Annotation } from "@/interfaces/annotation";

interface Props {
  showInput: boolean;
  annotation: Annotation;
  updateAnnotation: (annotation: Annotation) => void;
}

const AreaTextAnnotation = ({
  showInput,
  annotation,
  updateAnnotation,
}: Props) => {
  const [value, setValue] = useState<string>(
    annotation.areaAnnotation?.text || ""
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleBlur = () => {
    // Vérifiez si annotation.areaAnnotation est défini avant de mettre à jour
    if (annotation.areaAnnotation) {
      updateAnnotation({
        ...annotation,
        areaAnnotation: {
          ...annotation.areaAnnotation,
          text: value,
        },
      });
    }
  };

  return (
    <input
      className={`area-annotation__text-input ${
        showInput ? "" : "hidden"
      }`.trim()}
      type="text"
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  );
};

export default AreaTextAnnotation;
