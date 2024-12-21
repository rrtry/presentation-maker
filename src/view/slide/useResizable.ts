import { useState, useCallback, useEffect } from 'react';

type Position = {
    x: number;
    y: number;
};

type Size = {
    width: number;
    height: number;
};

type ResizableProps = {
    initialSize: Size;
    onResize: (newSize: Size) => void;
};

type UseResizableReturnType = {
    size: Size;
    handleMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
};

export function useResizable({ initialSize, onResize }: ResizableProps): UseResizableReturnType {
    
    const [size, setSize] = useState<Size>(initialSize);
    const [resizing, setResizing] = useState<boolean>(false);

    const handleMouseMove = useCallback(
        (e: MouseEvent) => {
            if (resizing) {

                const newWidth = size.width + e.movementX;
                const newHeight = size.height + e.movementY;

                const newSize = {
                    width: Math.max(newWidth, 50),
                    height: Math.max(newHeight, 50),
                };

                setSize(newSize);
                onResize(newSize);
            }
        },
        [resizing, size, onResize]
    );

    const handleMouseUp = useCallback(() => {
        setResizing(false);
    }, []);

    const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setResizing(true);
    }, []);

    useEffect(() => {
        if (resizing) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        } else {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [resizing, handleMouseMove, handleMouseUp]);

    return {
        size,
        handleMouseDown,
    };
}
