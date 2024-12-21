import { TextObjectType } from "../../store/PresentationType";
import { CSSProperties } from "react";
import { useDraggable } from './useDraggable';

type TextObjectProps = {
    textObject: TextObjectType,
    scale?: number,
    onPositionChange: (newPosition: { x: number, y: number }) => void,
    isSelected: boolean,
    onClick: () => void
}

function TextObject({ textObject, scale = 1, onPositionChange, isSelected, onClick }: TextObjectProps) {

    const { position, handleMouseDown } = useDraggable( 
        { x: textObject.x, y: textObject.y }, 
        scale,
        onPositionChange
    )

    const textBoxStyles: CSSProperties = {
        position: 'absolute',
        display: 'inline-block',
        top: `${position.y * scale}px`,
        left: `${position.x * scale}px`,
        width: `${textObject.width * scale}px`,
        height: `${textObject.height * scale}px`,         
        textAlign: 'center',
        cursor: `move`,
        userSelect: `none`
    };

    if (isSelected) {
        textBoxStyles.border = '2px solid #0b57d0'
    }

    return (
        <div style={textBoxStyles} onClick={onClick} onMouseDown={handleMouseDown}>
            {textObject.text}
        </div>
    );
}

export {
    TextObject,
};
