import { CSSProperties } from "react";

export function ResizeHandles(handleResizeStart: (e: React.MouseEvent, handle: string) => void) {
    const resizeHandleStyles: CSSProperties = {
        position: 'absolute',
        width: '2px',
        height: '2px',
        borderRadius: '50%',
        backgroundColor: '#0b57d0',
        cursor: 'pointer',
    };
    return (
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
    )
}