/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  showAddNewTaskDialog: false,
  //
  showSearchDialog: false,
  //
  showEditDialog: false,
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
    //
    triggerShowEditDialog: (state, action: PayloadAction<boolean>) => {
      state.showEditDialog = action.payload;
    },
  },
});

export const {
  triggerAddTaskDialog,
  triggerSearchDialog,
  triggerShowEditDialog,
} = slice.actions;

export const TasksReducer = slice.reducer;
