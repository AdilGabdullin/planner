import { useState } from "react";
import { Circle, Group, Image } from "react-konva";

const rotationIcon = document.createElement("img");
rotationIcon.src = "images/icons/rotate.svg";

export function Menu({ x, y, onRotate }: { x: number; y: number; onRotate: () => void }) {
    const size = 30;
    const [state, setState] = useState({ hover: false });
    const { hover } = state;

    return (
        <Group
            onClick={onRotate}
            onMouseEnter={() => setState({ hover: true })}
            onMouseLeave={() => setState({ hover: false })}
        >
            <Circle
                x={x - (size * 3) / 4}
                y={y + size / 2}
                radius={size / 2}
                stroke={hover ? "#f5f5f5" : "black"}
                strokeWidth={1}
                fill={hover ? "#f5f5f5" : "white"}
            />
            <Image x={x - size * 1.15} y={y + size * 0.1} image={rotationIcon} width={size * 0.8} height={size * 0.8} />
        </Group>
    );
}
