import { Line } from "react-konva";
import { selectArtboard, selectDrop } from "../slices/artboard";
import { useAppSelector } from "../store";

export function Border() {
    const drop = useAppSelector(selectDrop);
    const { width, height, padding: p } = useAppSelector(selectArtboard);
    if (!drop.visible) return null;
    return (
        <>
            <Line x={p} y={p} stroke="black" points={[0, -1, 0, height + 1]} />
            <Line x={p} y={p} stroke="black" points={[-1, 0, width, 0]} />
            <Line x={p} y={p + height} stroke="black" points={[-1, 0, width, 0]} />
            <Line x={p + width} y={p} stroke="black" points={[0, -1, 0, height + 1]} />
        </>
    );
}
