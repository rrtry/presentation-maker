import {SlideObject, SlideType} from "../../store/PresentationType.ts";
import {TextObject} from "./TextObject.tsx";
import {ImageObject} from "./ImageObject.tsx";
import styles from './Slide.module.css'
import {CSSProperties} from "react";
import { dispatch, getEditor } from "../../store/editor.ts";
import { getSelection } from "../../store/selection.ts";
import { EditorType } from "../../store/EditorType.ts";
import { ImageObjectType } from "../../store/PresentationType.ts";
import { addTextObject } from "../topPanel/addTextObject.ts";
import { editor } from "../../store/data.ts";
import { BaseSlideObject } from "../../store/PresentationType.ts";

const SLIDE_WIDTH  = 935
const SLIDE_HEIGHT = 525

type SlideProps = {
    slide: SlideType,
    scale?: number,
    isSelected: boolean,
    className: string,
    onSlideUpdate: (updatedSlide: SlideType) => void
}

type UpdatedObject = {
    id: string,
    x: number,
    y: number
}

function Slide({slide, scale = 1, isSelected, className }: SlideProps) {

    const slideStyles: CSSProperties = {
        backgroundColor: slide.background,
        width: `${SLIDE_WIDTH * scale}px`,
        height: `${SLIDE_HEIGHT * scale}px`,
    }

    function updateEditor(editor: EditorType, updatedObj: UpdatedObject): EditorType {
        const currentSlide   = getSelection(editor) as SlideType;
        const updatedObjects = currentSlide.objects.map(obj =>
            obj.id === updatedObj.id
                ? { ...obj, x: updatedObj.x, y: updatedObj.y } // Update only the position
                : obj
        );
        const updatedSlide = { ...currentSlide, objects: updatedObjects };
        return {
            ...editor,
            presentation: {
                ...editor.presentation,
                slides: editor.presentation.slides.map(slide =>
                    slide.id === currentSlide.id ? updatedSlide : slide // Replace the updated slide
                )
            }
        };
    }
    
    const handlePositionChange = (id: string, newPosition: { x: number, y: number }) => {
        console.log('Position changed:', id, newPosition); // Debugging log
        dispatch(updateEditor, { id: id, x: newPosition.x, y: newPosition.y})
    };

    if (isSelected) {
        slideStyles.border = '3px solid #0b57d0'
    }

    return (
        <div style={slideStyles} className={styles.slide + ' ' + className}>
            {slide.objects.map(slideObject => {
                switch (slideObject.type) {
                    case "text":
                        return <TextObject 
                                    onPositionChange={(newPosition) => handlePositionChange(slideObject.id, newPosition)}   
                                    key={slideObject.id}    
                                    textObject={slideObject}    
                                    scale={scale}>
                                </TextObject>
                    case "image":
                        return <ImageObject     
                                    onPositionChange={(newPosition) => handlePositionChange(slideObject.id, newPosition)}   
                                    key={slideObject.id}    
                                    imageObject={slideObject}   
                                    scale={scale}>
                                </ImageObject>
                    default:
                        throw new Error(`Unknown slide type: ${slideObject.type}`)
                }
            })}
        </div>
    )
}

export {
    Slide,
    SLIDE_WIDTH,
    SLIDE_HEIGHT
}
