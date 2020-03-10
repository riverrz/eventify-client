/* global fetch */

import { all } from "redux-saga/effects";
import authSaga from "modules/Auth/redux/saga";
import globalSaga from "modules/Global/redux/saga";
import dashboardSaga from "modules/Dashboard/redux/saga";

function* rootSaga() {
  yield all([...authSaga, ...globalSaga, ...dashboardSaga]);
}

export default rootSaga;
