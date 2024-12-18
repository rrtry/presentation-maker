import { EditorType }   from "../../store/EditorType";
import { getSelection } from "../../store/selection.ts";
import { SlideType }    from "../../store/PresentationType.ts";

function changeSlideBackgroundColor(editor: EditorType, newColor: string): EditorType {
    const currentSlide = getSelection(editor) as SlideType
    currentSlide.background = newColor
    return { ...editor }
}

export {
    changeSlideBackgroundColor
}