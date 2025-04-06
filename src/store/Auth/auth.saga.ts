/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActionState } from "@/helper/constants";
import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  LoginPayload,
  loginUser,
  SignupPayload,
  signupUser,
} from "./auth.service";

export const Actions = {
  loginUser: "login-user/",
  signupUser: "signup-user/",
};

function* loginUserSaga() {
  yield takeLatest(
    Actions.loginUser,
    function* (action: PayloadAction<LoginPayload>): Generator<any> {
      try {
        yield put({
          type: Actions.loginUser + ActionState.PENDING,
          payload: {},
        });

        const data = yield call(async () => {
          return loginUser(action.payload);
        });

        if (!data) throw new Error();
        if (!data.token) throw new Error("Missing token!");

        yield put({
          type: Actions.loginUser + ActionState.FULFILLED,
          payload: data,
        });
      } catch (err) {
        yield put({
          type: Actions.loginUser + ActionState.REJECTED,
          payload: {
            message:
              err instanceof Error
                ? err.message
                : "Unknown error occurred. Please try again later!",
          },
        });
      }
    }
  );
}

function* signupUserSaga() {
  yield takeLatest(
    Actions.signupUser,
    function* (action: PayloadAction<SignupPayload>): Generator<any> {
      try {
        yield put({
          type: Actions.signupUser + ActionState.PENDING,
          payload: {},
        });

        const data = yield call(async () => {
          return signupUser(action.payload);
        });

        if (!data) throw new Error();

        yield put({
          type: Actions.signupUser + ActionState.FULFILLED,
          payload: data,
        });
      } catch (err) {
        yield put({
          type: Actions.signupUser + ActionState.REJECTED,
          payload: {
            message:
              err instanceof Error
                ? err.message
                : "Something went wrong. Please try again later!",
          },
        });
      }
    }
  );
}

export const authSagas = [...loginUserSaga(), ...signupUserSaga()];
