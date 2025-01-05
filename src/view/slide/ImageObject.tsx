import { CSSProperties } from "react";
import { ImageObjectType } from "../../store/PresentationType.ts";
import { useDraggable } from "./useDraggable.ts";
import { useResizable } from "./useResizable.ts";
import { ResizeHandles } from "./ResizeHandles.tsx";

type ImageObjectProps = {
  imageObject: ImageObjectType;
  scale?: number;
  onPositionChange: (newPosition: { x: number; y: number }) => void;
  onSizeChange: (newSize: { width: number; height: number }) => void;
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
    
    const { position: resizedPosition, size, handleResizeStart } = useResizable(
        { x: imageObject.x, y: imageObject.y },
        { width: imageObject.width, height: imageObject.height },
        scale,
        onPositionChange,
        onSizeChange
    );

    const { position: dragPosition, handleMouseDown } = useDraggable(
        imageObject,
        scale,
        onPositionChange
    );

    const finalPosition = {
        x: resizedPosition.x !== imageObject.x ? resizedPosition.x : dragPosition.x,
        y: resizedPosition.y !== imageObject.y ? resizedPosition.y : dragPosition.y,
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
        {isSelected && ResizeHandles(handleResizeStart)}
        </div>
    );
}

export { ImageObject };
