import { EditorType } from "./EditorType";
import { PresentationType, SlideType } from "./PresentationType";

export const ACTION_SET_EDITOR           = 'SET_EDITOR';
export const ACTION_ADD_SLIDE            = 'ADD_SLIDE';
export const ACTION_REMOVE_SLIDE         = 'REMOVE_SLIDE';
export const ACTION_SET_SLIDE_SELECTION  = 'SET_SLIDE_SELECTION';
export const ACTION_ADD_TEXT_OBJECT      = 'ADD_TEXT';
export const ACTION_ADD_IMAGE_OBJECT     = 'ADD_IMAGE';
export const ACTION_REMOVE_SLIDE_OBJECT  = 'REMOVE_OBJECT';
export const ACTION_SET_OBJECT_SELECTION = 'SET_OBJECT_SELECTION';
export const ACTION_SET_SLIDE_BACKGROUND = 'SET_BACKGROUND';
export const ACTION_LOAD_IMPORTED_DOC    = 'LOAD_IMPORTED_DOC';
export const ACTION_UPDATE_OBJECT_SIZE   = 'UPDATE_OBJECT_SIZE';
export const ACTION_UPDATE_OBJECT_POS    = 'UPDATE_OBJECT_POS';
export const ACTION_RENAME_PRESENTATION  = "RENAME_PRESENATION";
export const ACTION_REORDER_SLIDES       = "REORDER_SLIDES";

export const reorderSlides = (slides: Array<SlideType>, dragIndex: number, hoverIndex: number) => ({
    type: ACTION_REORDER_SLIDES,
    payload: { slides: slides, dragIndex: dragIndex, hoverIndex: hoverIndex }
});

export const setEditor = (editor: EditorType) => ({
    type: ACTION_SET_EDITOR,
    payload: editor
});

export const renamePresentation = (title: string) => ({
    type: ACTION_RENAME_PRESENTATION,
    payload: title
});

export const addSlide = () => ({
    type: ACTION_ADD_SLIDE,
    payload: null
});

export const removeSlide = () => ({
    type: ACTION_REMOVE_SLIDE,
    payload: null
});

export const setSlideSelection = (slideId: string) => ({
    type: ACTION_SET_SLIDE_SELECTION,
    payload: slideId
});

export const addText = (initialPos: { x: number, y: number}) => ({
    type: ACTION_ADD_TEXT_OBJECT,
    payload: initialPos
});

export const addImage = (src: string) => ({
    type: ACTION_ADD_IMAGE_OBJECT,
    payload: src
});

export const removeSlideObject = () => ({
    type: ACTION_REMOVE_SLIDE_OBJECT,
    payload: null
});

export const setObjectSelection = (objId: string) => ({
    type: ACTION_SET_OBJECT_SELECTION,
    payload: objId
});

export const setSlideBackground = (newColor: string) => ({
    type: ACTION_SET_SLIDE_BACKGROUND,
    payload: newColor
});

export const loadImportedDocument = (presentation: PresentationType) => ({
    type: ACTION_LOAD_IMPORTED_DOC,
    payload: presentation
});

export const updateObjectSize = (updatedObj: { 
    id: string, 
    width:  number, 
    height: number, 
    x: number, 
    y: number
}) => ({
    type: ACTION_UPDATE_OBJECT_SIZE,
    payload: updatedObj
});

export const updateObjectPos = (updatedObj: {
    id: string,
    x: number,
    y: number
}) => ({
    type: ACTION_UPDATE_OBJECT_POS,
    payload: updatedObj
});
