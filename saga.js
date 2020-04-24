/* global fetch */

import { all } from "redux-saga/effects";
import authSaga from "modules/Auth/redux/saga";
import globalSaga from "modules/Global/redux/saga";
import dashboardSaga from "modules/Dashboard/redux/saga";
import eventSaga from "modules/Event/redux/saga";
import liveEventSaga from "modules/LiveEvent/redux/saga";

function* rootSaga() {
  yield all([
    ...authSaga,
    ...globalSaga,
    ...dashboardSaga,
    ...eventSaga,
    ...liveEventSaga,
  ]);
}

export default rootSaga;
