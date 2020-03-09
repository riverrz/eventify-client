import { takeLatest, call, put, select } from "redux-saga/effects";
import cogoToast from "cogo-toast";
import config from "config/env";
import request from "lib/request";
import { makeSelectAuthToken } from "modules/Auth/redux/selectors";
import {
  fetchUserRequest,
  fetchUserSuccess,
  fetchUserError
} from "modules/Auth/redux/actions";
import { FETCH_USER_REQUEST } from "modules/Auth/redux/constants";
import { INIT_APP_STATE } from "./constants";

function* fetchUserSaga({ payload }) {
  try {
    const requestUrl = `${config.apiUrl}/auth/current`;
    const data = yield call(request, requestUrl);
    yield put(fetchUserSuccess(data));
  } catch (error) {
    cogoToast.error("That's odd :( Please log in again!");
    yield put(fetchUserError(error));
  }
}

function* initAppStateSaga({ payload }) {
  const token = yield select(makeSelectAuthToken());
  if (token) {
    yield put(fetchUserRequest());
  }
}

export default [
  takeLatest(INIT_APP_STATE, initAppStateSaga),
  takeLatest(FETCH_USER_REQUEST, fetchUserSaga)
];
