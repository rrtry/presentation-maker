import {PresentationType} from "./PresentationType.ts";

type SelectionType = {
    selectedSlideId: string,
}

type EditorType = {
    presentation: PresentationType,
    selection: SelectionType | null,
}

export type {
    EditorType,
    SelectionType,
}
