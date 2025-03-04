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
    completed: false,
    title: null,
    description: null,
    priority: null,
    project: null,
    labels: [],
    dueDate: null,
  },
  createTaskResponse: null,
  createTaskApiStatus: AsyncState.IDLE,
  //
  updateTaskUserData: null,
  updateTaskResponse: null,
  updateTaskApiStatus: AsyncState.IDLE,
  //
  getTaskId: null,
  getTaskResponse: null,
  getTaskApiStatus: AsyncState.IDLE,
  //
  deleteTaskResponse: null,
  deleteTaskApiStatus: AsyncState.IDLE,
  //
  searchQuery: "",
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
    //
    setGetTaskId: (state, action: PayloadAction<any>) => {
      state.getTaskId = action.payload;
    },
    updateTaskUserData: (state, action: PayloadAction<any>) => {
      const { type, value } = action.payload;
      state.updateTaskUserData[type] = value;
    },
    copyActiveTaskToLocal: (state, action: PayloadAction<any>) => {
      state.updateTaskUserData = action.payload;
    },
    resetUpdateTask: (state) => {
      state.updateTaskUserData = null;
      state.updateTaskResponse = null;
      state.updateTaskApiStatus = AsyncState.IDLE;
    },
    resetDeleteTask: (state) => {
      state.deleteTaskResponse = null;
      state.deleteTaskApiStatus = AsyncState.IDLE;
    },
    //
    handleSearchInput: (state, action: PayloadAction<string>) => {
      const normalizedQuery = action.payload?.toLowerCase()?.trim();
      state.searchQuery = normalizedQuery;
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
    //
    builder.addCase(Actions.updateTask + AsyncState.PENDING, (state) => {
      state.updateTaskApiStatus = AsyncState.PENDING;
    });
    builder.addCase(
      Actions.updateTask + AsyncState.FULFILLED,
      (state, action: PayloadAction<any>) => {
        state.updateTaskResponse = action.payload;
        state.updateTaskApiStatus = AsyncState.FULFILLED;
      }
    );
    builder.addCase(Actions.updateTask + AsyncState.REJECTED, (state) => {
      state.updateTaskApiStatus = AsyncState.REJECTED;
    });
    //
    builder.addCase(Actions.getTask + AsyncState.PENDING, (state) => {
      state.getTaskApiStatus = AsyncState.PENDING;
    });
    builder.addCase(
      Actions.getTask + AsyncState.FULFILLED,
      (state, action: PayloadAction<any>) => {
        state.getTaskResponse = action.payload;
        state.getTaskApiStatus = AsyncState.FULFILLED;
      }
    );
    builder.addCase(Actions.getTask + AsyncState.REJECTED, (state) => {
      state.getTaskApiStatus = AsyncState.REJECTED;
    });
    //
    builder.addCase(Actions.deleteTask + AsyncState.PENDING, (state) => {
      state.deleteTaskApiStatus = AsyncState.PENDING;
    });
    builder.addCase(
      Actions.deleteTask + AsyncState.FULFILLED,
      (state, action: PayloadAction<any>) => {
        state.deleteTaskResponse = action.payload;
        state.deleteTaskApiStatus = AsyncState.FULFILLED;
      }
    );
    builder.addCase(Actions.deleteTask + AsyncState.REJECTED, (state) => {
      state.deleteTaskApiStatus = AsyncState.REJECTED;
    });
  },
});

export const getAllTasks = createAction(Actions.getAllTasks);
export const createTask = createAction<TaskPayload>(Actions.createTask);
export const updateTask = createAction<any>(Actions.updateTask);
export const getTask = createAction<any>(Actions.getTask);
export const deleteTask = createAction<any>(Actions.deleteTask);

export const {
  triggerAddTaskDialog,
  triggerSearchDialog,
  triggerShowEditDialog,
  addTaskUserData,
  setGetTaskId,
  copyActiveTaskToLocal,
  updateTaskUserData,
  resetUpdateTask,
  resetDeleteTask,
  handleSearchInput,
} = slice.actions;

export const TasksReducer = slice.reducer;
