import { config } from "../config";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IRect } from "konva/lib/types";

// config to furniture
const toPixel = (x: number) => x * config.ppmArtboard;
const furniture = config.furniture.map((furnitureConfig) => {
    const { size, file, offset } = furnitureConfig;
    const width = toPixel(size[0]);
    const height = toPixel(size[1]);
    const image = new Image();
    image.width = width;
    image.height = height;
    image.src = `/images/${file}`;
    return {
        ...furnitureConfig,
        image,
        width,
        height,
        selectorWidth: size[0] * config.ppmSelector,
        selectorHeight: size[1] * config.ppmSelector,
        offset: (offset ?? [0, 0, 0, 0]).map(toPixel),
    };
});

// config to artboard
const width = toPixel(config.width);
const height = toPixel(config.height);
const gridStep = toPixel(config.gridStep);
const padding = toPixel(config.padding);
const round = (x: number) => Math.round((x - padding) / gridStep) * gridStep + padding;
const artboard = { width, height, gridStep, padding, round };

// slice
export interface Placement {
    id: number;
    x: number;
    y: number;
    width: number;
    height: number;
    rotation: 0 | 90 | 180 | 270;
    selected: boolean;
    offset: number[];
}
const slice = createSlice({
    name: "artboard",
    initialState: {
        placement: [] as Placement[],
        drop: {
            id: 0,
            visible: false,
        },
        stageRect: { x: 0, y: 0, width: 0, height: 0 } as IRect,
    },
    reducers: {
        place: (state, action: PayloadAction<{ id: number; x: number; y: number }>) => {
            const { id, x, y } = action.payload;
            const furn = furniture[id];
            const { offset } = furn;
            const [ox1, oy1, ox2, oy2] = offset;
            state.placement.push({
                id,
                x: x - ox1,
                y: y - oy1,
                width: furn.width + ox1 + ox2,
                height: furn.height + oy1 + oy2,
                rotation: 0,
                selected: false,
                offset,
            });
        },
        move: (state, action: PayloadAction<{ selected: number[]; movementX: number; movementY: number }>) => {
            const { selected, movementX, movementY } = action.payload;
            selected.forEach((id) => {
                const placed = state.placement[id];
                placed.x = round(placed.x + movementX);
                placed.y = round(placed.y + movementY);
            });
        },
        setSelected: (state, action: PayloadAction<number[]>) => {
            const ids = action.payload;
            for (let id = 0; id < state.placement.length; id++) {
                state.placement[id].selected = ids.includes(id);
            }
        },
        setStageRect: (state, action: PayloadAction<IRect>) => {
            state.stageRect = action.payload;
        },
        setDrop: (state, action: PayloadAction<{ id?: number; visible?: boolean }>) => {
            const { id, visible } = action.payload;
            if (id !== undefined) state.drop.id = id;
            if (visible !== undefined) state.drop.visible = visible;
        },
    },
});

// actions
export const { place, move, setSelected, setStageRect, setDrop } = slice.actions;
// selectors
export const selectFurniture = (state: RootState) => furniture;
export const selectArtboard = (state: RootState) => artboard;
export const selectPlacement = (state: RootState) => state.artboard.placement;
export const selectStageRect = (state: RootState) => state.artboard.stageRect;
export const selectDrop = (state: RootState) => state.artboard.drop;
// reducer
export const artboardReducer = slice.reducer; 
