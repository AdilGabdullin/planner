import {
    move,
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
import { Placement as PlacementType } from "../slices/artboard";

type KEO = KonvaEventObject<globalThis.DragEvent>;

export function Placement({ rectMode }: { rectMode: boolean }) {
    const dispatch = useDispatch();
    const { padding, round } = useAppSelector(selectArtboard);
    const furniture = useAppSelector(selectFurniture);
    const placement = useAppSelector(selectPlacement);
    const stageRect = useAppSelector(selectStageRect);
    const [start, setStart] = useState({ x: 0, y: 0 });
    const grouped = placement.filter((p) => p.selected);
    const {
        groupRect,
        offset: { ox1, oy1 },
    } = getGroupRectOffset(grouped, round);
    const groupWidth = groupRect.width;
    const groupHeight = groupRect.height;
    const xRange = [
        stageRect.x + ox1 + padding - start.x - 1,
        stageRect.x + stageRect.width + ox1 - groupWidth - padding - start.x - 1,
    ];
    const yRange = [oy1 + padding - start.y - 1, stageRect.height + oy1 - groupHeight - padding - start.y - 1];
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
        const selected: number[] = [];
        placement.forEach((p, i) => {
            if (p.selected) selected.push(i);
        });
        const { x, y } = e.target.getClientRect();
        dispatch(move({ selected, movementX: x - start.x, movementY: y - start.y }));
        dispatch(setSelected([]));
        dispatch(setSelected(selected));
    };
    const handleMouseEnter = (id: number) => (e: KEO) => {
        if (!rectMode) dispatch(setSelected([id]));
    };
    return (
        <>
            {placement.map(({ id, x, y, rotation, selected }, key) => {
                if (selected && !rectMode) return null;
                const offset = furniture[id].offset;
                return (
                    <Image
                        {...{ key, x: x + offset[0], y: y + offset[1], rotation }}
                        image={furniture[id].image}
                        onMouseEnter={handleMouseEnter(key)}
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

function getGroupRectOffset(grouped: PlacementType[], round: (x: number) => number) {
    let xMin = Infinity;
    let yMin = Infinity;
    let xMax = -Infinity;
    let yMax = -Infinity;
    let res = {
        ox1: 0,
        oy1: 0,
    };
    for (const p of grouped) {
        const { x, y, width, height, offset } = p;
        const [ox1, oy1] = offset;
        if (x < xMin || x + ox1 < xMin + res.ox1) {
            xMin = x;
            res.ox1 = ox1;
        }
        if (y < yMin || y + oy1 < yMin + res.oy1) {
            yMin = y;
            res.oy1 = oy1;
        }
        if (x + width > xMax) {
            xMax = x + width;
        }
        if (y + height > yMax) {
            yMax = y + height;
        }
    }
    const x = round(xMin);
    const y = round(yMin);
    return {
        groupRect: {
            x,
            y,
            width: round(xMax) - x,
            height: round(yMax) - y,
            visible: grouped.length > 0,
        },
        offset: res,
    };
}
