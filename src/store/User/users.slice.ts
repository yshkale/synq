/* eslint-disable @typescript-eslint/no-explicit-any */
import { AsyncState } from "@/helper/constants";
import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Actions } from "./users.saga";

const initialState: any = {
  userData: null,
  userDataApiStatus: AsyncState.IDLE,
  userDataErrorResponse: null,
};

const slice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    //get all tasks
    builder.addCase(Actions.getUserData + AsyncState.PENDING, (state) => {
      state.userDataApiStatus = AsyncState.PENDING;
    });
    builder.addCase(
      Actions.getUserData + AsyncState.FULFILLED,
      (state, action: PayloadAction<any>) => {
        state.userData = action.payload;
        state.userDataApiStatus = AsyncState.FULFILLED;
      }
    );
    builder.addCase(
      Actions.getUserData + AsyncState.REJECTED,
      (state, action: PayloadAction<any>) => {
        state.userDataApiStatus = AsyncState.REJECTED;
        state.userDataErrorResponse = action.payload;
      }
    );
    //
  },
});

export const getUserData = createAction<any>(Actions.getUserData);

export const UsersReducer = slice.reducer;
