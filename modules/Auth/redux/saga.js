import cogoToast from "cogo-toast";
import { takeLatest, put, call, takeEvery, select } from "redux-saga/effects";
import {
  SIGNUP_REQUEST,
  LOGOUT_SUCCESS,
  WALLET_UPDATE_REQUEST,
} from "modules/Auth/redux/constants";
import {
  signUpSuccess,
  signUpError,
  walletUpdateSuccess,
  walletUpdateError,
} from "modules/Auth/redux/actions";
import { makeSelectBalance } from "./selectors";

import config from "config/env";
import request from "lib/request";
import paytmOrderSubmit from "utils/paytmOrderSubmit";

function* signupSaga({ payload }) {
  try {
    const { values, typeOfAuth } = payload;
    const requestUrl = `${config.apiUrl}/auth/${typeOfAuth}`;
    const data = yield call(request, requestUrl, {
      method: "POST",
      body: JSON.stringify(values),
    });
    yield put(signUpSuccess(data));
  } catch (error) {
    yield cogoToast.error(`Oops.. ${error.message}`);
    yield put(signUpError(error));
  }
}

function* logoutSuccess() {
  yield cogoToast.success("You have been successfully logged out!");
}

function* walletUpdateSaga({ payload }) {
  try {
    const { amt } = payload;
    const currentBalance = yield select(makeSelectBalance());
    const newBalance = currentBalance + amt;
    if (newBalance > currentBalance) {
      // adding coins to wallet
      const requestUrl = `${config.apiUrl}/user/balance`;
      const data = yield call(request, requestUrl, {
        method: "PATCH",
        body: JSON.stringify({
          topUp: amt,
        }),
      });
      yield paytmOrderSubmit(data);
    } else if (newBalance > 0) {
      // subtracting from wallet
      yield put(walletUpdateSuccess({ balance: newBalance }));
    } else {
      // wallet balance becomes negative
      throw new Error("Wallet balance cannot be negative");
    }
  } catch (error) {
    yield cogoToast.error(error.message);
    yield put(walletUpdateError());
  }
}

export default [
  takeLatest(SIGNUP_REQUEST, signupSaga),
  takeEvery(LOGOUT_SUCCESS, logoutSuccess),
  takeLatest(WALLET_UPDATE_REQUEST, walletUpdateSaga),
];
