import { Actions } from "./actions";

import { getCitiesFromStorage } from "./localStorage";
import { extractWeatherParams } from "./WeatherApi";

const initialState = {
  cities: getCitiesFromStorage()
};

export default function Reducer(state = initialState, action) {
  state = {
    ...state,
    error: false,
    cities: new Map(state.cities)
  };

  switch (action.type) {
    case Actions.ADD_СITY:
      if (!state.cities.has(action.payload))
        state.cities.set(action.payload);
      break;

    case Actions.DELETE_СITY:
      state.cities.delete(action.payload);
      break;

    case Actions.FETCH_CITY_SUCCESS:
      console.log(action.payload.apiResponse)
      const forecast = extractWeatherParams(action.payload.apiResponse);
      state.cities.delete(action.payload.cityName);
      state.cities.set(forecast.cityName, forecast);
      break;

    case Actions.FETCH_CITY_ERROR:
      state.error = action.payload.error;
      state.cities.delete(action.payload.cityName);
      break;

    default:
      break;
  }

  return state;
}