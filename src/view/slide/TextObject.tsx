import { TextObjectType } from "../../store/PresentationType";
import { CSSProperties, useState, useRef, useCallback } from "react";
import { useDraggable } from './useDraggable';
import { ResizeHandles } from "./resizeHandles";
import { useResizable } from "./useResizable";

type TextObjectProps = {
    textObject: TextObjectType,
    scale?: number,
    onPositionChange: (newPosition: { x: number, y: number }) => void,
    onSizeChange: (newSize: { width: number, height: number, x: number, y: number }) => void,
    isSelected: boolean,
    onClick: () => void
};

function TextObject({
    textObject,
    scale = 1,
    onPositionChange,
    onSizeChange,
    isSelected,
    onClick
}: TextObjectProps) {

    const { size, handleResizeStart } = useResizable(
        textObject,
        scale,
        onSizeChange
    );

    const { position, handleMouseDown } = useDraggable(
        textObject,
        scale,
        onPositionChange
    );

    const finalPosition = {
        x: size.x !== textObject.x ? size.x : position.x,
        y: size.y !== textObject.y ? size.y : position.y,
    };

    const textBoxStyles: CSSProperties = {
        position: 'absolute',
        top: `${finalPosition.y * scale}px`,
        left: `${finalPosition.x * scale}px`,
        width: `${size.width * scale}px`,
        height: `${size.height * scale}px`,
        fontFamily: textObject.fontFamily,
        fontSize: `${textObject.fontSize * scale}px`,
        userSelect: 'none',
        whiteSpace: 'pre-wrap',
        overflow: 'hidden', 
        boxSizing: 'border-box',
        border: isSelected ? '2px solid #0b57d0' : undefined,
        cursor: 'move'
    };

    if (isSelected) {
        textBoxStyles.border = '2px solid #0b57d0';
    }
    if (scale != 1) {
        textBoxStyles.border = undefined;
        textBoxStyles.pointerEvents = "none";
        textBoxStyles.cursor = "default";
    }
    return (
        <div style={textBoxStyles} onClick={onClick} onMouseDown={handleMouseDown}>
            {textObject.text}
            {isSelected && scale == 1 && ResizeHandles(handleResizeStart)}
        </div> 
    );
}

export { TextObject };
