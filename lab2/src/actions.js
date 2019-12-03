import { API_BASE_URL, API_BASE_PARAMETERS } from "./WeatherApi"


export const Actions = {
  ADD_СITY: "ADD_СITY",
  DELETE_СITY: "DELETE_СITY",
  FETCH_CITY_SUCCESS: "FETCH_CITY_SUCCESS",
  FETCH_CITY_ERROR: "FETCH_CITY_ERROR"
}

export function addСity(cityName) {
  return {
    type: Actions.ADD_СITY,
    payload: cityName
  };
}

export function deleteСity(cityName) {
  return {
    type: Actions.DELETE_СITY,
    payload: cityName
  };
}

export function fetchWeatherByCityName(cityName) {
  const API_URL = `${API_BASE_URL}?q=${cityName}${API_BASE_PARAMETERS}`;

  return function (dispatch) {
    fetch(API_URL)
      .then(response => {
        response.json()
          .then(json => {
            console.log(response, json);
            if (!response.ok) {
              dispatch(fetchCityError(json.message, cityName));
            } else {
              dispatch(fetchCitySuccess(json, cityName));
            }
          });
      },
        error => dispatch(fetchCityError(error, cityName)))
  }
}

function fetchCitySuccess(apiResponse, cityName) {
  return {
    type: Actions.FETCH_CITY_SUCCESS,
    payload: {
      apiResponse,
      cityName
    }
  }
}

function fetchCityError(error, cityName) {
  return {
    type: Actions.FETCH_CITY_ERROR,
    payload: {
      error,
      cityName
    }
  }
}