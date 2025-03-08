/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, takeLatest } from "redux-saga/effects";
import {
  createTask,
  deleteTask,
  fetchTasks,
  getTask,
  TaskPayload,
  updateTask,
} from "./tasks.service";
import { ActionState } from "@/helper/constants";
import { PayloadAction } from "@reduxjs/toolkit";

export const Actions = {
  getAllTasks: "get-all-tasks/",
  createTask: "create-task/",
  updateTask: "update-task/",
  getTask: "get-task/",
  deleteTask: "delete-task/",
};

function* getAllTasksSaga() {
  yield takeLatest(
    Actions.getAllTasks,
    function* (action: PayloadAction<any>): Generator<any> {
      try {
        yield put({
          type: Actions.getAllTasks + ActionState.PENDING,
          payload: {},
        });

        const data = yield call(async () => {
          return fetchTasks(action.payload);
        });

        yield put({
          type: Actions.getAllTasks + ActionState.FULFILLED,
          payload: data,
        });
      } catch (err) {
        yield put({
          type: Actions.getAllTasks + ActionState.REJECTED,
          payload: err,
        });
      }
    }
  );
}

function* createTaskSaga() {
  yield takeLatest(
    Actions.createTask,
    function* (action: PayloadAction<TaskPayload>): Generator<any> {
      try {
        yield put({
          type: Actions.createTask + ActionState.PENDING,
          payload: {},
        });

        const data = yield call(async () => {
          return createTask(action.payload);
        });

        yield put({
          type: Actions.createTask + ActionState.FULFILLED,
          payload: data,
        });
      } catch (err) {
        yield put({
          type: Actions.createTask + ActionState.REJECTED,
          payload: err,
        });
      }
    }
  );
}

function* updateTaskSaga() {
  yield takeLatest(
    Actions.updateTask,
    function* (action: PayloadAction<any>): Generator<any> {
      try {
        yield put({
          type: Actions.updateTask + ActionState.PENDING,
          payload: {},
        });

        const data = yield call(async () => {
          return updateTask(action.payload);
        });

        yield put({
          type: Actions.updateTask + ActionState.FULFILLED,
          payload: data,
        });
      } catch (err) {
        yield put({
          type: Actions.updateTask + ActionState.REJECTED,
          payload: err,
        });
      }
    }
  );
}

function* getTaskSaga() {
  yield takeLatest(
    Actions.getTask,
    function* (action: PayloadAction<any>): Generator<any> {
      try {
        yield put({
          type: Actions.getTask + ActionState.PENDING,
          payload: {},
        });

        const data = yield call(async () => {
          return getTask(action.payload);
        });

        yield put({
          type: Actions.getTask + ActionState.FULFILLED,
          payload: data,
        });
      } catch (err) {
        yield put({
          type: Actions.getTask + ActionState.REJECTED,
          payload: err,
        });
      }
    }
  );
}

function* deleteTaskSaga() {
  yield takeLatest(
    Actions.deleteTask,
    function* (action: PayloadAction<any>): Generator<any> {
      try {
        yield put({
          type: Actions.deleteTask + ActionState.PENDING,
          payload: {},
        });

        const data = yield call(async () => {
          return deleteTask(action.payload);
        });

        yield put({
          type: Actions.deleteTask + ActionState.FULFILLED,
          payload: data,
        });
      } catch (err) {
        yield put({
          type: Actions.deleteTask + ActionState.REJECTED,
          payload: err,
        });
      }
    }
  );
}

export const tasksSaga = [
  ...getAllTasksSaga(),
  ...createTaskSaga(),
  ...updateTaskSaga(),
  ...getTaskSaga(),
  ...deleteTaskSaga(),
];
