import { useState, useRef, useEffect } from 'react';
import { SLIDE_WIDTH, SLIDE_HEIGHT } from './Slide';
import { BaseSlideObject } from '../../store/PresentationType';

function clamp(min: number, max: number, value: number): number {
    return Math.min(Math.max(value, min), max);
}

export function useDraggable(
    slideObject: BaseSlideObject, 
    scale: number,
    onPositionChange: (newPosition: {x: number, y: number}) => void) 
{
    const [position, setPosition] = useState({ x: slideObject.x, y: slideObject.y });
    const offset = useRef({ x: 0, y: 0 });
    
    const handleMouseDown = (e: React.MouseEvent) => {
        offset.current = {
            x: e.clientX - slideObject.x,
            y: e.clientY - slideObject.y
        };
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup',   handleMouseUp);
    };
    
    const handleMouseMove = (e: MouseEvent) => {
        const newX = clamp(0, SLIDE_WIDTH  - slideObject.width, (e.clientX - offset.current.x) / scale);
        const newY = clamp(0, SLIDE_HEIGHT - slideObject.height, (e.clientY - offset.current.y) / scale);
        setPosition({ x: newX, y: newY });
    };
    
    const handleMouseUp = (e: MouseEvent) => {
        const newX = clamp(0, SLIDE_WIDTH  - slideObject.width, (e.clientX - offset.current.x) / scale);
        const newY = clamp(0, SLIDE_HEIGHT - slideObject.height, (e.clientY - offset.current.y) / scale);
        onPositionChange({ x: newX, y: newY });
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    };
    
    useEffect(() => {
        setPosition({ x: slideObject.x, y: slideObject.y });
    }, [slideObject.x, slideObject.y]);

    return {
        position,
        handleMouseDown
    }
}