import io from "socket.io-client";
import cogoToast from "cogo-toast";
import {
  take,
  call,
  put,
  cancelled,
  race,
  fork,
  delay,
  select,
  takeLatest,
} from "redux-saga/effects";
import { eventChannel } from "redux-saga";

import {
  START_EVENT,
  END_EVENT,
  TIMER_SYNC,
  TIMER_OVER,
  ABANDON_EVENT,
} from "./constants";
import * as eventHandlers from "modules/LiveEvent/EventHandlers";
import {
  endEvent,
  socketConnected,
  socketDisconnected,
  timerSync,
  contentfulEventData,
  eventDataSubmitSuccessful,
  eventDataSubmitError,
} from "./actions";
import { makeSelectNamespace } from "./selectors";
import config from "config/env";
import request from "lib/request";

let socket;

function buildSocketConnectionString(namespace) {
  let connectionString = config.socketServerUrl;
  if (namespace) {
    connectionString += `/${namespace}`;
  }
  return connectionString;
}

function* connect(namespace, authToken) {
  const conn = buildSocketConnectionString(namespace);

  if (!socket) {
    socket = io(conn);
  }
  return new Promise((resolve) => {
    socket.on("connect", () => {
      socket.emit("join-event", { token: authToken });
      socket.on("join-event-successful", () => {
        resolve(socket);
      });
    });
  });
}

function disconnect() {
  return new Promise((resolve) => {
    socket.on("disconnect", () => {
      resolve(socket);
    });
  });
}

function reconnect() {
  return new Promise((resolve) => {
    socket.on("reconnect", () => {
      resolve(socket);
    });
  });
}

const createSocketChannel = () =>
  eventChannel((emit) => {
    socket.on(TIMER_SYNC, (data) => eventHandlers.handleTimerSync(emit, data));
    socket.on(TIMER_OVER, () => eventHandlers.handleTimerOver(emit));
    return () => {
      socket.off(TIMER_SYNC, handleTimerSync);
    };
  });

function* listenEventChannel() {
  const socketChannel = yield call(createSocketChannel);
  console.log("listenEventChannel");
  while (true) {
    const { payload, cancel } = yield race({
      payload: take(socketChannel),
      // cancel: cancelled(),
    });

    console.log(payload);

    if (payload === TIMER_OVER || cancel) {
      console.log(payload);
      break;
    } else {
      yield put(timerSync(payload));
    }
  }
}

function* listenDisconnectSaga() {
  while (true) {
    yield call(disconnect);
    yield put(socketDisconnected());
  }
}

function* listenReConnectSaga() {
  while (true) {
    yield call(reconnect);
    yield put(socketConnected());
  }
}

function initEvent(eventType, authToken) {
  switch (eventType) {
    case "Contentful": {
      socket.emit("fetch-content", { token: authToken });
      return new Promise((resolve) => {
        socket.on("populated-content", (data) => {
          // data is the contentful event data structure
          return resolve(data);
        });
      });
    }
  }
}

function initialiseTimer(authToken) {
  return new Promise((resolve) => {
    socket.emit("initialise-timer", { token: authToken });
    socket.on("timer-initialised", () => {
      resolve();
    });
  });
}

function* liveEventFlow() {
  while (true) {
    const {
      payload: { eventId, type },
    } = yield take(START_EVENT);
    console.log(eventId, type);
    try {
      const requestUrl = `${config.apiUrl}/event/start/${eventId}`;
      const authToken = yield call(request, requestUrl);

      const namespace = yield select(makeSelectNamespace());

      const { timeout, socket } = yield race({
        timeout: delay(7000),
        socket: call(connect, namespace, authToken),
      });

      if (timeout) {
        // couldn't authorise
        // yield put(socketDisconnected());
        throw new Error("Not able to connect with the server");
      }
      yield fork(listenDisconnectSaga);
      yield fork(listenReConnectSaga);
      yield put(socketConnected());

      const data = yield call(initEvent, type, authToken);
      if (type === "Contentful") {
        yield call(initialiseTimer, authToken);
        yield put(contentfulEventData(data));
      }

      yield race({
        task: call(listenEventChannel),
        end: take(END_EVENT),
        abandon: take(ABANDON_EVENT),
      });

      socket.disconnect(true);
    } catch (error) {
      cogoToast.error(error.message);
      console.log("Failed to start the event");
    }
  }
}

function* endEventSaga({ payload }) {
  try {
    const { type, replies, eventId } = payload;
    const requestUrl = `${config.apiUrl}/event/end/${eventId}`;
    yield call(request, requestUrl, {
      method: "POST",
      body: JSON.stringify({ replies }),
    });
    if (type === "Contentful") {
      cogoToast.success("Successfully submitted your answers!");
    }
    cogoToast.success("Successfully exited the event!");
    yield put(eventDataSubmitSuccessful());
  } catch (error) {
    cogoToast.error("Some Error occured while exiting the event");
    yield put(eventDataSubmitError());
  }
}

export default [liveEventFlow(), takeLatest(END_EVENT, endEventSaga)];
