import { Circle, Group, Image } from "react-konva";

const rotationIcon = document.createElement("img");
rotationIcon.src = "images/icons/rotate.svg";

export function Menu({ x, y, onRotate }: { x: number; y: number; onRotate: () => void }) {
    const size = 30;
    return (
        <Group onClick={onRotate}>
            <Circle
                x={x - (size * 3) / 4}
                y={y + size / 2}
                radius={size / 2}
                stroke="black"
                strokeWidth={1}
                fill="white"
            />
            <Image x={x - size * 1.15} y={y + size * 0.1} image={rotationIcon} width={size * 0.8} height={size * 0.8} />
        </Group>
    );
}
