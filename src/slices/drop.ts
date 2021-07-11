import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type UpdateAction = PayloadAction<{
  id: number;
  width: number;
  height: number;
  offset: number[];
}>;

const slice = createSlice({
  name: "drop",
  initialState: {
    id: 0,
    width: 0,
    height: 0,
    offset: [0, 0, 0, 0],
  },
  reducers: {
    updateDrop: (state, action: UpdateAction) => {
      return action.payload;
    },
  },
});

export const { updateDrop } = slice.actions;
export const selectDrop = (state: RootState) => state.drop;
export const dropReducer = slice.reducer;
