import { all } from "redux-saga/effects";
import { authSagas } from "./Auth/auth.saga";

export function* rootSaga() {
  // Add new Sagas here
  yield all([...authSagas]);
}
