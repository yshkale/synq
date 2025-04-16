/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, takeLatest } from "redux-saga/effects";
import { ActionState } from "@/helper/constants";
import { fetchUserData, updateUserData } from "./users.service";
import { PayloadAction } from "@reduxjs/toolkit";

export const Actions = {
  getUserData: "get-user-data/",
  updateUserData: "update-user-data/",
};

function* getUserDataSaga() {
  yield takeLatest(Actions.getUserData, function* (): Generator<any> {
    try {
      yield put({
        type: Actions.getUserData + ActionState.PENDING,
        payload: {},
      });

      const data = yield call(async () => {
        return fetchUserData();
      });

      yield put({
        type: Actions.getUserData + ActionState.FULFILLED,
        payload: data,
      });
    } catch (err) {
      yield put({
        type: Actions.getUserData + ActionState.REJECTED,
        payload: err,
      });
    }
  });
}

function* updateUserDataSaga() {
  yield takeLatest(
    Actions.updateUserData,
    function* (action: PayloadAction<any>): Generator<any> {
      const { userId, userData } = action.payload;
      try {
        yield put({
          type: Actions.updateUserData + ActionState.PENDING,
          payload: {},
        });

        const data = yield call(async () => {
          return updateUserData(userId, userData);
        });

        yield put({
          type: Actions.updateUserData + ActionState.FULFILLED,
          payload: data,
        });
      } catch (err) {
        yield put({
          type: Actions.updateUserData + ActionState.REJECTED,
          payload: err,
        });
      }
    }
  );
}

export const usersSaga = [...getUserDataSaga(), ...updateUserDataSaga()];
