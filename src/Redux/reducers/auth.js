import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userDetailsAfterLogin: {},
  userDetailsAfterValidation: {},
  outeltDetails: {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveLoginData: (state, action) => {
      state.userDetailsAfterLogin = action.payload;
    },
    saveValidateData: (state, action) => {
      state.userDetailsAfterValidation = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { saveLoginData, saveValidateData } = authSlice.actions;

export default authSlice.reducer;
