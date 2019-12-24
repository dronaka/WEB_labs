import { createStore, applyMiddleware, combineReducers } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";

import cityReducer from "./reducers/cityReducer";
import geoReducer from "./reducers/geoReducer"


const store = createStore(
  combineReducers({cities: cityReducer, geo: geoReducer}),
  applyMiddleware(logger, thunk)
);


export default store;