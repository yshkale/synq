/* eslint-disable @typescript-eslint/no-explicit-any */
import { AsyncState } from "@/helper/constants";
import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Actions } from "./users.saga";

const initialState: any = {
  userData: null,
  userDataApiStatus: AsyncState.IDLE,
  userDataErrorResponse: null,

  userDataLocal: {
    name: null,
    email: null,
    oldPassword: null,
    newPassword: null,
  },

  updateUserDataResponse: null,
  updateUserDataApiStatus: AsyncState.IDLE,
  updateUserDataErrorResponse: null,
};

const slice = createSlice({
  name: "users",
  initialState,
  reducers: {
    updateUserDataLocal: (state, action) => {
      const { type, value } = action.payload;
      state.userDataLocal[type] = value;
    },

    resetUserDataLocal: (state) => {
      state.userDataLocal = null;
    },
  },
  extraReducers(builder) {
    //get all tasks
    builder.addCase(Actions.getUserData + AsyncState.PENDING, (state) => {
      state.userDataApiStatus = AsyncState.PENDING;
    });
    builder.addCase(
      Actions.getUserData + AsyncState.FULFILLED,
      (state, action: PayloadAction<any>) => {
        state.userData = action.payload;
        state.userDataLocal.name = action.payload?.user?.name;
        state.userDataLocal.email = action.payload?.user?.email;
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
    builder.addCase(Actions.updateUserData + AsyncState.PENDING, (state) => {
      state.updateUserDataApiStatus = AsyncState.PENDING;
    });
    builder.addCase(
      Actions.updateUserData + AsyncState.FULFILLED,
      (state, action: PayloadAction<any>) => {
        state.updateUserDataResponse = action.payload;
        state.updateUserDataApiStatus = AsyncState.FULFILLED;
      }
    );
    builder.addCase(
      Actions.updateUserData + AsyncState.REJECTED,
      (state, action: PayloadAction<any>) => {
        state.updateUserDataApiStatus = AsyncState.REJECTED;
        state.updateUserDataErrorResponse = action.payload;
      }
    );
  },
});

export const { updateUserDataLocal, resetUserDataLocal } = slice.actions;

export const getUserData = createAction<any>(Actions.getUserData);
export const updateUserData = createAction<any>(Actions.updateUserData);

export const UsersReducer = slice.reducer;
