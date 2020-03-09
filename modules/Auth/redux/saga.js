import { takeLatest, put, call } from "redux-saga/effects";
import { SIGNUP_REQUEST } from "modules/Auth/redux/constants";
import { signUpSuccess, signUpError } from "modules/Auth/redux/actions";

import config from "config/env";
import request from "lib/request";

function* signupSaga({ payload }) {
  try {
    const { values, typeOfAuth } = payload;
    const requestUrl = `${config.apiUrl}/auth/${typeOfAuth}`;
    const data = yield call(request, requestUrl, {
      method: "POST",
      body: JSON.stringify(values)
    });
    yield put(signUpSuccess(data));
  } catch (error) {
    yield cogoToast.error(`Oops.. ${error.message}`);
    yield put(signUpError(error));
  }
}

export default [takeLatest(SIGNUP_REQUEST, signupSaga)];
