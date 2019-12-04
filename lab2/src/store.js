import { createStore, applyMiddleware, combineReducers } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";

import cityReducer from "./reducers/cityReducer";
import geoReducer from "./reducers/geoReducer"
import { LOCAL_STORAGE_KEY } from "./localStorage";


const store = createStore(
  combineReducers({cities: cityReducer, geo: geoReducer}),
  applyMiddleware(logger, thunk)
);

store.subscribe(() => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([...store.getState().cities.cities.keys()]));
});

export default store;