import { SlideType } from "../store/PresentationType.ts";
import { Slide } from './slide/Slide.tsx';
import styles from './SlidesList.module.css';
import { useDrag, useDrop } from 'react-dnd';
import { useRef } from 'react';
import * as actions from "../store/actions.ts";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../store/store.ts";

const SLIDE_PREVIEW_SCALE = 0.2;

function SlidesList() {

    const dispatch = useDispatch();
    const editor   = useSelector((state: RootState) => state.editor);

    function onSlideClick(slideId: string) {
        dispatch(actions.setSlideSelection(slideId));
    }

    const moveSlide = (dragIndex: number, hoverIndex: number) => {
        const updatedSlides = Array.from(editor.presentation.slides);
        const [removed] = updatedSlides.splice(dragIndex, 1);
        updatedSlides.splice(hoverIndex, 0, removed);
        dispatch(actions.reorderSlides(
            updatedSlides,
            dragIndex,
            hoverIndex
        ));
    }; 

    return (
        <ul className={styles.slidesList}>
            {editor.presentation.slides.map((slide, index) => (
                <DraggableSlide
                    key={slide.id}
                    index={index}
                    slide={slide}
                    isSelected={slide.id === editor.selection!.selectedSlideId}
                    onClick={() => onSlideClick(slide.id)}
                    moveSlide={moveSlide}
                    className={styles.item}
                />
            ))}
        </ul>
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
    
    const ref = useRef<HTMLDivElement | null>(null);
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
        <li
            ref={ref}
            onClick={onClick}
            className={`${className} ${isSelected ? styles.selected : ''}`}
            style={{ opacity: isDragging ? 0.5 : 1 }}
        >
            <Slide slide={slide} scale={SLIDE_PREVIEW_SCALE} className={styles.slide} />
        </li>
    );
}

export {
    SlidesList,
};
