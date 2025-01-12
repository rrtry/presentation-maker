import { EditorType } from "../store/EditorType";
import { SlideType } from "../store/PresentationType";
import { TextObjectType } from "../store/PresentationType";
import { ImageObjectType } from "../store/PresentationType";

export function addTextObject(editor: EditorType, slideId: string, text: string): EditorType {
    const newTextObject: TextObjectType = {
        id: "31286dec-bed0-46ca-859e-e37ebe82593d",
        type: 'text',
        text: text,
        x: 0,
        y: 0,
        width: 400,
        height: 40,
        fontFamily: 'Arial',
        fontSize: 20,
        fontColor: 'black',
    };

    const updatedSlides = editor.presentation.slides.map((slide) =>
        slide.id === slideId
            ? { ...slide, objects: [...slide.objects, newTextObject] }
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

export function addImageObject(editor: EditorType, slideId: string, imageData: string): EditorType {
    const newImageObject: ImageObjectType = {
        id: "31286dec-bed0-46ca-859e-e37ebe82593d",
        type: 'image',
        src: imageData,
        x: 100,
        y: 100,
        width: 200,
        height: 200,
    };

    const updatedSlides = editor.presentation.slides.map((slide) =>
        slide.id === slideId
            ? { ...slide, objects: [...slide.objects, newImageObject] }
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

export const changePresentationTitle = (state: EditorType, newTitle: string): EditorType => {
    return {
        ...state,
        presentation: {
            ...state.presentation,
            title: newTitle
        }
    };
};

export const addSlide = (state: EditorType): EditorType => {
    const newSlide: SlideType = {
        id: "27ac78c0-8651-4d76-a8be-1ac9a1917b13",
        objects: [],
        background: '#FFFFFF'
    };

    return {
        ...state,
        presentation: {
            ...state.presentation,
            slides: [...state.presentation.slides, newSlide]
        },
    };
};

export const removeSlide = (state: EditorType, slideId: string): EditorType => {

    const newSlides = state.presentation.slides.filter(slide => slide.id !== slideId);
    const newSelection = newSlides.length > 0 ? { selectedSlideId: newSlides[0].id } : null;

    return {
        ...state,
        presentation: {
            ...state.presentation,
            slides: newSlides
        },
        selection: newSelection
    };
};

export const moveSlide = (state: EditorType, slideId: string, newIndex: number): EditorType => {

    const slides = [...state.presentation.slides];
    const slideIndex = slides.findIndex(slide => slide.id === slideId);

    if (slideIndex === -1 || newIndex < 0 || newIndex >= slides.length) {
        return state;
    }

    const [removedSlide] = slides.splice(slideIndex, 1);
    slides.splice(newIndex, 0, removedSlide);

    return {
        ...state,
        presentation: {
            ...state.presentation,
            slides: slides
        }
    };
};