import { applyMiddleware, createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { combineEpics, createEpicMiddleware } from "redux-observable";

import { general, generalEpic } from "./ducks/general";
import { events, eventsEpic } from "./ducks/events";

const composeEnhancers = composeWithDevTools({
  name: "life graph"
});

const rootReducer = combineReducers({
  general,
  events
});

const rootEpic = combineEpics(generalEpic, eventsEpic);

const epicMiddleware = createEpicMiddleware();

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(epicMiddleware))
);

epicMiddleware.run(rootEpic);

export default store;
