import { SlideType } from "../store/PresentationType.ts";
import { Slide } from './slide/Slide.tsx';
import styles from './SlidesList.module.css';
import { EditorType, SelectionType } from "../store/EditorType.ts";
import { dispatch } from "../store/editor.ts";
import { setSelection } from "../store/selection.ts";
import { useDrag, useDrop } from 'react-dnd';
import { useRef } from 'react';

const SLIDE_PREVIEW_SCALE = 0.2;

type SlidesListPros = {
    slides: Array<SlideType>,
    selection: SelectionType,
    onReorderSlides: (slides: Array<SlideType>) => void
};

function SlidesList({ slides, selection }: SlidesListPros) {

    function onSlideClick(slideId: string) {
        dispatch(setSelection, { selectedSlideId: slideId });
    }

    function onReorderSlides(editor: EditorType, updatedSlides: Array<SlideType>): EditorType {
        return {
            ...editor,
            presentation: {
                ...editor.presentation,
                slides: updatedSlides
            }
        }
    }

    const moveSlide = (dragIndex: number, hoverIndex: number) => {
        const updatedSlides = Array.from(slides);
        const [removed] = updatedSlides.splice(dragIndex, 1);
        updatedSlides.splice(hoverIndex, 0, removed);
        dispatch(onReorderSlides, updatedSlides);
    };

    return (
        <div className={styles.slideList}>
            {slides.map((slide, index) => (
                <DraggableSlide
                    key={slide.id}
                    index={index}
                    slide={slide}
                    isSelected={slide.id === selection.selectedSlideId}
                    onClick={() => onSlideClick(slide.id)}
                    moveSlide={moveSlide}
                    className={styles.item}
                />
            ))}
        </div>
    );
}

type DraggableSlideProps = {
    index: number;
    slide: SlideType;
    isSelected: boolean;
    onClick: () => void;
    moveSlide: (dragIndex: number, hoverIndex: number) => void;
    className: string;
};

function DraggableSlide({ index, slide, isSelected, onClick, moveSlide, className }: DraggableSlideProps) {
    
    const ref = useRef<HTMLDivElement>(null);
    const [, drop] = useDrop({
        accept: 'SLIDE',
        hover(item: { index: number }) {
            if (!ref.current) return;
            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) return;

            moveSlide(dragIndex, hoverIndex);
            item.index = hoverIndex;
        }
    });

    const [{ isDragging }, drag] = useDrag({
        type: 'SLIDE',
        item: { index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    drag(drop(ref));

    return (
        <div
            ref={ref}
            onClick={onClick}
            className={`${className} ${isSelected ? styles.selected : ''}`}
            style={{ opacity: isDragging ? 0.5 : 1 }}
        >
            <Slide slide={slide} scale={SLIDE_PREVIEW_SCALE} className={styles.slide} />
        </div>
    );
}

export {
    SlidesList,
};
