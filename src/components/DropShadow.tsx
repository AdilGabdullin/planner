import { Image as KonvaImage } from "konva/lib/shapes/Image";
import { Image, Line } from "react-konva";
import { useAppSelector } from "../store";
import { selectFurniture, selectDrop, selectMagnets } from "../slices/artboard";

export function DropShadow({ dropRef }: { dropRef: React.RefObject<KonvaImage> }) {
    const { id, visible } = useAppSelector(selectDrop);
    const furniture = useAppSelector(selectFurniture);
    const magnets = useAppSelector(selectMagnets);
    if (!visible) return null;
    const image = furniture[id].image;
    return (
        <>
            {magnets.map((m, key) => (
                <Line {...defaultProps} {...m} key={key} />
            ))}
            <Image ref={dropRef} y={-200} image={image} />
        </>
    );
}

const l = 36;
const defaultProps = {
    points: [0, 0, l, 0, l, l / 2, l * 0.5, l / 2, l * 0.5, l, 0, l],
    fill: "#00FF00",
    opacity: 0.5,
    strokeWidth: 0,
    closed: true,
};
