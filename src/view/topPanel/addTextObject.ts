import { EditorType } from "../../store/EditorType.ts";
import { getSelection } from '../../store/selection.ts';
import { SlideType, TextObjectType } from "../../store/PresentationType.ts";

function addTextObject(editor: EditorType, pos: {x: number, y: number}): EditorType {
    const currentSlide = getSelection(editor) as SlideType
    const textObject: TextObjectType = {
        id: self.crypto.randomUUID(),
        x: pos.x,
        y: pos.y,
        width:  100,
        height: 100,
        fontSize: 50,
        type: "text",
        text: "Sample text",
        fontFamily: "cursive",
        fontColor:  "White"
    }
    currentSlide.objects = currentSlide?.objects.concat(textObject)
    console.log(currentSlide.objects)
    return { ...editor } 
}

export {
    addTextObject
}