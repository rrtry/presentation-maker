import { useState, useEffect } from "react";

export function useResizable(
    initialPosition: { x: number; y: number },
    initialSize: { width: number; height: number },
    scale: number,
    onPositionChange: (newPosition: { x: number; y: number }) => void,
    onSizeChange: (newSize: { width: number; height: number }) => void) 
{
        
    const [size, setSize] = useState(initialSize);
    const [position, setPosition] = useState(initialPosition);

    const handleResizeStart = (e: React.MouseEvent, handle: string) => {

        e.stopPropagation();
        const startX = e.clientX;
        const startY = e.clientY;

        const initialWidth  = size.width;
        const initialHeight = size.height;

        const initialX = position.x;
        const initialY = position.y;

        const handleMouseMove = (event: MouseEvent) => {

            const deltaX = (event.clientX - startX) / scale;
            const deltaY = (event.clientY - startY) / scale;

            let newWidth  = initialWidth;
            let newHeight = initialHeight;

            let newX = initialX;
            let newY = initialY;

            if (handle === "right") {
                newWidth = initialWidth + deltaX;
            }
            if (handle === "left") {
                newWidth = initialWidth - deltaX;
                newX = initialX + deltaX;
            }
            if (handle === "bottom") {
                newHeight = initialHeight + deltaY;
            }
            if (handle === "top") {
                newHeight = initialHeight - deltaY;
                newY = initialY + deltaY;
            }
            if (handle === "top-left") {
                newWidth  = initialWidth - deltaX;
                newHeight = initialHeight - deltaY;
                newX = initialX + deltaX;
                newY = initialY + deltaY;
            }
            if (handle === "top-right") {
                newWidth = initialWidth + deltaX;
                newHeight = initialHeight - deltaY;
                newY = initialY + deltaY;
            }
            if (handle === "bottom-left") {
                newWidth = initialWidth - deltaX;
                newHeight = initialHeight + deltaY;
                newX = initialX + deltaX;
            }
            if (handle === "bottom-right") {
                newWidth  = initialWidth + deltaX;
                newHeight = initialHeight + deltaY;
            }

            setSize({ width: newWidth, height: newHeight });
            setPosition({ x: newX, y: newY });
            onSizeChange({ width: newWidth, height: newHeight });
            onPositionChange({ x: newX, y: newY });
        };

        const handleMouseUp = (e: MouseEvent) => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
    };

    useEffect(() => {
        setPosition(position)
        setSize(size)
    }, 
    [size, position])

    return {
        position,
        size,
        handleResizeStart,
    };
}
