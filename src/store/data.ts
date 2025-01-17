import {PresentationType, SlideType} from "./PresentationType.ts";
import {EditorType} from "./EditorType.ts";

const slide2: SlideType = {
    id: 'slide-2',
    objects: [
        {
            id: 'slide-object-3',
            x: 10,
            y: 10,
            width: 100,
            height: 100,
            type: "text",
            text: 'Your first slide',
            fontFamily: 'Roboto',
            fontSize: 20,
            fontColor: '#000000',
        }
    ],
    background: '#ff00ff',
}

const presentation: PresentationType = {
    title: 'Название презентации',
    slides: [
        slide2,
    ]
}

const editor: EditorType = {
    presentation,
    selection: {
        selectedSlideId: presentation.slides[0].id,
    },
    objectId: null
}

export {
    editor,
}