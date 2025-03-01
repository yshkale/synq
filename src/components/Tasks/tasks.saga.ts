/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, takeLatest } from "redux-saga/effects";
import { createTask, fetchTasks, TaskPayload } from "./tasks.service";
import { ActionState } from "@/helper/constants";
import { PayloadAction } from "@reduxjs/toolkit";

export const Actions = {
  getAllTasks: "get-all-tasks/",
  createTask: "create-task/",
};

function* getAllTasksSaga() {
  yield takeLatest(Actions.getAllTasks, function* (): Generator<any> {
    try {
      yield put({
        type: Actions.getAllTasks + ActionState.PENDING,
        payload: {},
      });

      const data = yield call(async () => {
        return fetchTasks();
      });

      if (!data) throw new Error();

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
  });
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

        if (!data) throw new Error();

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

export const tasksSaga = [...getAllTasksSaga(), ...createTaskSaga()];
