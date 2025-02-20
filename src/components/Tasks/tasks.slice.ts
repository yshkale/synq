/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  showAddNewTaskDialog: false,
};

const slice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    triggerAddTaskDialog: (state, action: PayloadAction<boolean>) => {
      state.showAddNewTaskDialog = action.payload;
    },
  },
});

export const { triggerAddTaskDialog } = slice.actions;

export const TasksReducer = slice.reducer;
