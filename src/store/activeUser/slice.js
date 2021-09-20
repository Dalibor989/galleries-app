import { createSlice } from "@reduxjs/toolkit";

const middlewareActions = {
  login() {},
  logout() {},
  getActiveUser() {},
  register() {},
}

const activeUserSlice = createSlice({
  name: "activeUser",
  initialState: {
    token: localStorage.getItem('token'),
    user: null,
    loginError: false,
  },
  reducers: {
    setActiveUser(state, action) {
      state.user = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    ...middlewareActions,
  },
});

export const { register, login, logout, setToken, setActiveUser, getActiveUser } = activeUserSlice.actions;

export default activeUserSlice.reducer;