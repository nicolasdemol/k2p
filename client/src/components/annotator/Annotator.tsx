import {
  memo,
  useEffect,
  useCallback,
  useImperativeHandle,
  forwardRef,
  Ref,
} from "react";
import usePDF from "@/hooks/usePDF";
import useAnnotations from "@/hooks/useAnnotations";
import useTextMap from "@/hooks/useTextMap";
import Page from "@/components/annotator/Page";
import { IEntityHover } from "@/interfaces/entity";
import { Annotation } from "@/interfaces/annotation";
import { TextLayer, TextLayerItem } from "@/interfaces/textLayer";
import { Config } from "@/interfaces/config";
import AnnotationContext from "@/context/annotationContext";
import ConfigContext from "@/context/configContext";
import useAnnotationUpdater from "@/hooks/useAnnotationUpdater";
import "./style.scss";
import { useEntity } from "@/hooks/useEntity";
import { Loader2 } from "lucide-react";
import { Doc } from "@/interfaces/doc";

interface Props {
  doc: Doc;
  scale: number;
  rotation: number;
  config: Config;
  url?: string;
  data?: Uint8Array | BufferSource | string;
  initialScale?: number;
  tokenizer?: RegExp;
  initialTextMap?: Array<TextLayer>;
  defaultAnnotations?: Array<Annotation>;
  hoveredEntities?: Array<IEntityHover>;
  getAnnotations(annotations: Array<Annotation>): void;
  getTextMaps?(textMaps: Array<TextLayer>): void;
}

interface AnnotatorRef {}

const Annotator = forwardRef((props: Props, ref?: Ref<AnnotatorRef>) => {
  const {
    config = {},
    url,
    scale,
    rotation,
    data,
    tokenizer = new RegExp(/\w+([,.\-/]\w+)+|\w+|\W/g),
    initialTextMap,
    defaultAnnotations = [],
    hoveredEntities,
    getAnnotations,
    getTextMaps,
  } = props;

  const { entity } = useEntity();

  useEffect(() => {
    console.log(entity);
  }, [entity]);

  const { pages, fetchPage } = usePDF({
    url,
    data,
    httpHeaders: config.httpHeaders,
  });
  
  const {
    annotations,
    getAnnotationsForPage,
    addAnnotation,
    updateAnnotation,
    updateLastAnnotationForEntity,
    removeAnnotation: deleteAnnotation,
    lastActionHash,
  } = useAnnotations(
    defaultAnnotations,
    config.readonly,
    config.shouldUpdateDefaultAnnotations
  );

  const { textMap, addPageToTextMap } = useTextMap(annotations);

  useAnnotationUpdater(
    lastActionHash,
    annotations,
    config.readonly,
    getAnnotations
  );

  useImperativeHandle(ref, () => ({ removeAnnotation }));

  const removeAnnotation = (id: number) => {
    deleteAnnotation(id);
  };

  useEffect(() => {
    if (getTextMaps) {
      getTextMaps(initialTextMap || textMap);
    }
  }, [textMap, initialTextMap, getTextMaps]);

  const getTextLayerForPage = useCallback(
    (page: number): [Array<TextLayerItem>, boolean] | [undefined, boolean] => {
      if (initialTextMap) {
        const found: TextLayer | undefined = initialTextMap?.find(
          (layer) => layer.page === page
        );
        if (found) {
          const shouldRender =
            found.shouldRender !== undefined ? found.shouldRender : true;
          return [found.textMapItems, shouldRender];
        } else {
          return [undefined, true];
        }
      }
      return [undefined, true];
    },
    [initialTextMap]
  );

  return (
    <ConfigContext.Provider value={{ config }}>
      <div className="annotator-container">
        <div className="annotator-pages-container">
          {!pages && annotations && (
            <div className="flex items-center justify-center w-full h-full">
              <Loader2 className="mr-2 h-8 w-8 animate-spin" />
              <h1 className="text-xl tracking-tight lg:text-2xl">
                Chargement...
              </h1>
            </div>
          )}
          <AnnotationContext.Provider
            value={{
              annotations,
              removeAnnotation,
              updateAnnotation,
              tokenizer,
              hoveredEntities,
            }}
          >
            <div className="annotator-pages">
              {Array(pages)
                .fill(0)
                .map((_, index) => {
                  const key = `pdf-page-${index}`;
                  const pageNumber = index + 1;
                  const page = fetchPage(pageNumber);
                  const [initialTextLayer, shouldRender] =
                    getTextLayerForPage(pageNumber);
                  return (
                    <Page
                      shouldRender={shouldRender}
                      page={page}
                      scale={scale}
                      rotation={rotation}
                      key={key}
                      pageNumber={pageNumber}
                      annotations={getAnnotationsForPage(pageNumber)}
                      addAnnotation={addAnnotation}
                      updateLastAnnotationForEntity={
                        updateLastAnnotationForEntity
                      }
                      addPageToTextMap={addPageToTextMap}
                      initialTextLayer={initialTextLayer}
                    />
                  );
                })}
            </div>
          </AnnotationContext.Provider>
        </div>
      </div>
    </ConfigContext.Provider>
  );
});

export default memo(Annotator);
