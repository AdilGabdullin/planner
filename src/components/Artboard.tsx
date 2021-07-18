import { Image as KonvaImage } from "konva/lib/shapes/Image";
import { useAppDispatch, useAppSelector } from "../store";
import { place, setDrop, selectArtboard, selectFurniture, selectDrop, setStageRect } from "../slices/artboard";
import { DragEventHandler, useEffect, useRef } from "react";
import styled from "styled-components";
import { AppStage } from "./AppStage";

export function Artboard() {
    const dispatch = useAppDispatch();
    const { round, padding } = useAppSelector(selectArtboard);
    const stageRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (stageRef.current) {
            const { x, y, width, height } = stageRef.current.getBoundingClientRect();
            dispatch(setStageRect({ x, y, width, height }));
        }
    });
    const drop = useAppSelector(selectDrop);
    const furniture = useAppSelector(selectFurniture);
    const dropRef = useRef<KonvaImage>(null);
    const dispatchVisible = (visible: boolean) => {
        if (drop.visible !== visible) dispatch(setDrop({ visible }));
    };
    const handleDragOver: DragEventHandler = (e) => {
        e.preventDefault();
        const dropImage = dropRef.current;
        const dropzone = e.target;
        if (dropImage === null || !(dropzone instanceof Element)) {
            dispatchVisible(true);
            return;
        }
        const boundingRect = dropzone.getBoundingClientRect();
        const { x, y, width, height } = boundingRect;
        const dropWidth = furniture[drop.id].width;
        const dropHeight = furniture[drop.id].height;
        const { offset } = furniture[drop.id];
        const [ox1, oy1, ox2, oy2] = offset;
        const layerX = toRange(e.clientX - x, [padding, width - padding - dropWidth - ox1 - ox2]);
        const layerY = toRange(e.clientY - y, [padding, height - padding - dropHeight - oy1 - oy2]);
        dropImage.setAttrs({
            x: round(layerX) + ox1,
            y: round(layerY) + oy1,
        });
    };
    const handleDragLeave: DragEventHandler = (e) => {
        dispatchVisible(false);
    };
    const handleDrop: DragEventHandler = (e) => {
        e.preventDefault();
        const dropImage = dropRef.current;
        if (dropImage === null) return;
        const { x, y } = dropImage.attrs;
        dispatch(place({ id: drop.id, x, y }));
    };
    return (
        <Dropzone ref={stageRef} onDragOver={handleDragOver} onDrop={handleDrop} onDragLeave={handleDragLeave}>
            <AppStage dropRef={dropRef} />
        </Dropzone>
    );
}

function toRange(x: number, [min, max]: number[]) {
    if (x < min) return min;
    if (x > max) return max;
    return x;
}

const Dropzone = styled.div`
    display: table;
`;
