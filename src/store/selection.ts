import {EditorType, SelectionType} from "./EditorType.ts";
import { SlideType } from "./PresentationType.ts";

function getSelection(editor: EditorType): SlideType | undefined {
    return editor.presentation.slides.find(
        (value, index, obj) => editor.selection?.selectedSlideId === value.id
    )
}

function setSelection(editor: EditorType, newSelection: SelectionType): EditorType {
    return {
        ...editor,
        selection: newSelection,
        objectId: null
    }
}

export {
    getSelection,
    setSelection
}
