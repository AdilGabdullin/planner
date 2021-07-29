import { useState } from "react";
import { Circle, Group, Image } from "react-konva";

const size = 30;
const rotateImage = document.createElement("img");
rotateImage.src = `${process.env.PUBLIC_URL}/images/icons/rotate.svg`;
const deleteImage = document.createElement("img");
deleteImage.src = `${process.env.PUBLIC_URL}/images/icons/delete.svg`;

export function Menu({
    x,
    y,
    onRotate,
    onDelete,
}: {
    x: number;
    y: number;
    onRotate: () => void;
    onDelete: () => void;
}) {
    return (
        <>
            <Button x={x} y={y} image={rotateImage} onClick={onRotate} />
            <Button x={x} y={y + size * 1.5} image={deleteImage} onClick={onDelete} />
        </>
    );
}

function Button({ x, y, image, onClick }: { x: number; y: number; image: HTMLImageElement; onClick: () => void }) {
    const [hover, setHover] = useState(false);
    return (
        <Group onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            <Circle
                x={x - (size * 3) / 4}
                y={y + size / 2}
                radius={size / 2}
                stroke={hover ? "#f5f5f5" : "black"}
                strokeWidth={1}
                fill={hover ? "#f5f5f5" : "white"}
            />
            <Image x={x - size * 1.15} y={y + size * 0.1} image={image} width={size * 0.8} height={size * 0.8} />
        </Group>
    );
}
