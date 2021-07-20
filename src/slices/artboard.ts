import { config } from "../config";
import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IRect } from "konva/lib/types";
import { FurnitureType } from "../config";
import { Util } from "konva/lib/Util";

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
    rotation: number;
    selected: boolean;
    offset: number[];
    type: FurnitureType;
}
export interface Magnet {
    x: number;
    y: number;
    rotation: number;
}
const slice = createSlice({
    name: "artboard",
    initialState: {
        placement: [] as Placement[],
        drop: {
            id: 0,
            visible: false,
            type: FurnitureType.Seat,
        },
        stageRect: { x: 0, y: 0, width: 0, height: 0 } as IRect,
        magnets: [] as Magnet[],
    },
    reducers: {
        place: (state, action: PayloadAction<{ id: number; x: number; y: number; rotation?: number }>) => {
            const { id, x, y, rotation } = action.payload;
            const furn = furniture[id];
            const { offset } = furn;
            const [ox1, oy1, ox2, oy2] = offset;
            state.placement.push({
                id,
                x: x - ox1,
                y: y - oy1,
                rotation: rotation ?? 0,
                selected: false,
                width: furn.width + ox1 + ox2,
                height: furn.height + oy1 + oy2,
                offset,
                type: furn.type,
            });
        },
        move: (state, action: PayloadAction<{ selected: number[]; movementX: number; movementY: number }>) => {
            const { placement } = state;
            const { selected, movementX, movementY } = action.payload;
            const notCornerId = selected.find((id) => {
                const type = placement[id].type;
                return type === FurnitureType.Seat || type === FurnitureType.Complex;
            });
            if (notCornerId === undefined) return state;
            const { x, y } = placement[notCornerId];
            const dx = round(x + movementX) - x;
            const dy = round(y + movementY) - y;
            selected.forEach((id) => {
                const p = placement[id];
                p.x += dx;
                p.y += dy;
            });
        },
        setSelected: (state, action: PayloadAction<number[]>) => {
            const { placement } = state;
            // const conflict = (p1: Placement, p2: Placement) => {
            //     const result = Util.haveIntersection(current(p1), current(p2));
            //     console.log(current(p1), current(p2), result);
            //     return result;
            // };
            // const attached = (id: number) => {
            //     const result = placement.filter((p) => conflict(placement[id], p));
            //     // console.log(id, result);
            //     return result;
            // };
            // function addAttached(ids: number[]) {
            //     return [...ids, ...ids.flatMap(attached)];
            // }
            // const ids = addAttached(action.payload);
            const ids = action.payload;
            for (let id = 0; id < placement.length; id++) {
                placement[id].selected = ids.includes(id);
            }
        },
        setStageRect: (state, action: PayloadAction<IRect>) => {
            state.stageRect = action.payload;
        },
        setDrop: (state, action: PayloadAction<{ id?: number; visible?: boolean }>) => {
            const { id, visible } = action.payload;
            if (id !== undefined) {
                state.drop.id = id;
                state.drop.type = furniture[id].type;
            }
            if (visible !== undefined) state.drop.visible = visible;
        },
        addMagnets: (state) => {
            const seats = state.placement.filter((p) => p.type === FurnitureType.Seat);
            seats.forEach((seat) => {
                const { x, y, width, height } = seat;
                state.magnets.push(
                    { x, y, rotation: 0 },
                    { x: x + width, y, rotation: 90 },
                    { x: x + width, y: y + height, rotation: 180 },
                    { x, y: y + height, rotation: 270 }
                );
            });
        },
        removeMagnets: (state) => {
            state.magnets = [];
        },
    },
});

// actions
export const { place, move, setSelected, setStageRect, setDrop, addMagnets, removeMagnets } = slice.actions;
// selectors
export const selectFurniture = (state: RootState) => furniture;
export const selectArtboard = (state: RootState) => artboard;
export const selectPlacement = (state: RootState) => state.artboard.placement;
export const selectStageRect = (state: RootState) => state.artboard.stageRect;
export const selectDrop = (state: RootState) => state.artboard.drop;
export const selectMagnets = (state: RootState) => state.artboard.magnets;
// reducer
export const artboardReducer = slice.reducer;
