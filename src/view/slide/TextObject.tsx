import { TextObjectType } from "../../store/PresentationType";
import { CSSProperties } from "react";
import { useDraggable } from './useDraggable';

type TextObjectProps = {
    textObject: TextObjectType,
    scale?: number,
    onPositionChange: (newPosition: { x: number, y: number }) => void
}

function TextObject({ textObject, scale = 1, onPositionChange }: TextObjectProps) {

    const { position, handleMouseDown } = useDraggable( 
        { x: textObject.x, y: textObject.y }, 
        scale,
        onPositionChange
    )

    const textObjectStyles: CSSProperties = {
        position: 'absolute',
        top: `${position.y * scale}px`,
        left: `${position.x * scale}px`,
        width: `${textObject.width * scale}px`,
        height: `${textObject.height * scale}px`,
        fontSize: `${textObject.fontSize * scale}px`,
        cursor: 'move',
        userSelect: 'none'
    };

    return (
        <p
            style={textObjectStyles}
            onMouseDown={handleMouseDown}
        >
            {textObject.text}
        </p>
    );
}

export {
    TextObject,
};
