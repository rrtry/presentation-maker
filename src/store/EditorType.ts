import {PresentationType} from "./PresentationType.ts";

type SelectionType = {
    selectedSlideId: string,
}

type EditorType = {
    presentation: PresentationType,
    selection:    SelectionType | null,
    objectId:     string | null
}

export type {
    EditorType,
    SelectionType,
}
