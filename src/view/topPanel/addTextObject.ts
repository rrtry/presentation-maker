import { EditorType } from "../../store/EditorType.ts";
import { getSelection } from '../../store/selection.ts';
import { SlideType, TextObjectType } from "../../store/PresentationType.ts";

function addTextObject(editor: EditorType, pos: {x: number, y: number}): EditorType {
    const currentSlide = getSelection(editor) as SlideType
    const textObject: TextObjectType = {
        id: self.crypto.randomUUID(),
        x: pos.x,
        y: pos.y,
        width:  400,
        height: 400,
        fontSize: 50,
        type: "text",
        text: "Sample text",
        fontFamily: "cursive",
        fontColor:  "White"
    }
    currentSlide.objects = currentSlide?.objects.concat(textObject)
    return { ...editor } 
}

export {
    addTextObject
}