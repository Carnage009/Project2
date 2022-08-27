import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
  };

  const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess(state, action) {
        state.user = action.payload.user
      },
    },
  });

  export const { loginSuccess } = authSlice.actions;

export default authSlice.reducer;