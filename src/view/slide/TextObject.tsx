import {TextObjectType} from "../../store/PresentationType.ts";
import {CSSProperties} from "react";
import { useDraggable } from './useDraggable.tsx';

type TextObjectProps = {
    textObject: TextObjectType,
    scale?: number,
    onPositionChange: (newPosition: { x: number, y: number }) => void
}

function TextObject({textObject, scale = 1, onPositionChange}: TextObjectProps) {
    const { position, handleMouseDown, dragRef } = useDraggable(
        { x: textObject.x, y: textObject.y }, 
        scale, 
        onPositionChange
    );
    const textObjectStyles: CSSProperties = {
        position: 'absolute',
        top: `${position.y * scale}px`,
        left: `${position.x * scale}px`,
        width: `${textObject.width * scale}px`,
        height: `${textObject.height * scale}px`,
        fontSize: `${textObject.fontSize * scale}px`
    };
    return (
        <p
            ref={dragRef}
            onMouseDown={handleMouseDown}
            style={textObjectStyles}
        >
            {textObject.text}
        </p>
    );
}

export {
    TextObject,
}
