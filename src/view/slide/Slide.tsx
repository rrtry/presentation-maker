import {SlideType} from "../../store/PresentationType.ts";
import {TextObject} from "./TextObject.tsx";
import {ImageObject} from "./ImageObject.tsx";
import styles from './Slide.module.css'
import {CSSProperties} from "react";
import { dispatch, getEditor } from "../../store/editor.ts";
import { setSelection } from "../../store/selection.ts";
import { editor } from "../../store/data.ts";
import { EditorType } from "../../store/EditorType.ts";

const SLIDE_WIDTH  = 935
const SLIDE_HEIGHT = 525

type SlideProps = {
    slide: SlideType,
    scale?: number,
    isSelected: boolean,
    className: string,
    onSlideUpdate: (updatedSlide: SlideType) => void
}

function Slide({slide, scale = 1, isSelected, className, onSlideUpdate }: SlideProps) {

    const slideStyles:CSSProperties = {
        backgroundColor: slide.background,
        width: `${SLIDE_WIDTH * scale}px`,
        height: `${SLIDE_HEIGHT * scale}px`,
    }

    function updateEditor(editor: EditorType, updatedSlides: Array<SlideType>): EditorType {
        return {
            ...editor,
            presentation: {
                ...editor.presentation,
                slides: updatedSlides,
            }
        }
    }
    
    const handlePositionChange = (id: string, newPosition: { x: number, y: number }) => {
        console.log(`handlePositionChange: ${newPosition.x}, ${newPosition.y}`)
        const updatedObjects = slide.objects.map(obj => obj.id === id ?  { ...obj, x: newPosition.x, y: newPosition.y } : obj)
        const updatedSlides  = editor.presentation.slides.map(s => s.id === slide.id ? { ...slide, objects: updatedObjects } : s)
        dispatch(updateEditor, updatedSlides)
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
