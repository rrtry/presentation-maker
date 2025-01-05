import { TextObjectType } from "../../store/PresentationType";
import { CSSProperties, useState, useRef, useCallback } from "react";
import { useDraggable } from './useDraggable';
import { ResizeHandles } from "./resizeHandles";

type TextObjectProps = {
    textObject: TextObjectType,
    scale?: number,
    onPositionChange: (newPosition: { x: number, y: number }) => void,
    onSizeChange: (newSize: { width: number, height: number }) => void,
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

    const { position, handleMouseDown } = useDraggable(
        textObject,
        scale,
        onPositionChange
    );

    const [isResizing, setIsResizing] = useState(false);
    const resizeHandleRef = useRef<string | null>(null);

    const [currentWidth, setCurrentWidth]   = useState(textObject.width);
    const [currentHeight, setCurrentHeight] = useState(textObject.height);

    const handleResize = useCallback(
        (e: MouseEvent) => {

            const scaleAdjusted = scale; 
            let newWidth  = currentWidth;
            let newHeight = currentHeight;
            const offsetX = e.clientX;
            const offsetY = e.clientY;
            
            switch (resizeHandleRef.current) {
                case 'top-left':
                    newWidth = currentWidth - (offsetX - position.x) / scaleAdjusted;
                    newHeight = currentHeight - (offsetY - position.y) / scaleAdjusted;
                    break;
                case 'top-right':
                    newWidth = offsetX - position.x;
                    newHeight = currentHeight - (offsetY - position.y) / scaleAdjusted;
                    break;
                case 'bottom-left':
                    newWidth = currentWidth - (offsetX - position.x) / scaleAdjusted;
                    newHeight = offsetY - position.y;
                    break;
                case 'bottom-right':
                    newWidth  = offsetX - position.x;
                    newHeight = offsetY - position.y;
                    break;
                case 'top':
                    newHeight = currentHeight - (offsetY - position.y) / scaleAdjusted;
                    break;
                case 'bottom':
                    newHeight = offsetY - position.y;
                    break;
                case 'left':
                    newWidth = currentWidth - (offsetX - position.x) / scaleAdjusted;
                    break;
                case 'right':
                    newWidth = offsetX - position.x;
                    break;
                default:
                    break;
            }
            
            if (newWidth < 100) newWidth = 100;
            if (newHeight < 100) newHeight = 100;
            const newSize = { width: newWidth, height: newHeight }

            setCurrentWidth(newWidth);
            setCurrentHeight(newHeight);
            onSizeChange(newSize);
        },
        [isResizing, position, currentWidth, currentHeight, scale, onSizeChange]
    ); 

    const handleResizeStart = (e: React.MouseEvent, handle: string) => {
        setIsResizing(true);
        resizeHandleRef.current = handle;
        document.addEventListener('mousemove', handleResize);
        document.addEventListener('mouseup', handleResizeEnd);
        e.stopPropagation();
    };

    const handleResizeEnd = () => {
        setIsResizing(false);
        resizeHandleRef.current = null;
        document.removeEventListener('mousemove', handleResize);
        document.removeEventListener('mouseup', handleResizeEnd);
    };

    const textBoxStyles: CSSProperties = {
        position: 'absolute',
        top: `${position.y * scale}px`,
        left: `${position.x * scale}px`,
        width: `${currentWidth * scale}px`,
        height: `${currentHeight * scale}px`,
        fontFamily: textObject.fontFamily,
        fontSize: `${textObject.fontSize * scale}px`,
        userSelect: 'none',
        whiteSpace: 'pre-wrap',
        overflow: 'hidden', 
        boxSizing: 'border-box',
        border: isSelected ? '2px solid #0b57d0' : undefined,
        cursor: isResizing ? 'grabbing' : 'move'
    };

    if (isSelected) {
        textBoxStyles.border = '2px solid #0b57d0';
    }
    if (scale != 1) {
        textBoxStyles.pointerEvents = "none";
        textBoxStyles.cursor = "default";
    }

    return (
        <div style={textBoxStyles} onClick={onClick} onMouseDown={handleMouseDown}>
            {textObject.text}
            {isSelected && ResizeHandles(handleResizeStart)}
        </div> 
    );
}

export { TextObject };
