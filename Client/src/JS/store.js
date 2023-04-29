import { createStore, applyMiddleware, compose } from "redux";
import { thoughtreducers } from "./reducers/Thoughtreducers";
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  thoughtreducers,
  composeEnhancers(applyMiddleware(thunk))
);
