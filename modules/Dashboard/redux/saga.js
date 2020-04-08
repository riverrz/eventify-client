import { takeEvery, call, put, takeLatest } from "redux-saga/effects";
import { isEmpty, path } from "ramda";
import cogoToast from "cogo-toast";
import {
  CREATE_EVENT_REQUEST,
  FETCH_ALL_EVENTS_REQUEST,
  FETCH_MODULES_REQUEST,
} from "./constants";
import {
  FETCH_USER_SUCCESS,
  SIGNUP_SUCCESS,
} from "modules/Auth/redux/constants";
import config from "config/env";
import request from "lib/request";
import {
  getPresignedPostData,
  uploadFileToS3,
} from "modules/Dashboard/helpers/upload";
import {
  createEventSuccess,
  createEventError,
  fetchAllEventsSuccess,
  fetchAllEventsError,
  fetchModulesSuccess,
  fetchModulesError,
} from "./actions";

function* uploadBanner(banner) {
  try {
    const { data: presignedPostData } = yield getPresignedPostData(banner);
    const { file } = banner.src;
    yield uploadFileToS3(presignedPostData, file);
    return presignedPostData;
  } catch (e) {
    yield cogoToast.error(
      "We had trouble uploading the banner. Please try via editing the event!"
    );
  }
}

function* createEventSaga({ payload }) {
  try {
    const { banner, ...rest } = payload;
    let presignedPostData = {};
    try {
      if (banner && !isEmpty(banner)) {
        presignedPostData = yield* uploadBanner(banner);
      }
    } catch (error) {
      console.log(error.message);
    }
    const requestUrl = `${config.apiUrl}/event/`;
    const bannerKey = path(["fields", "key"], presignedPostData);
    if (bannerKey) {
      rest.banner = bannerKey;
    }
    const data = yield call(request, requestUrl, {
      method: "POST",
      body: JSON.stringify(rest),
    });
    cogoToast.success("Your event has been successfully created!");
    yield put(createEventSuccess(data));
    yield* fetchAllEventsSaga();
  } catch (error) {
    cogoToast.error(`Oops.. ${error.message}`);
    yield put(createEventError(error));
  }
}

function* fetchAllEventsSaga() {
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

function* fetchModulesSaga() {
  try {
    const requestUrl = `${config.apiUrl}/event/modules`;
    const data = yield call(request, requestUrl);
    yield put(fetchModulesSuccess(data));
  } catch (error) {
    cogoToast.error("Error occurred while fetching modules. Please try again!");
    yield put(fetchModulesError());
  }
}

export default [
  takeEvery(CREATE_EVENT_REQUEST, createEventSaga),
  takeLatest(
    [FETCH_ALL_EVENTS_REQUEST, FETCH_USER_SUCCESS, SIGNUP_SUCCESS],
    fetchAllEventsSaga
  ),
  takeLatest(FETCH_MODULES_REQUEST, fetchModulesSaga),
];
