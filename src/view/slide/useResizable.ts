import { useState, useEffect } from "react";
import { BaseSlideObject } from "../../store/PresentationType";

export function useResizable(
    slideObject: BaseSlideObject,
    scale: number,
    onSizeChange: (newSize: { 
        width: number; 
        height: number;
        x: number;
        y: number;
     }) => void) 
{
    const [size, setSize] = useState({
        width: slideObject.width, 
        height: slideObject.height,
        x: slideObject.x,
        y: slideObject.y
    });

    const handleResizeStart = (e: React.MouseEvent, handle: string) => {

        e.stopPropagation();
        const startX = e.clientX;
        const startY = e.clientY;

        const initialWidth  = size.width;
        const initialHeight = size.height;

        const initialX = size.x;
        const initialY = size.y;

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
            const newSize = { width: newWidth, height: newHeight, x: newX, y: newY };
            setSize(newSize);
            return newSize;
        };

        const handleMouseUp = (event: MouseEvent) => {
            const newSize = handleMouseMove(event);
            onSizeChange(newSize);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
    };

    useEffect(() => {
        setSize({
            x: slideObject.x, 
            y: slideObject.y, 
            width: slideObject.width, 
            height: slideObject.height
        });
    }, 
    [slideObject.x, slideObject.y, slideObject.width, slideObject.height])

    return {
        size,
        handleResizeStart
    };
}
