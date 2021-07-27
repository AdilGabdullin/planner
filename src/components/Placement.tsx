import {
    move,
    rotate,
    setSelected,
    selectPlacement,
    selectFurniture,
    selectStageRect,
    selectArtboard,
} from "../slices/artboard";
import { Group, Image, Rect } from "react-konva";
import { KonvaEventObject } from "konva/lib/Node";
import { useAppSelector } from "../store";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Vector2d } from "konva/lib/types";
import { Menu } from "./Menu";
import { Placement as PlacementType } from "../slices/artboard";
import { FurnitureType } from "../config";

type KEO = KonvaEventObject<globalThis.DragEvent>;

export function Placement({ rectMode }: { rectMode: boolean }) {
    const dispatch = useDispatch();
    const { padding, round } = useAppSelector(selectArtboard);
    const furniture = useAppSelector(selectFurniture);
    const placement = useAppSelector(selectPlacement);
    const stageRect = useAppSelector(selectStageRect);
    const [start, setStart] = useState({ x: 0, y: 0 });
    const grouped = placement.filter((p) => p.selected);
    const selected: number[] = [];
    placement.forEach((p, i) => {
        if (p.selected) selected.push(i);
    });
    const groupRect = getGroupRect(grouped, round);
    const groupWidth = groupRect.width;
    const groupHeight = groupRect.height;
    const xRange = [
        stageRect.x + padding - groupRect.x,
        stageRect.x + stageRect.width - groupWidth - padding - groupRect.x,
    ];
    const yRange = [padding - groupRect.y, stageRect.height - groupHeight - padding - groupRect.y];
    const dragBoundFunc = (pos: Vector2d) => {
        return {
            x: toRange(pos.x, xRange),
            y: toRange(pos.y, yRange),
        };
    };
    const onDragStart = (e: KEO) => {
        const { x, y } = e.target.getClientRect();
        setStart({ x, y });
    };
    const onDragEnd = (e: KEO) => {
        const { x, y } = e.target.getClientRect();
        dispatch(move({ selected, movementX: x - start.x, movementY: y - start.y }));
        dispatch(setSelected([]));
        dispatch(setSelected(selected));
    };
    const onRotate = () => {
        dispatch(rotate({ selected, groupRect }));
    };
    const onMouseEnter = (id: number) => (e: KEO) => {
        if (rectMode) return;
        dispatch(setSelected([id]));
    };
    return (
        <>
            {placement.map(({ rect: { x, y, width, height } }, key) => {
                return <Rect stroke="cyan" {...{ x, y, width, height, key }} />;
            })}
            {placement.map(({ id, x, y, rotation, selected }, key) => {
                if (selected && !rectMode) return null;
                const offset = furniture[id].offset;
                return (
                    <Image
                        {...{ key, x: x + offset[0], y: y + offset[1], rotation }}
                        image={furniture[id].image}
                        onMouseEnter={onMouseEnter(key)}
                    />
                );
            })}
            {grouped.length > 0 && !rectMode && (
                <Group draggable {...{ onDragStart, onDragEnd, dragBoundFunc }}>
                    {grouped.map(({ id, x, y, rotation }, key) => {
                        const offset = furniture[id].offset;
                        return (
                            <Image
                                {...{ key, x: x + offset[0], y: y + offset[1], rotation }}
                                image={furniture[id].image}
                            />
                        );
                    })}
                    {groupRect.visible && <Rect {...groupRect} stroke="black" />}
                    <Menu x={groupRect.x} y={groupRect.y} onRotate={onRotate} />
                </Group>
            )}
        </>
    );
}

function toRange(x: number, [min, max]: number[]) {
    if (x < min) return min;
    if (x > max) return max;
    return x;
}

function getGroupRect(grouped: PlacementType[], round: (x: number) => number) {
    let xMin = Infinity;
    let yMin = Infinity;
    let xMax = -Infinity;
    let yMax = -Infinity;
    const noCorner = (p: PlacementType) => p.type === FurnitureType.Seat || p.type === FurnitureType.Complex;
    for (const p of grouped.filter(noCorner)) {
        const { x, y, width, height } = p.rect;
        if (x < xMin) xMin = x;
        if (y < yMin) yMin = y;
        if (x + width > xMax) xMax = x + width;
        if (y + height > yMax) yMax = y + height;
    }
    const x = round(xMin);
    const y = round(yMin);
    return {
        x,
        y,
        width: round(xMax) - x,
        height: round(yMax) - y,
        visible: grouped.length > 0,
    };
}
