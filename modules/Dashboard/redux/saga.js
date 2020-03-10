import { takeEvery, call, put } from "redux-saga/effects";
import cogoToast from "cogo-toast";
import * as actionTypes from "./constants";
import config from "config/env";
import request from "lib/request";
import { createEventSuccess, createEventError } from "./actions";

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

export default [takeEvery(actionTypes.CREATE_EVENT_REQUEST, createEventSaga)];
