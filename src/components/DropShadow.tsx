import { Image as KonvaImage } from "konva/lib/shapes/Image";
import { Image } from "react-konva";
import { useAppSelector } from "../store";
import { selectFurniture, selectDrop } from "../slices/artboard";
import { FurnitureType } from "../config";

export function DropShadow({ dropRef }: { dropRef: React.RefObject<KonvaImage> }) {
    const { id, visible, type } = useAppSelector(selectDrop);
    const furniture = useAppSelector(selectFurniture);
    if (!visible) return null;
    const image = furniture[id].image;
    const corner = type === FurnitureType.LeftCorner || type === FurnitureType.RightCorner;
    return <>{!corner && <Image ref={dropRef} y={-200} image={image} />}</>;
}
