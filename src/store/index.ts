/* eslint-disable @typescript-eslint/no-explicit-any */
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import { rootSaga } from "./sagas";
import { AuthReducer } from "./Auth/auth.slice";
import { TasksReducer } from "@/components/Tasks/tasks.slice";
import { UsersReducer } from "./User/users.slice";

const sagaMiddleware = createSagaMiddleware();

// Combine multiple reducers using combineReducers - Add new reducers here
const rootReducer = combineReducers({
  auth: AuthReducer,
  tasks: TasksReducer,
  users: UsersReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: ((getDefaultMiddleware: any) =>
    getDefaultMiddleware().concat(sagaMiddleware)) as any,
  devTools: true,
});

sagaMiddleware.run(rootSaga);
