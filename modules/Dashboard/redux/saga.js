import { takeEvery, call, put, takeLatest } from "redux-saga/effects";
import cogoToast from "cogo-toast";
import { CREATE_EVENT_REQUEST, FETCH_ALL_EVENTS_REQUEST } from "./constants";
import {
  FETCH_USER_SUCCESS,
  SIGNUP_SUCCESS
} from "modules/Auth/redux/constants";
import config from "config/env";
import request from "lib/request";
import {
  createEventSuccess,
  createEventError,
  fetchAllEventsSuccess,
  fetchAllEventsError
} from "./actions";

function* createEventSaga({ payload }) {
  try {
    const requestUrl = `${config.apiUrl}/event/`;
    const data = yield call(request, requestUrl, {
      method: "POST",
      body: JSON.stringify(payload)
    });
    cogoToast.success("Your event has been successfully created!");
    yield put(createEventSuccess(data));
  } catch (error) {
    cogoToast.error(`Oops.. ${error.message}`);
    yield put(createEventError(error));
  }
}

function* fetchAllEventsSaga({ payload }) {
  try {
    const requestUrl = `${config.apiUrl}/event/all`;
    const data = yield call(request, requestUrl);
    yield put(fetchAllEventsSuccess(data));
  } catch (error) {
    cogoToast.error(
      `Oops.. We were not able to find your latest events. Please try again later!`
    );
    yield put(fetchAllEventsError(error));
  }
}

export default [
  takeEvery(CREATE_EVENT_REQUEST, createEventSaga),
  takeLatest(
    [FETCH_ALL_EVENTS_REQUEST, FETCH_USER_SUCCESS, SIGNUP_SUCCESS],
    fetchAllEventsSaga
  )
];
