import { takeEvery, call, put, takeLatest } from "redux-saga/effects";
import cogoToast from "cogo-toast";
import * as actionTypes from "./constants";
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
    yield put(fetchAllEventsError(error));
  }
}

export default [
  takeEvery(actionTypes.CREATE_EVENT_REQUEST, createEventSaga),
  takeLatest(actionTypes.FETCH_ALL_EVENTS_REQUEST, fetchAllEventsSaga)
];
