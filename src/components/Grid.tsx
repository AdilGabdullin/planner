import { LineConfig } from "konva/lib/shapes/Line";
import { Line } from "react-konva";

const darkGrey = "#999999";
const lightGrey = "#cccccc";

export function Grid(props: {
  width: number;
  height: number;
  padding: number;
  gridStep: number;
}) {
  const { width, height, gridStep, padding: p } = props;
  const lines: LineConfig[] = [];
  const vertical = (key: number, x: number, stroke: string) => (
    <Line key={key} stroke={stroke} x={x} y={p} points={[0, 0, 0, height]} />
  );
  const horizontal = (key: number, y: number, stroke: string) => (
    <Line key={key} stroke={stroke} x={p} y={y} points={[0, 0, width, 0]} />
  );

  let key = 0;
  for (let x = p; x <= width + p; key += 1, x += gridStep)
    lines.push(vertical(key, x, lightGrey));
  for (let y = p; y <= height + p; key += 1, y += gridStep)
    lines.push(horizontal(key, y, lightGrey));
  for (let x = p; x <= width + p; key += 1, x += gridStep * 5)
    lines.push(vertical(key, x, darkGrey));
  for (let y = p; y <= height + p; key += 1, y += gridStep * 5)
    lines.push(horizontal(key, y, darkGrey));
  return <>{lines}</>;
}
