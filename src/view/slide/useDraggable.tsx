import { useState, useRef, useEffect } from 'react';

export function useDraggable(
    initialPosition: { x: number, y: number }, 
    scale: number = 1, 
    onDragEnd?: (position: { x: number, y: number }) => void) 
{
    const [position, setPosition] = useState(initialPosition);
    const [isDragging, setIsDragging] = useState(false);
    const dragRef = useRef<HTMLElement>(null);
    const [offset, setOffset] = useState({ 
        offsetX: initialPosition.x,
        offsetY: initialPosition.y
     });

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        const element = dragRef.current;
        if (element) {
            const rect = element.getBoundingClientRect();
            setOffset({
                offsetX: e.clientX - rect.left,
                offsetY: e.clientY - rect.top,
            });
        }
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (isDragging) {
            setPosition({
                x: (e.clientX - offset.offsetX) / scale,
                y: (e.clientY - offset.offsetY) / scale,
            });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        if (onDragEnd) {
            onDragEnd(position);
        }
    };

    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, offset]);

    return { position, handleMouseDown, dragRef };
}

