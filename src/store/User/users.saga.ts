/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, takeLatest } from "redux-saga/effects";
import { ActionState } from "@/helper/constants";
import { fetchUserData } from "./users.service";

export const Actions = {
  getUserData: "get-user-data/",
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

export const usersSaga = [...getUserDataSaga()];
