import { Image as KonvaImage } from "konva/lib/shapes/Image";
import { useAppDispatch, useAppSelector } from "../store";
import {
    place,
    setDrop,
    selectArtboard,
    selectFurniture,
    selectDrop,
    setStageRect,
    selectStageRect,
    selectMagnets,
    Magnet,
} from "../slices/artboard";
import { DragEventHandler, useEffect, useRef } from "react";
import styled from "styled-components";
import { AppStage } from "./AppStage";
import { FurnitureType } from "../config";

export function Artboard() {
    const dispatch = useAppDispatch();
    const { round, padding } = useAppSelector(selectArtboard);
    const stageRef = useRef<HTMLDivElement>(null);
    const stageRect = useAppSelector(selectStageRect);
    const drop = useAppSelector(selectDrop);
    const { type } = drop;
    const typeSeatOrComplex = type === FurnitureType.Seat || type === FurnitureType.Complex;
    const typeCorner = type === FurnitureType.LeftCorner || type === FurnitureType.RightCorner;
    const furniture = useAppSelector(selectFurniture);
    const dropRef = useRef<KonvaImage>(null);
    const magnets = useAppSelector(selectMagnets);
    const dispatchVisible = (visible: boolean) => {
        if (drop.visible !== visible) dispatch(setDrop({ visible }));
    };
    useEffect(() => {
        if (stageRef.current === null) return;
        const { x, y, width, height } = stageRef.current.getBoundingClientRect();
        if (stageRect.x === x && stageRect.width === width) return;
        dispatch(setStageRect({ x, y, width, height }));
    });
    const onDragOver: DragEventHandler = (e) => {
        e.preventDefault();
        const dropImage = dropRef.current;
        const dropzone = e.target;
        if (dropImage === null || !(dropzone instanceof Element)) {
            dispatchVisible(true);
            return;
        }
        const { x, y, width, height } = dropzone.getBoundingClientRect();
        const layerX = e.clientX - x;
        const layerY = e.clientY - y;
        const dropWidth = furniture[drop.id].width;
        const dropHeight = furniture[drop.id].height;
        if (typeSeatOrComplex) {
            const { offset } = furniture[drop.id];
            const [ox1, oy1, ox2, oy2] = offset;
            // mutate ref object
            const x = round(toRange(layerX, [padding, width - padding - dropWidth - ox1 - ox2])) + ox1;
            const y = round(toRange(layerY, [padding, height - padding - dropHeight - oy1 - oy2])) + oy1;
            dropImage.setAttrs({
                x,
                y,
                visible: true,
                opacity: 0.7,
                fill: drop.possible(x, y) ? undefined : "rgb(255,0,0,0.5)",
            });
            return;
        }
        const nearest = getNearestMagnet(layerX, layerY, magnets);
        if (nearest === undefined) {
            // mutate ref object
            dropImage.setAttrs({ visible: false });
            return;
        }
        if (type === FurnitureType.LeftCorner) {
            const { x, y, rotation } = nearest;
            // mutate ref object
            dropImage.setAttrs({
                x: x + cos(rotation - 135) * 12 * Math.SQRT2,
                y: y + sin(rotation - 135) * 12 * Math.SQRT2,
                visible: true,
                rotation,
            });
            return;
        }
        if (type === FurnitureType.RightCorner) {
            const { x, y, rotation } = nearest;
            // mutate ref object
            dropImage.setAttrs({
                x: x + cos(rotation - 135) * 12 * Math.SQRT2 + sin(-rotation) * dropWidth,
                y: y + sin(rotation - 135) * 12 * Math.SQRT2 + cos(-rotation) * dropWidth,
                visible: true,
                rotation: rotation - 90,
            });
            return;
        }
    };
    const onDragLeave: DragEventHandler = (e) => {
        dispatchVisible(false);
    };
    const onDrop: DragEventHandler = (e) => {
        e.preventDefault();
        const dropImage = dropRef.current;
        if (dropImage === null) return;
        const { x, y, rotation, visible } = dropImage.attrs;
        if ((typeSeatOrComplex && drop.possible(x, y)) || (typeCorner && visible)) {
            dispatch(place({ id: drop.id, x, y, rotation }));
        }
    };
    return (
        <Dropzone ref={stageRef} onDragOver={onDragOver} onDrop={onDrop} onDragLeave={onDragLeave}>
            <AppStage dropRef={dropRef} />
        </Dropzone>
    );
}

function toRange(x: number, [min, max]: number[]) {
    if (x < min) return min;
    if (x > max) return max;
    return x;
}

const deg2rad = Math.PI / 180;

function cos(x: number) {
    return Math.cos(x * deg2rad);
}

function sin(x: number) {
    return Math.sin(x * deg2rad);
}

function getNearestMagnet(layerX: number, layerY: number, magnets: Magnet[]): Magnet | undefined {
    const threshold = 100;
    const distances = magnets.map((m) => {
        const dx = layerX - m.x;
        const dy = layerY - m.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < threshold ? distance : Infinity;
    });
    const nearestI = distances.reduce((minI, value, i): number => (distances[minI] > value ? i : minI), 0);
    return distances[nearestI] === Infinity ? undefined : magnets[nearestI];
}
const Dropzone = styled.div`
    display: table;
`;
