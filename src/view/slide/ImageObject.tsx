import { ImageObjectType } from "../../store/PresentationType.ts";
import { CSSProperties } from "react";
import { useDraggable } from "./useDraggable.ts";

type ImageObjectProps = {
    imageObject: ImageObjectType,
    scale?: number,
    onPositionChange: (newPosition: { x: number, y: number }) => void,
    onClick: () => void,
    isSelected: boolean,
}

function ImageObject({imageObject, scale = 1, onPositionChange, isSelected, onClick}: ImageObjectProps) {

    const { position, handleMouseDown } = useDraggable( 
        imageObject, 
        scale,
        onPositionChange
    )

    const imageObjectStyles: CSSProperties = {
        position: 'absolute',
        top: `${position.y * scale}px`,
        left: `${position.x * scale}px`,
        width: `${imageObject.width * scale}px`,
        height: `${imageObject.height * scale}px`,
        cursor: 'move', 
        userSelect: 'none'
    }
    
    if (isSelected) {
        imageObjectStyles.border = '2px solid #0b57d0'
    }
    if (scale != 1) {
        imageObjectStyles.pointerEvents = "none"
        imageObjectStyles.cursor = "default"
    }

    return (
        <img
            draggable="false"
            onMouseDown={handleMouseDown}
            style={imageObjectStyles}
            onClick={onClick}
            src={imageObject.src}
        >
        </img>
    );
}

export {
    ImageObject,
}
