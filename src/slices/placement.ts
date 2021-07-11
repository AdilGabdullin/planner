import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface Placement {
  x: number;
  y: number;
  rotation: 0 | 90 | 180 | 270;
  id: number;
}

const slice = createSlice({
  name: "placement",
  initialState: [] as Placement[],
  reducers: {
    place: (state, action: PayloadAction<Placement>) => {
      state.push(action.payload);
    },
  },
});

export const { place } = slice.actions;
export const selectPlacement = (state: RootState) => state.placement;
export const placementReducer = slice.reducer;
