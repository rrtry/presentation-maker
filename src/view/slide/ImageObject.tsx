import { CSSProperties } from "react";
import { ImageObjectType } from "../../store/PresentationType.ts";
import { useResizable } from "./useResizable.ts";
import { useDraggable } from "./useDraggable.ts";
import { ResizeHandles } from "./resizeHandles.tsx";

type ImageObjectProps = {
  imageObject: ImageObjectType;
  scale?: number;
  onPositionChange: (newPosition: { x: number; y: number }) => void;
  onSizeChange: (newSize: { width: number; height: number, x: number, y: number }) => void;
  onClick: () => void;
  isSelected: boolean;
};

function ImageObject({
  imageObject,
  scale = 1,
  onPositionChange,
  onSizeChange,
  isSelected,
  onClick,
}: ImageObjectProps) {
    
    const { size, handleResizeStart } = useResizable(
        imageObject,
        scale,
        onSizeChange
    );

    const { position, handleMouseDown } = useDraggable(
        imageObject,
        scale,
        onPositionChange
    );

    const finalPosition = {
        x: size.x !== imageObject.x ? size.x : position.x,
        y: size.y !== imageObject.y ? size.y : position.y,
    };

    const imageObjectStyles: CSSProperties = {
        position: "absolute",
        top: `${finalPosition.y * scale}px`,
        left: `${finalPosition.x * scale}px`,
        width: `${size.width * scale}px`,
        height: `${size.height * scale}px`,
        cursor: "move",
        userSelect: "none",
        border: isSelected ? "2px solid #0b57d0" : undefined,
    };

    if (scale !== 1) {
        imageObjectStyles.pointerEvents = "none";
        imageObjectStyles.cursor = "default";
        imageObjectStyles.border = undefined;
    }

    return (
        <div
        style={imageObjectStyles}
        onMouseDown={handleMouseDown}
        onClick={onClick}
        >
        <img
            draggable="false"
            src={imageObject.src}
            style={{ width: "100%", height: "100%" }}
        />
        {isSelected && scale == 1 && ResizeHandles(handleResizeStart)}
        </div>
    );
}

export { ImageObject };
