import { applyMiddleware, createStore, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import { clone, mergeDeepRight } from "ramda";
import AuthReducer from "modules/Auth/redux/reducer";
import DashboardReducer from "modules/Dashboard/redux/reducer";
import GlobalReducer from "modules/Global/redux/reducer";
import LiveEventReducer from "modules/LiveEvent/redux/reducer";
import { loadState, saveState } from "./storage";
import rootSaga from "./saga";

const savedState = loadState() || {};

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

function configureStore(initialState = {}) {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    combineReducers({
      auth: AuthReducer,
      dashboard: DashboardReducer,
      global: GlobalReducer,
      liveEvent: LiveEventReducer,
    }),
    mergeDeepRight(initialState, savedState),
    bindMiddleware([sagaMiddleware])
  );

  store.sagaTask = sagaMiddleware.run(rootSaga);

  store.subscribe(() => {
    const state = clone(store.getState());

    saveState({
      auth: {
        data: {
          token: state.auth.data.token,
          user: state.auth.data.user,
          participationTokens: state.auth.data.participationTokens,
        },
      },
    });
  });

  return store;
}

export default configureStore;
