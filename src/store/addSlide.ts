import { EditorType } from "./EditorType";

function addSlide(editor: EditorType): EditorType {
    const newSlideId = self.crypto.randomUUID()
    const newSlides  = editor.presentation.slides.concat(
        {
            id: newSlideId,
            objects: Array(),
            background: "#0000"
        }
    )
    return {
        presentation: {
            ...editor.presentation,
            slides: newSlides,
        },
        selection: {
            selectedSlideId: newSlideId,
        }
    }
}

export {
    addSlide
}