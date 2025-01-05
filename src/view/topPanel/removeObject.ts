import { EditorType } from "../../store/EditorType";
import { SlideType } from "../../store/PresentationType";
import { getSelection } from "../../store/selection";

export function removeObject(editor: EditorType): EditorType {
    const selectedSlide   = getSelection(editor) as SlideType
    selectedSlide.objects = selectedSlide.objects.filter(obj => obj.id !== editor.objectId)
    return { 
        ...editor,
        objectId: null
    }
}