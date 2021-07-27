import { config } from "../config";
import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";
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
    image.src = `${process.env.PUBLIC_URL}/images/${file}`;
    console.log(image.src);
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
    rotation: number;
    selected: boolean;
    rect: IRect;
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
            const { width, height, type, offset } = furniture[id];
            const [ox1, oy1, ox2, oy2] = offset;
            const r = ((rotation ?? 0) + 360) % 360;
            const rect = { x: x - ox1, y: y - oy1, width: width + ox1 + ox2, height: height + oy1 + oy2 };
            if (r === 90) {
                rect.x -= height;
                rect.width += height - width;
                rect.height += width - height;
            } else if (r === 180) {
                rect.y -= height;
                rect.x -= width;
            } else if (r === 270) {
                rect.y -= width;
                rect.width += height - width;
                rect.height += width - height;
            }
            state.placement.push({
                id,
                x: x - ox1,
                y: y - oy1,
                rotation: r,
                selected: false,
                rect,
                offset,
                type,
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
            const { x, y } = placement[notCornerId].rect;
            const dx = round(x + movementX) - x;
            const dy = round(y + movementY) - y;
            selected.forEach((id) => {
                const p = placement[id];
                p.x += dx;
                p.y += dy;
                p.rect.x += dx;
                p.rect.y += dy;
            });
        },
        rotate: (
            state,
            action: PayloadAction<{ selected: number[]; groupRect: { x: number; y: number; height: number } }>
        ) => {
            const { placement } = state;
            const { selected, groupRect } = action.payload;
            const { x: gx, y: gy, height: gh } = groupRect;
            selected.forEach((id) => {
                const p = placement[id];
                const {
                    rotation,
                    rect,
                    offset: [ox1, oy1],
                } = current(p);
                const { x: rx, y: ry, height: rh, width: rw } = rect;
                const dx = gx + gy + gh - rx - ry - rh;
                const dy = -gx + gy + rx - ry;
                p.rect.x += dx;
                p.rect.y += dy;
                p.rect.height = rw;
                p.rect.width = rh;
                p.rotation = (p.rotation + 90) % 360;
                if (rotation === 0) {
                    p.x = p.rect.x + rh - ox1 - oy1;
                    p.y = p.rect.y - oy1 + ox1;
                } else if (rotation === 90) {
                    p.x = p.rect.x + rh - ox1 - ox1;
                    p.y = p.rect.y + rw - oy1 - oy1;
                } else if (rotation === 180) {
                    p.x = p.rect.x - ox1 + oy1;
                    p.y = p.rect.y + rw - oy1 - ox1;
                } else {
                    p.x = p.rect.x;
                    p.y = p.rect.y;
                }
            });
        },
        setSelected: (state, action: PayloadAction<number[]>) => {
            const placement = current(state.placement);
            const allIds = placement.map((p, i) => i);
            const conflict = (id1: number, id2: number) => {
                const t = 4;
                const crop = ({ x, y, width, height }: IRect) => ({
                    x: x + t,
                    y: y + t,
                    width: width - 2 * t,
                    height: height - 2 * t,
                });
                return Util.haveIntersection(crop(placement[id1].rect), crop(placement[id2].rect));
            };
            const attached = (id1: number) => allIds.filter((id2) => conflict(id1, id2));
            const unique = (xs: number[]) => Array.from(new Set(xs));
            const add = (ids: number[]): number[] => {
                const result = unique(ids.flatMap(attached));
                return result.length === ids.length ? result : add(result);
            };
            const selected = add(action.payload);
            for (let id = 0; id < placement.length; id++) {
                state.placement[id].selected = selected.includes(id);
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
                const { x, y, width, height } = seat.rect;
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
export const { place, move, rotate, setSelected, setStageRect, setDrop, addMagnets, removeMagnets } = slice.actions;
// selectors
export const selectFurniture = (state: RootState) => furniture;
export const selectArtboard = (state: RootState) => artboard;
export const selectPlacement = (state: RootState) => state.artboard.placement;
export const selectStageRect = (state: RootState) => state.artboard.stageRect;
export const selectDrop = (state: RootState) => state.artboard.drop;
export const selectMagnets = (state: RootState) => state.artboard.magnets;
// reducer
export const artboardReducer = slice.reducer;
