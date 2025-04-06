/* eslint-disable @typescript-eslint/no-explicit-any */
import { AsyncState } from "@/helper/constants";
import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Actions } from "./auth.saga";

const initialState: any = {
  //login
  loginUserData: {
    email: "",
    password: "",
  },

  loginApiResponse: null,
  loginApiStatus: AsyncState.IDLE,
  loginErrorResponse: null,

  //signup
  signupUserData: {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  },

  signupApiResponse: null,
  signupApiStatus: AsyncState.IDLE,
  signupErrorResponse: null,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: () => initialState,

    //login
    addLoginEmail: (state, action: PayloadAction<string>) => {
      state.loginUserData.email = action.payload;
    },
    addLoginPassword: (state, action: PayloadAction<string>) => {
      state.loginUserData.password = action.payload;
    },

    //signup
    addSignupName: (state, action: PayloadAction<string>) => {
      state.signupUserData.name = action.payload;
    },
    addSignupEmail: (state, action: PayloadAction<string>) => {
      state.signupUserData.email = action.payload;
    },
    addSignupPassword: (state, action: PayloadAction<string>) => {
      state.signupUserData.password = action.payload;
    },
    addSignupConfirmPassword: (state, action: PayloadAction<string>) => {
      state.signupUserData.confirmPassword = action.payload;
    },
  },
  extraReducers(builder) {
    //login builders
    builder.addCase(Actions.loginUser + AsyncState.PENDING, (state) => {
      state.loginApiStatus = AsyncState.PENDING;
    });
    builder.addCase(
      Actions.loginUser + AsyncState.FULFILLED,
      (state, action: PayloadAction<any>) => {
        state.loginApiResponse = action.payload;
        state.loginApiStatus = AsyncState.FULFILLED;
      }
    );
    builder.addCase(
      Actions.loginUser + AsyncState.REJECTED,
      (state, action: PayloadAction<any>) => {
        state.loginApiStatus = AsyncState.REJECTED;
        state.loginErrorResponse = action.payload;
      }
    );

    //signup builders
    builder.addCase(Actions.signupUser + AsyncState.PENDING, (state) => {
      state.signupApiStatus = AsyncState.PENDING;
    });
    builder.addCase(
      Actions.signupUser + AsyncState.FULFILLED,
      (state, action: PayloadAction<any>) => {
        state.signupApiResponse = action.payload;
        state.signupApiStatus = AsyncState.FULFILLED;
      }
    );
    builder.addCase(
      Actions.signupUser + AsyncState.REJECTED,
      (state, action: PayloadAction<any>) => {
        state.signupApiStatus = AsyncState.REJECTED;
        state.signupErrorResponse = action.payload;
      }
    );
  },
});

export const loginUser = createAction<any>(Actions.loginUser);
export const signupUser = createAction<any>(Actions.signupUser);

export const {
  reset,

  //login
  addLoginEmail,
  addLoginPassword,

  //signup
  addSignupEmail,
  addSignupName,
  addSignupPassword,
  addSignupConfirmPassword,
} = slice.actions;

export const AuthReducer = slice.reducer;
