import { TextObjectType } from "../../store/PresentationType";
import { CSSProperties, useState, useRef, useCallback } from "react";
import { useDraggable } from './useDraggable';

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
        { x: textObject.x, y: textObject.y },
        scale,
        onPositionChange
    );
    console.log(`TextObject: ${textObject.text} -> ${position.x}, ${position.y}, ${textObject.width}`)

    const [isResizing, setIsResizing] = useState(false);
    const resizeHandleRef = useRef<string | null>(null);

    const [currentWidth, setCurrentWidth]   = useState(textObject.width);
    const [currentHeight, setCurrentHeight] = useState(textObject.height);
    
    const handleResize = useCallback(
        (e: MouseEvent) => {
            //if (!isResizing || !resizeHandleRef.current) return;

            const scaleAdjusted = scale; 
            let newWidth  = currentWidth;
            let newHeight = currentHeight;
            const offsetX = e.clientX;
            const offsetY = e.clientY;

            console.log('Resizing with handle:', resizeHandleRef.current);
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
                    //newWidth = currentWidth - (offsetX - position.x) / scaleAdjusted;
                    break;
                case 'right':
                    //newWidth = offsetX - position.x;
                    break;
                default:
                    break;
            }
            
            if (newWidth < 100) newWidth = 100;
            if (newHeight < 100) newHeight = 100;
            const newSize = { width: newWidth, height: newHeight }

            console.log('New size:', newSize);
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
        console.log('Started resizing with handle:', handle);
    };

    const handleResizeEnd = () => {
        setIsResizing(false);
        resizeHandleRef.current = null;
        document.removeEventListener('mousemove', handleResize);
        document.removeEventListener('mouseup', handleResizeEnd);
        console.log('Resizing ended');
    };

    const resizeHandleStyles: CSSProperties = {
        position: 'absolute',
        width: '2px',
        height: '2px',
        borderRadius: '50%',
        backgroundColor: '#0b57d0',
        cursor: 'pointer',
    };

    const textBoxStyles: CSSProperties = {
        position: 'absolute',
        top: `${position.y * scale}px`,
        left: `${position.x * scale}px`,
        width: `${currentWidth * scale}px`,
        height: `${currentHeight * scale}`,
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
            {isSelected && (
                <>
                    <div
                        style={{ ...resizeHandleStyles, cursor: 'nw-resize', top: 0, left: 0 }}
                        onMouseDown={(e) => handleResizeStart(e, 'top-left')}
                    />
                    <div
                        style={{ ...resizeHandleStyles, cursor: 'ne-resize', top: 0, right: 0 }}
                        onMouseDown={(e) => handleResizeStart(e, 'top-right')}
                    />
                    <div
                        style={{ ...resizeHandleStyles, cursor: 'sw-resize', bottom: 0, left: 0 }}
                        onMouseDown={(e) => handleResizeStart(e, 'bottom-left')}
                    />
                    <div
                        style={{ ...resizeHandleStyles, cursor: 'se-resize', bottom: 0, right: 0 }}
                        onMouseDown={(e) => handleResizeStart(e, 'bottom-right')}
                    />
                    <div
                        style={{
                            ...resizeHandleStyles,
                            cursor: 'n-resize',
                            top: 0,
                            left: '50%',
                            transform: 'translateX(-50%)',
                        }}
                        onMouseDown={(e) => handleResizeStart(e, 'top')}
                    />
                    <div
                        style={{
                            ...resizeHandleStyles,
                            cursor: 's-resize',
                            bottom: 0,
                            left: '50%',
                            transform: 'translateX(-50%)',
                        }}
                        onMouseDown={(e) => handleResizeStart(e, 'bottom')}
                    />
                    <div
                        style={{
                            ...resizeHandleStyles,
                            cursor: 'w-resize',
                            top: '50%',
                            left: 0,
                            transform: 'translateY(-50%)',
                        }}
                        onMouseDown={(e) => handleResizeStart(e, 'left')}
                    />
                    <div
                        style={{
                            ...resizeHandleStyles,
                            cursor: 'e-resize',
                            top: '50%',
                            right: 0,
                            transform: 'translateY(-50%)',
                        }}
                        onMouseDown={(e) => handleResizeStart(e, 'right')}
                    />
                </>
            )}
        </div> 
    );
}

export { TextObject };
