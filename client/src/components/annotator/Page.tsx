import { useEffect, useRef, useState, memo, useContext } from "react";
import { useInView } from "react-intersection-observer";
import { PDFPageProxy, PageViewport } from "pdfjs-dist";
import { mergeSplitWords } from "@/helpers/pdfHelpers";
import { Annotation, AnnotationParams } from "@/interfaces/annotation";
import { TextLayerItem, TextLayerType } from "@/interfaces/textLayer";
import useTextLayer from "@/hooks/useTextLayer";
import Selection from "./Selection";
import AreaLayer from "./areaLayer/AreaLayer";
import AnnotationContext from "@/context/annotationContext";
import { cn } from "@/lib/utils";
import AreaTextAnnotation from "./areaLayer/AreaTextAnnotation";

interface Props {
  pageNumber: number;
  shouldRender: boolean;
  page: Promise<PDFPageProxy> | null;
  scale: number;
  rotation: number;
  annotations: Array<Annotation>;
  addAnnotation: (annotation: AnnotationParams) => void;
  updateLastAnnotationForEntity: (annotation: AnnotationParams) => void;
  addPageToTextMap: (
    page: number,
    pdfTextLayer: Array<TextLayerItem>,
    type: TextLayerType,
    confidence: number,
    tokenizer?: RegExp
  ) => void;
  initialTextLayer?: Array<TextLayerItem>;
}

const Page = ({
  pageNumber,
  page,
  scale,
  rotation,
  annotations,
  addAnnotation,
  updateLastAnnotationForEntity,
  addPageToTextMap,
  initialTextLayer,
}: Props) => {
  const { tokenizer } = useContext(AnnotationContext);

  const [inViewRef, inView] = useInView({ threshold: 0 });

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [loading, setLoading] = useState(true);
  const [pdfPage, setPdfPage] = useState<PDFPageProxy | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [pageViewport, setPageViewport] = useState({
    width: (916 / 1.5) * scale,
    height: (1174 / 1.5) * scale,
  });

  const { textLayer, buildTextLayer } = useTextLayer(
    scale,
    context!,
    initialTextLayer
  );

  useEffect(() => {
    if (annotations.length) {
      if (textLayer) {
        addPageToTextMap(
          pageNumber,
          textLayer,
          TextLayerType.TEXT_LAYER,
          1,
          tokenizer
        );
        return;
      }
    }
  }, [annotations, textLayer, pageNumber, addPageToTextMap, tokenizer]);

  useEffect(() => {
    if (canvasRef) {
      setContext(canvasRef.current!.getContext("2d"));
    }
  }, [canvasRef]);

  useEffect(() => {
    if (canvasRef && context && page && inView) {
      page.then((pdfPageResult) => {
        const viewport = pdfPageResult.getViewport({ scale, rotation });
        const pixelRatio = window.devicePixelRatio || 1;
        const canvas = canvasRef.current;
        canvas!.width = viewport.width * pixelRatio;
        canvas!.height = viewport.height * pixelRatio;
        setPageViewport(viewport);

        context.scale(pixelRatio, pixelRatio);

        pdfPageResult
          .render({
            canvasContext: context!,
            viewport,
          })
          .promise.then(() => {
            setPdfPage(pdfPageResult);
          });
      });
    }
  }, [page, scale, rotation, canvasRef, context, inView]);

  useEffect(() => {
    if (textLayer?.length) {
      setLoading(false);
      return;
    }
    if (inView && pdfPage && !textLayer) {
      pdfPage.getTextContent().then((content) => {
        if (content.items.length) {
          const contentMerged = mergeSplitWords(content);
          buildTextLayer(contentMerged, pageViewport as PageViewport);
        }
        setLoading(false);
      });
    }
  }, [inView, pdfPage, pageViewport, context, page, textLayer, buildTextLayer]);

  return (
    <div className="page" ref={inViewRef}>
      <div
        className={cn("page__container transition opacity-100", { "opacity-0": loading })}
        style={{
          width: `${pageViewport.width}px`,
          height: `${pageViewport.height}px`,
        }}
      >
        <div
          className="page__canvas-container"
          style={{
            width: `${pageViewport.width}px`,
            height: `${pageViewport.height}px`,
          }}
        >
          <canvas
            ref={canvasRef}
            style={{
              width: `${pageViewport.width}px`,
              height: `${pageViewport.height}px`,
            }}
          />
        </div>
        <Selection
          pageNumber={pageNumber}
          className="page__text-layer-container"
          style={{
            width: `${pageViewport.width}px`,
            height: `${pageViewport.height}px`,
          }}
          addAnnotation={addAnnotation}
          updateLastAnnotationForEntity={updateLastAnnotationForEntity}
          pdfInformation={{
            width: pageViewport.width,
            height: pageViewport.height,
            scale,
          }}
          pdfContext={context}
        >
          <AreaLayer pdfScale={scale} pdfRotation={rotation} pageNumber={pageNumber} />
        </Selection>
      </div>
    </div>
  );
};

export default memo(Page);
