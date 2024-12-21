import { useState, useRef, useEffect} from 'react';

export function useDraggable(
    textObject: { x: number, y: number }, 
    scale: number,
    onPositionChange: (newPosition: {x: number, y: number}) => void) 
{
    const [position, setPosition] = useState({ x: textObject.x, y: textObject.y });
    const offset = useRef({ x: 0, y: 0 });
    
    const handleMouseDown = (e: React.MouseEvent) => {
        offset.current = {
            x: e.clientX - textObject.x,
            y: e.clientY - textObject.y
        };
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup',   handleMouseUp);
    };
    
    const handleMouseMove = (e: MouseEvent) => {
        const newX = (e.clientX - offset.current.x) / scale;
        const newY = (e.clientY - offset.current.y) / scale;
        setPosition({ x: newX, y: newY });
    };
    
    const handleMouseUp = (e: MouseEvent) => {
        onPositionChange({ x: e.clientX - offset.current.x, y: e.clientY - offset.current.y })
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    };
    
    useEffect(() => {
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    return {
        position,
        handleMouseDown
    }
}