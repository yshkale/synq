/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  //login
  loginUserData: {
    email: "",
    password: "",
  },

  //signup
  signupUserData: {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  },
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
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
});

export const {
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
