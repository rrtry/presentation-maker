import {SlideObject, SlideType} from "../../store/PresentationType.ts";
import {TextObject} from "./TextObject.tsx";
import {ImageObject} from "./ImageObject.tsx";
import styles from './Slide.module.css'
import {CSSProperties, useState} from "react";
import { dispatch, getEditor } from "../../store/editor.ts";
import { getSelection } from "../../store/selection.ts";
import { EditorType } from "../../store/EditorType.ts";
import { editor } from "../../store/data.ts";

const SLIDE_WIDTH  = 935
const SLIDE_HEIGHT = 525

type SlideProps = {
    slide: SlideType,
    scale?: number,
    isSelected: boolean,
    className: string,
    onSlideUpdate: (updatedSlide: SlideType) => void
}

type PositionUpdateType = {
    id: string,
    x: number,
    y: number
}

type SizeUpdateType = {
    id:     string,
    width:  number,
    height: number
}

function Slide({slide, scale = 1, isSelected, className }: SlideProps) {

    const [selected, _setSelection] = useState<string | null>(getEditor().objectId);
    console.log(`slide: ${slide.objects.length}, ${selected}`)

    const setSelection = (id: string) => {
        dispatch((editor: EditorType, object: string) => {
            return {
                ...editor,
                objectId: object
            }
        }, id)
        _setSelection(id)
    }

    const slideStyles: CSSProperties = {
        backgroundColor: slide.background,
        width: `${SLIDE_WIDTH * scale}px`,
        height: `${SLIDE_HEIGHT * scale}px`
    }

    function updatePosition(editor: EditorType, updatedObj: PositionUpdateType): EditorType {
        const newObjects = slide.objects.map(obj => obj.id === updatedObj.id ? { ...obj, x: updatedObj.x, y: updatedObj.y } : obj)
        return { 
            ...editor,
            presentation: {
                ...editor.presentation,
                slides: editor.presentation.slides.map((s) => s.id === slide.id ? { ...slide, objects: newObjects} : s)
            }
        }
    }

    function updateSize(editor: EditorType, updatedObj: SizeUpdateType): EditorType {
        const currentSlide   = getSelection(editor) as SlideType
        currentSlide.objects = currentSlide.objects.map(obj => obj.id === updatedObj.id ? { ...obj, width: updatedObj.width, height: updatedObj.height } : obj);
        return { ...editor }
    }
    
    const handlePositionChange = (id: string, newPosition: { x: number, y: number }) => {
        dispatch(updatePosition, { id: id, x: newPosition.x, y: newPosition.y})
    }

    const handleSizeChange = (id: string, newSize: { width: number, height: number}) => {
        dispatch(updateSize, { id: id, width: newSize.width, height: newSize.height })
    }

    if (isSelected) {
        slideStyles.border = '10px solid #0b57d0'
    }

    return (
        <div style={slideStyles} className={styles.slide + ' ' + className}>
            {slide.objects.map(slideObject => {
                switch (slideObject.type) {
                    case "text":
                        return <TextObject
                                    onSizeChange={(newSize) => handleSizeChange(slideObject.id, newSize)} 
                                    onPositionChange={(newPosition) => handlePositionChange(slideObject.id, newPosition)}   
                                    key={slideObject.id}    
                                    textObject={slideObject}   
                                    isSelected={selected === slideObject.id}
                                    onClick={() => setSelection(slideObject.id)} 
                                    scale={scale}>
                                </TextObject>
                    case "image":
                        return <ImageObject     
                                    onPositionChange={(newPosition) => handlePositionChange(slideObject.id, newPosition)}   
                                    key={slideObject.id}    
                                    imageObject={slideObject}   
                                    isSelected={selected === slideObject.id}
                                    onClick={() => setSelection(slideObject.id)}
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
