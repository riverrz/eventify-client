import { takeLatest, put, call } from "redux-saga/effects";
import { SIGNUP_REQUEST } from "modules/Auth/redux/constants";
import { signUpSuccess, signUpError } from "modules/Auth/redux/actions";

function* signupSaga({payload}) {
  try {
    
    yield put(signUpSuccess(payload));
  } catch (error) {
    yield put(signUpError(error));
  }
}

export default [takeLatest(SIGNUP_REQUEST, signupSaga)];
