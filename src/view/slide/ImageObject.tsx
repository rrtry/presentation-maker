import {ImageObjectType} from "../../store/PresentationType.ts";
import {CSSProperties} from "react";
import { useDraggable } from "./useDraggable.tsx";

type ImageObjectProps = {
    imageObject: ImageObjectType,
    scale?: number,
    onPositionChange: (newPosition: { x: number, y: number }) => void
}

function ImageObject({imageObject, scale = 1, onPositionChange}: ImageObjectProps) {
    const { position, handleMouseDown, dragRef } = useDraggable(
        { x: imageObject.x, y: imageObject.y }, 
        scale, 
        onPositionChange
    );
    const imageObjectStyles: CSSProperties = {
        position: 'absolute',
        top: `${position.y * scale}px`,
        left: `${position.x * scale}px`,
        width: `${imageObject.width * scale}px`,
        height: `${imageObject.height * scale}px`,
    }
    return (
        <img
            ref={dragRef}
            onMouseDown={handleMouseDown}
            style={imageObjectStyles}
            src={imageObject.src}
        >
        </img>
    );
}

export {
    ImageObject,
}
