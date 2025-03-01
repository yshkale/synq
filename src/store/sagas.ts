import { all } from "redux-saga/effects";
import { authSagas } from "./Auth/auth.saga";
import { tasksSaga } from "@/components/Tasks/tasks.saga";

export function* rootSaga() {
  // Add new Sagas here
  yield all([...authSagas, ...tasksSaga]);
}
