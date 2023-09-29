import { useContext, useMemo } from 'react';
import AreaMark from './AreaMark';
import AnnotationContext from '@/context/annotationContext';

interface Props {
	pdfScale: number;
	pdfRotation: number;
	pageNumber: number;
}

const AreaLayer = ({ pdfScale, pdfRotation, pageNumber }: Props) => {
	const context = useContext(AnnotationContext);

	const annotations = useMemo(() => {
		return context.annotations.filter((annotation) => !!annotation.areaAnnotation && annotation.page === pageNumber);
	}, [context, pageNumber]);

	return (
		<>
			{annotations.map((annotation) => (
				<AreaMark
					pdfScale={pdfScale}
					pdfRotation={pdfRotation}
					key={annotation.id}
					annotation={annotation}
					removeAnnotation={context.removeAnnotation}
					updateAnnotation={context.updateAnnotation}
				/>
			))}
		</>
	);
};

export default AreaLayer;
