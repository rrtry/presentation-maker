import {SlideType} from "../store/PresentationType.ts";
import {Slide} from './slide/Slide.tsx'
import styles from './SlidesList.module.css'
import {EditorType, SelectionType} from "../store/EditorType.ts";
import {dispatch, getEditor} from "../store/editor.ts";
import {setSelection} from "../store/selection.ts";
import { getSelection } from "../store/selection.ts";

const SLIDE_PREVIEW_SCALE = 0.2

type SlidesListPros = {
    slides: Array<SlideType>,
    selection: SelectionType,
}

function SlidesList({slides, selection}: SlidesListPros) {

    function onSlideClick(slideId: string) {
        dispatch(setSelection, { selectedSlideId: slideId, })
    }

    function onSlideUpdate(editor: EditorType, updatedSlide: SlideType): EditorType | null {
        return null
        /*
        const newSlides = editor.presentation.slides.map(slide =>
            slide.id === updatedSlide.id ? updatedSlide : slide
        )
        return {
            ...editor,
            presentation: {
                ...editor.presentation,
                slides: newSlides,
            }
        } */
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
                        onSlideUpdate={ (updatedSlide) => dispatch(onSlideUpdate, updatedSlide) }
                    ></Slide> 
                </div>
            )}
        </div>
    )
}

export {
    SlidesList,
}
