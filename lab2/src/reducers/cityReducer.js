import { Actions } from "../actions/cityActions";

import { extractWeatherParams } from "../WeatherApi";

const initialState = {
  cities: new Map()
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
    
    case Actions.ADD_CITY_SUCCESS:
      state.error = false;
      break;
    
    case Actions.ADD_CITY_ERROR:
      state.error = action.payload.error;
      state.cities.delete(action.payload.cityName);
      break;

    case Actions.DELETE_CITY_SUCCESS:
      state.error = false;
      state.cities.delete(action.payload);
      break;
  
    case Actions.DELETE_CITY_ERROR:
      state.error = action.payload;
      break;

    case Actions.FETCH_CITY_SUCCESS:
      state.error = false;
      updateCity(state, action.payload.cityName, action.payload.apiResponse);
      break;

    case Actions.FETCH_CITY_ERROR:
      state.error = action.payload.error;
      state.cities.delete(action.payload.cityName);
      
      break;

    case Actions.GET_CITIES_SUCCESS:
      state.error = false;
      for (const city of action.payload.cities){
        state.cities.set(city.name, false);
      }
      break;

    case Actions.GET_CITIES_ERROR:
      state.error = action.payload;
      break;

    default:
      break;
  }

  return state;
}


function updateCity(state, oldCityName, apiResponse) {
  const forecast = extractWeatherParams(apiResponse);
  if (oldCityName !== forecast.cityName)
    state.cities.delete(oldCityName);
  state.cities.set(forecast.cityName, forecast);
}