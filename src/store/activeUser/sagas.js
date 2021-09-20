import { call, put, takeLatest } from "@redux-saga/core/effects";
import { register, logout, login, getActiveUser, setActiveUser, setToken } from "./slice";
import authService from "../../services/AuthService";

function* loginHandler(action) {
  try {
    const { token, user } = yield call(authService.login, action.payload);
    
    yield put(setActiveUser(user));
    yield put(setToken(token));
  } catch (error) {
    console.log(error);
  }
}

function* logoutHandler() {
  yield call(authService.logout);

  yield put(setActiveUser(null));
  yield put(setToken(null));
}

function* getActiveUserHandler() {
  try {
    const activeUser = yield call(authService.getActiveUser);
  
    yield put(setActiveUser(activeUser))
  } catch (error) {
    console.log(error);
  }
}

function* registerHandler(action) {
  try {
    const { token, user } = yield call(authService.register, action.payload);
    
    yield put(setActiveUser(user));
    yield put(setToken(token));
  } catch (error) {
    console.log(error);
  }
}

export function* watchLoging() {
  yield takeLatest(login.type, loginHandler);
}

export function* watchLogout() {
  yield takeLatest(logout.type, logoutHandler);
}

export function* watchGetActiveUser() {
  yield takeLatest(getActiveUser.type, getActiveUserHandler);
}

export function* watchRegister() {
  yield takeLatest(register.type, registerHandler);
}