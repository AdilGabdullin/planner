import { Image as KonvaImage } from "konva/lib/shapes/Image";
import { useAppDispatch, useAppSelector } from "../store";
import { place, setDrop, selectArtboard, selectFurniture, selectDrop, setStageRect } from "../slices/artboard";
import { DragEventHandler, useEffect, useRef } from "react";
import styled from "styled-components";
import { AppStage } from "./AppStage";

export function Artboard() {
    const dispatch = useAppDispatch();
    const { round } = useAppSelector(selectArtboard);
    const drop = useAppSelector(selectDrop);
    const furniture = useAppSelector(selectFurniture);
    const dropRef = useRef<KonvaImage>(null);
    const handleDragOver: DragEventHandler = (e) => {
        e.preventDefault();
        const dropImage = dropRef.current;
        const dropzone = e.target;
        if (dropImage === null || !(dropzone instanceof Element)) return;
        const boundingRect = dropzone.getBoundingClientRect();
        const layerX = e.clientX - boundingRect.x;
        const layerY = e.clientY - boundingRect.y;
        const { offset } = furniture[drop.id];
        dropImage.setAttrs({
            x: round(layerX) + offset[0],
            y: round(layerY) + offset[1],
        });
        if (!drop.visible) dispatch(setDrop({ visible: true }));
    };
    const handleDragLeave: DragEventHandler = (e) => {
        dispatch(setDrop({ visible: false }));
    };
    const handleDrop: DragEventHandler = (e) => {
        e.preventDefault();
        const dropImage = dropRef.current;
        if (dropImage === null) return;
        const { x, y } = dropImage.attrs;
        dispatch(place({ id: drop.id, x, y }));
    };
    const stageRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (stageRef.current) {
            const { x, y, width, height } = stageRef.current.getBoundingClientRect();
            dispatch(setStageRect({ x, y, width, height }));
        }
    });
    return (
        <Dropzone ref={stageRef} onDragOver={handleDragOver} onDrop={handleDrop} onDragLeave={handleDragLeave}>
            <AppStage dropRef={dropRef} />
        </Dropzone>
    );
}

const Dropzone = styled.div`
    display: table;
`;
