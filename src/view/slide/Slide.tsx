import {SlideType} from "../../store/PresentationType.ts";
import {TextObject} from "./TextObject.tsx";
import {ImageObject} from "./ImageObject.tsx";
import styles from './Slide.module.css'
import {CSSProperties} from "react";

const SLIDE_WIDTH  = 935
const SLIDE_HEIGHT = 525

type SlideProps = {
    slide: SlideType,
    scale?: number,
    isSelected: boolean,
    className: string,
    onSlideUpdate?: (updatedSlide: SlideType) => void
}

function Slide({slide, scale = 1, isSelected, className, onSlideUpdate }: SlideProps) {

    const slideStyles:CSSProperties = {
        backgroundColor: slide.background,
        width: `${SLIDE_WIDTH * scale}px`,
        height: `${SLIDE_HEIGHT * scale}px`,
    }
    
    const handlePositionChange = (id: string, newPosition: { x: number, y: number }) => {
        const updatedObjects = slide.objects.map(obj =>
            obj.id === id ? { ...obj, x: newPosition.x, y: newPosition.y } : obj
        )
        if (onSlideUpdate) {
            onSlideUpdate({ ...slide, objects: updatedObjects})
        }
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
