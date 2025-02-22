/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  showAddNewTaskDialog: false,
  //
  showSearchDialog: false,
};

const slice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    triggerAddTaskDialog: (state, action: PayloadAction<boolean>) => {
      state.showAddNewTaskDialog = action.payload;
    },
    //
    triggerSearchDialog: (state, action: PayloadAction<boolean>) => {
      state.showSearchDialog = action.payload;
    },
  },
});

export const { triggerAddTaskDialog, triggerSearchDialog } = slice.actions;

export const TasksReducer = slice.reducer;
