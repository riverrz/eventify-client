import io from "socket.io-client";
import {
  take,
  call,
  put,
  cancelled,
  race,
  fork,
  delay,
  select,
} from "redux-saga/effects";
import { eventChannel } from "redux-saga";

import { START_EVENT, END_EVENT, TIMER_SYNC } from "./constants";
import {
  endEvent,
  socketConnected,
  socketDisconnected,
  timerSync,
} from "./actions";
import { makeSelectNamespace } from "./selectors";
import config from "config/env";
import request from "lib/request";

let socket;

function buildSocketConnectionString(namespace) {
  let connectionString = config.socketServerUrl;
  if (namespace) {
    connectionString += `/U-N3wjBAj9`;
  }
  return connectionString;
}

function connect(namespace) {
  const connectionString = buildSocketConnectionString(namespace);
  console.log(connectionString);
  socket = io(connectionString);
  return new Promise((resolve) => {
    socket.on("connect", () => {
      resolve(socket);
    });
  });
}

function disconnect(namespace) {
  const connectionString = buildSocketConnectionString(namespace);
  socket = io(connectionString);
  return new Promise((resolve) => {
    socket.on("disconnect", () => {
      resolve(socket);
    });
  });
}

function reconnect(namespace) {
  const connectionString = buildSocketConnectionString(namespace);
  socket = io(connectionString);
  return new Promise((resolve) => {
    socket.on("reconnect", () => {
      resolve(socket);
    });
  });
}

function* listenDisconnectSaga() {
  const namespace = select(makeSelectNamespace());
  while (true) {
    yield call(disconnect, namespace);
    yield put(socketDisconnected());
  }
}

function* listenConnectSaga() {
  const namespace = select(makeSelectNamespace());
  console.log(namespace);
  while (true) {
    yield call(reconnect, namespace);
    yield put(socketConnected());
  }
}

const createSocketChannel = (socket) =>
  eventChannel((emit) => {
    const handleTimerSync = (data) => {
      emit(data);
    };
    socket.on(TIMER_SYNC, handleTimerSync);
    return () => {
      socket.off(TIMER_SYNC, handleTimerSync);
    };
  });

function* listenServerSaga() {
  try {
    console.log("inside saga");
    const namespace = select(makeSelectNamespace());
    const { timeout } = race({
      connect: call(connect, namespace),
      timeout: delay(2000),
    });
    if (timeout) {
      yield put(socketDisconnected());
    }
    const socket = yield call(connect, namespace);
    const socketChannel = yield call(createSocketChannel, socket);
    yield fork(listenConnectSaga);
    yield fork(listenDisconnectSaga);
    yield put(socketConnected());
    while (true) {
      const payload = yield take(socketChannel);
      yield put(timerSync(payload));
    }
  } catch (error) {
    console.log(error);
  } finally {
    if (yield cancelled()) {
      socket.disconnect(true);
      yield put(endEvent());
    }
  }
}

function* liveEventFlow() {
  while (true) {
    const { payload } = yield take(START_EVENT);
    try {
      const requestUrl = `${config.apiUrl}/event/start/${payload}`;
      const response = yield call(request, requestUrl, {
        method: "POST",
        body: JSON.stringify({
          timestamp: new Date(),
        }),
      });

      yield race({
        task: call(listenServerSaga),
        cancel: take(END_EVENT),
      });
    } catch (error) {
      console.log("Failed to start the event");
    }
  }
}

export default [liveEventFlow()];
