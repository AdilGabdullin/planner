import { LineConfig } from "konva/lib/shapes/Line";
import { Line } from "react-konva";
import { selectArtboard } from "../slices/artboard";
import { useAppSelector } from "../store";

const darkGrey = "#999999";
const lightGrey = "#cccccc";

export function Grid() {
    const { width, height, gridStep, padding: p } = useAppSelector(selectArtboard);
    const lines: LineConfig[] = [];
    let key = 0;
    let stroke = lightGrey;
    const vertical = (x: number) => <Line key={key} stroke={stroke} x={x} y={p} points={[0, -1, 0, height + 1]} />;
    const horizontal = (y: number) => <Line key={key} stroke={stroke} x={p} y={y} points={[-1, 0, width + 1, 0]} />;
    for (let x = p; x <= width + p; key += 1, x += gridStep) lines.push(vertical(x));
    for (let y = p; y <= height + p; key += 1, y += gridStep) lines.push(horizontal(y));
    stroke = darkGrey;
    for (let x = p; x <= width + p; key += 1, x += gridStep * 5) lines.push(vertical(x));
    for (let y = p; y <= height + p; key += 1, y += gridStep * 5) lines.push(horizontal(y));
    return <>{lines}</>;
}
