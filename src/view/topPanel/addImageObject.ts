import { EditorType } from "../../store/EditorType.ts";
import { getSelection } from '../../store/selection.ts';
import { SlideType, ImageObjectType } from "../../store/PresentationType.ts";
import { SLIDE_WIDTH, SLIDE_HEIGHT } from "../slide/Slide.tsx"

function addImageObject(editor: EditorType, data: string): EditorType {
    const currentSlide = getSelection(editor) as SlideType
    const imgObject: ImageObjectType = {
        id: self.crypto.randomUUID(),
        x: 100,
        y: 100,
        width:  SLIDE_WIDTH / 2,
        height: SLIDE_HEIGHT / 2,
        type: 'image',
        src: data,
    };
    currentSlide.objects = currentSlide?.objects.concat(imgObject)
    return { ...editor }
}

export {
    addImageObject
}