import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";

import Reducer from "./reducer";
import { LOCAL_STORAGE_KEY } from "./localStorage";


const store = createStore(
  Reducer,
  applyMiddleware(logger, thunk)
);

store.subscribe(() => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([...store.getState().cities.keys()]));
});

export default store;