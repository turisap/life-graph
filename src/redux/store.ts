import { applyMiddleware, createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { combineEpics, createEpicMiddleware } from "redux-observable";

import { general, generalEpic } from "./ducks/general";

const composeEnhancers = composeWithDevTools({
  name: "life graph"
});

const rootReducer = combineReducers({
  general
});

const rootEpic = combineEpics(generalEpic);

const epicMiddleware = createEpicMiddleware();

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(epicMiddleware))
);

epicMiddleware.run(rootEpic);

export default store;
