import React, { useState, useRef, useEffect } from 'react';
import { TextObjectType } from "../../store/PresentationType";
import { CSSProperties } from "react";
import { useDraggable } from './useDraggable';

type TextObjectProps = {
    textObject: TextObjectType,
    scale?: number,
    onPositionChange: (newPosition: { x: number, y: number }) => void
}

function TextObject({ textObject, scale = 1, onPositionChange }: TextObjectProps) {

    const [position, setPosition] = useState({ x: textObject.x, y: textObject.y });
    const offset = useRef({ x: 0, y: 0 });
    const textObjectRef = useRef<HTMLElement>(null);

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

    const handleMouseUp = () => {
        const element = textObjectRef.current!.getBoundingClientRect();
        onPositionChange({ x: element.x - offset.current.x, y: element.y - offset.current.y })
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    };

    useEffect(() => {
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, []); 

    return (
        <p
            ref={textObjectRef}
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
