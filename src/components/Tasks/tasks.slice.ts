/* eslint-disable @typescript-eslint/no-explicit-any */
import { AsyncState } from "@/helper/constants";
import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Actions } from "./tasks.saga";
import { TaskPayload } from "./tasks.service";

const initialState: any = {
  showAddNewTaskDialog: false,
  //
  showSearchDialog: false,
  //
  showEditDialog: false,
  //
  allTasks: null,
  tasksApiStatus: AsyncState.IDLE,
  //
  createTaskUserData: {
    title: null,
    description: null,
    priority: null,
    project: null,
    labels: [],
    dueDate: null,
  },
  createTaskResponse: null,
  createTaskApiStatus: AsyncState.IDLE,
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
    //
    addTaskUserData: (state, action: PayloadAction<any>) => {
      const { type, value } = action.payload;
      state.createTaskUserData[type] = value;
    },
  },
  extraReducers(builder) {
    //get all tasks
    builder.addCase(Actions.getAllTasks + AsyncState.PENDING, (state) => {
      state.tasksApiStatus = AsyncState.PENDING;
    });
    builder.addCase(
      Actions.getAllTasks + AsyncState.FULFILLED,
      (state, action: PayloadAction<any>) => {
        state.allTasks = action.payload;
        state.tasksApiStatus = AsyncState.FULFILLED;
      }
    );
    builder.addCase(Actions.getAllTasks + AsyncState.REJECTED, (state) => {
      state.tasksApiStatus = AsyncState.REJECTED;
    });
    //
    //create task
    builder.addCase(Actions.createTask + AsyncState.PENDING, (state) => {
      state.createTaskApiStatus = AsyncState.PENDING;
    });
    builder.addCase(
      Actions.createTask + AsyncState.FULFILLED,
      (state, action: PayloadAction<TaskPayload>) => {
        state.createTaskResponse = action.payload;
        state.createTaskApiStatus = AsyncState.FULFILLED;
      }
    );
    builder.addCase(Actions.createTask + AsyncState.REJECTED, (state) => {
      state.createTaskApiStatus = AsyncState.REJECTED;
    });
  },
});

export const getAllTasks = createAction(Actions.getAllTasks);
export const createTask = createAction<TaskPayload>(Actions.createTask);

export const {
  triggerAddTaskDialog,
  triggerSearchDialog,
  triggerShowEditDialog,
  addTaskUserData,
} = slice.actions;

export const TasksReducer = slice.reducer;
