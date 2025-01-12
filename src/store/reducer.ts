import { EditorType } from './EditorType';
import { TextObjectType, ImageObjectType } from './PresentationType.ts';
import { SlideType } from './PresentationType.ts';
import { getSelection } from './selection.ts';
import { 
    ACTION_ADD_SLIDE,       
    ACTION_REMOVE_SLIDE,         
    ACTION_SET_SLIDE_SELECTION,  
    ACTION_ADD_TEXT_OBJECT,      
    ACTION_ADD_IMAGE_OBJECT,     
    ACTION_REMOVE_SLIDE_OBJECT,  
    ACTION_SET_OBJECT_SELECTION, 
    ACTION_SET_SLIDE_BACKGROUND,
    ACTION_LOAD_IMPORTED_DOC,    
    ACTION_UPDATE_OBJECT_SIZE,   
    ACTION_REORDER_SLIDES,
    ACTION_UPDATE_OBJECT_POS,
    ACTION_SET_EDITOR,
    ACTION_RENAME_PRESENTATION
} from './actions.ts';

import { 
    SLIDE_WIDTH,
    SLIDE_HEIGHT
 } from '../view/slide/Slide.tsx';

import { editor } from './data';
import { STORAGE_KEY } from '../main.tsx';

function addSlide(state: EditorType): EditorType {
    const newSlideId = self.crypto.randomUUID();
    return {
        presentation: {
            ...state.presentation,
            slides: state.presentation.slides.concat(
                {
                    id: newSlideId,
                    objects: Array(),
                    background: "#0000"
                }
            ),
        },
        selection: {
            selectedSlideId: newSlideId,
        },
        objectId: null
    }
}

function removeSlide(editor: EditorType): EditorType {

    if (!editor.selection || editor.presentation.slides.length === 1) {
      return editor;
    }
  
    const removeSlideId = editor.selection.selectedSlideId;
    const removeSlideIndex = editor.presentation.slides.findIndex(
      (slide) => slide.id === removeSlideId
    );

    const newSlides = editor.presentation.slides.filter(
      (slide) => slide.id !== removeSlideId
    );

    const newSelectedSlideId =
      newSlides.length > 0
        ? newSlides[Math.min(removeSlideIndex, newSlides.length - 1)].id
        : null;
  
    return {
      ...editor,
      presentation: {
        ...editor.presentation,
        slides: newSlides,
      },
      selection: newSelectedSlideId
        ? { selectedSlideId: newSelectedSlideId }
        : null,
      objectId: null,
    };
}

function setSlideSelection(editor: EditorType, slideId: string) {
    return {
        ...editor,
        selection: { selectedSlideId: slideId }
    }
}

function addTextObject(editor: EditorType, pos: { x: number; y: number }): EditorType {
    const textObject: TextObjectType = {
        id: self.crypto.randomUUID(),
        x: pos.x,
        y: pos.y,
        width: 400,
        height: 400,
        fontSize: 50,
        type: "text",
        text: "Sample text",
        fontFamily: "cursive",
        fontColor: "White",
    };

    const updatedSlides = editor.presentation.slides.map(slide =>
        slide.id === editor.selection?.selectedSlideId
            ? { ...slide, objects: [...slide.objects, textObject] }
            : slide
    );

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: updatedSlides,
        },
    };
}

function addImageObject(editor: EditorType, data: string): EditorType {

    const imgObject: ImageObjectType = {
        id: self.crypto.randomUUID(),
        x: 100,
        y: 100,
        width: SLIDE_WIDTH / 2,
        height: SLIDE_HEIGHT / 2,
        type: "image",
        src: data,
    };

    const updatedSlides = editor.presentation.slides.map(slide =>
        slide.id === editor.selection?.selectedSlideId
            ? { ...slide, objects: [...slide.objects, imgObject] }
            : slide
    );

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: updatedSlides,
        },
    };
}

function removeObject(editor: EditorType): EditorType {
    const updatedSlides = editor.presentation.slides.map(slide =>
        slide.id === editor.selection?.selectedSlideId
            ? { ...slide, objects: slide.objects.filter(obj => obj.id !== editor.objectId) }
            : slide
    );

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: updatedSlides,
        },
        objectId: null,
    };
}

function setObjectSelection(editor: EditorType, id: string): EditorType {
    return {
        ...editor,
        objectId: id
    }
}

function setSlideBackgroundColor(editor: EditorType, newColor: string): EditorType {
    const updatedSlides = editor.presentation.slides.map(slide =>
        slide.id === editor.selection?.selectedSlideId
            ? { ...slide, background: newColor }
            : slide
    );

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: updatedSlides,
        },
    };
}

function updateObjectPosition(editor: EditorType, updatedObj: {
    id: string,
    x:  number,
    y:  number
}): EditorType {
    const slide   = getSelection(editor) as SlideType;
    const objects = slide.objects.map(obj => obj.id === updatedObj.id ? { ...obj, x: updatedObj.x, y: updatedObj.y } : obj);
    return { 
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: editor.presentation.slides.map((s) => s.id === slide.id ? { ...slide, objects: objects } : s)
        }
    }
}

function updateObjectSize(editor: EditorType, updatedObj: { 
    id:     string, 
    width:  number, 
    height: number, 
    x:      number, 
    y:      number
}): EditorType {
    const slide   = getSelection(editor) as SlideType;
    const objects = slide.objects.map(obj => obj.id === updatedObj.id ? { 
        ...obj, 
        width: updatedObj.width, 
        height: updatedObj.height,
        x: updatedObj.x, 
        y: updatedObj.y
     } : obj);
    return { 
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: editor.presentation.slides.map((s) => s.id === slide.id ? { ...slide, objects: objects } : s)
        }
    }
}

function reoderSlides(
    editor: EditorType, 
    slides: Array<SlideType>, 
    hoverIndex: number, 
    dragIndex: number): EditorType 
{
    const updatedSlides = Array.from(slides);
    const [removed] = updatedSlides.splice(dragIndex, 1);
    updatedSlides.splice(hoverIndex, 0, removed);
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: slides
        }
    }
}

const editorReducer = (state: EditorType = editor, action: any): EditorType => {
    let newState;
    switch (action.type) {
        case ACTION_RENAME_PRESENTATION:
            newState = { 
                ...state,
                presentation: {
                    ...state.presentation,
                    title: action.payload
                }
            }
            break;
        case ACTION_REORDER_SLIDES:
            newState = reoderSlides(
                state, 
                action.payload.slides, 
                action.payload.hoverIndex, 
                action.payload.dragIndex
            );
            break;
        case ACTION_SET_EDITOR:
            newState = action.payload;
            break;
        case ACTION_ADD_SLIDE:
            newState = addSlide(state);
            break;
        case ACTION_REMOVE_SLIDE:
            newState = removeSlide(state);
            break;
        case ACTION_SET_SLIDE_SELECTION:
            newState = setSlideSelection(state, action.payload);
            break;
        case ACTION_ADD_TEXT_OBJECT:
            newState = addTextObject(state, action.payload);
            break;
        case ACTION_ADD_IMAGE_OBJECT:
            newState = addImageObject(state, action.payload);
            break;
        case ACTION_REMOVE_SLIDE_OBJECT:
            newState = removeObject(state);
            break;
        case ACTION_SET_OBJECT_SELECTION:
            newState = setObjectSelection(state, action.payload);
            break;
        case ACTION_SET_SLIDE_BACKGROUND:
            newState = setSlideBackgroundColor(state, action.payload);
            break;
        case ACTION_UPDATE_OBJECT_POS:
            newState = updateObjectPosition(state, action.payload);
            break;
        case ACTION_UPDATE_OBJECT_SIZE:
            newState = updateObjectSize(state, action.payload);
            break;
        default:
            return state;
    }
    localStorage.setItem('editor', JSON.stringify(newState));
    return newState;
};

export default editorReducer;