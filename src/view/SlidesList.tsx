import {SlideType} from "../store/PresentationType.ts";
import {Slide} from './slide/Slide.tsx'
import styles from './SlidesList.module.css'
import {EditorType, SelectionType} from "../store/EditorType.ts";
import {dispatch, getEditor} from "../store/editor.ts";
import {setSelection} from "../store/selection.ts";

const SLIDE_PREVIEW_SCALE = 0.2

type SlidesListPros = {
    slides: Array<SlideType>,
    selection: SelectionType,
}

function SlidesList({slides, selection}: SlidesListPros) {

    function onSlideClick(slideId: string) {
        dispatch(setSelection, { selectedSlideId: slideId, })
    }

    function updateEditor(editor: EditorType, newSlides: Array<SlideType>): EditorType {
        return {
            ...editor,
            presentation: {
                ...editor.presentation,
                slides: newSlides,
            }
        } 
    }

    function onSlideChange(updatedSlide: SlideType) {
        const editor: EditorType = getEditor();
        const newSlides = editor.presentation.slides.map(slide =>
            slide.id === updatedSlide.id ? updatedSlide : slide
        );
        dispatch(updateEditor, newSlides)
    }

    return (
        <div className={styles.slideList}>
            {slides.map(slide =>
                <div key={slide.id} onClick={() => onSlideClick(slide.id)}>
                    <Slide
                        slide={slide}
                        scale={SLIDE_PREVIEW_SCALE}
                        isSelected={slide.id == selection.selectedSlideId}
                        className={styles.item}
                        onSlideUpdate={onSlideChange}
                    ></Slide> 
                </div>
            )}
        </div>
    )
}

export {
    SlidesList,
}
