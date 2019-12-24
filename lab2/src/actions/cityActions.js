import { API_BASE_URL } from "../WeatherApi"


export const Actions = {
  GET_CITIES_SUCCESS: "GET_CITIES_SUCCESS",
  GET_CITIES_ERROR: "GET_CITIES_ERROR",
  ADD_СITY: "ADD_СITY",
  ADD_CITY_SUCCESS: "ADD_CITY_SUCCESS",
  ADD_CITY_ERROR: "ADD_CITY_ERROR",
  DELETE_CITY_SUCCESS: "DELETE_CITY_SUCCESS",
  DELETE_CITY_ERROR: "DELETE_CITY_ERROR",
  FETCH_CITY_SUCCESS: "FETCH_CITY_SUCCESS",
  FETCH_CITY_ERROR: "FETCH_CITY_ERROR"
}

export function fetchWeatherByCityName(cityName) {
  const API_URL = `${API_BASE_URL}/weather?cityName=${cityName}`;
  
  return async function(dispatch) {
    try {
      const response = await fetch(API_URL);
      const json = await response.json();
      
      if (response.ok) {
        dispatch(fetchCitySuccess(cityName, json));
      } else {
        dispatch(fetchCityError(cityName, json.message));
        dispatch(deleteCity(cityName));
      }
    } catch (error) {
      dispatch(fetchCityError(cityName, error.message));
    }
  }
}

function fetchCitySuccess(cityName, apiResponse) {
  return {
    type: Actions.FETCH_CITY_SUCCESS,
    payload: {
      apiResponse,
      cityName
    }
  }
}

function fetchCityError(cityName,error) {
  return {
    type: Actions.FETCH_CITY_ERROR,
    payload: {
      error,
      cityName
    }
  }
}

export function getCities() {
  console.log("SECOND")
  const API_URL = `${API_BASE_URL}/favourites`;

  return async function (dispatch) {
    try {
      const response = await fetch(API_URL);
      const json = await response.json();
      if (response.ok)
        dispatch(getCitiesSuccess(json));
      else
        dispatch(getCitiesError(json.message));
    } catch (error) {
      dispatch(getCitiesError(error.message));
    }
  }
}

function getCitiesSuccess(cities) {
  return {
    type: Actions.GET_CITIES_SUCCESS,
    payload: cities
  };
}

function getCitiesError(error) {
  return {
    type: Actions.GET_CITIES_ERROR,
    payload: error
  };
}

export function addCity(cityName) {
  const API_URL = `${API_BASE_URL}/favourites`;
  const fetchOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cityName })
  };

  return async function (dispatch) {
    dispatch({
      type: Actions.ADD_СITY,
      payload: cityName
    });

    try {
      const response = await fetch(API_URL, fetchOptions);
      const json = await response.json();
      
      if (response.ok)
        dispatch(addCitySuccess(cityName, json.forecast));
      else
        dispatch(addCityError(cityName, json.message));
    } catch (error) {
      dispatch(addCityError(cityName, error.message));
    }
  }
}

function addCitySuccess(cityName, apiResponse) {
  return {
    type: Actions.ADD_CITY_SUCCESS,
    payload: {
      cityName,
      apiResponse
    }
  };
}

function addCityError(cityName, error) {
  return {
    type: Actions.ADD_CITY_ERROR,
    payload: {
      cityName,
      error
    }
  };
}

export function deleteCity(cityName) {
  console.log(cityName);
  const API_URL = `${API_BASE_URL}/favourites`;
  const fetchOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cityName }),
  };

  return async function(dispatch) {
    try {
      console.log("deleteCity")
      const response = await fetch(API_URL, fetchOptions);
      const json = await response.json();
      console.log("deleteCity")
      console.log(cityName)

      if (response.ok)
        dispatch(deleteCitySuccess(cityName));
      else
        dispatch(deleteCityError(json.message));
    } catch (error) {
      dispatch(deleteCityError(error.message));
    }
  }
}

function deleteCitySuccess(cityName) {
  return {
    type: Actions.DELETE_CITY_SUCCESS,
    payload: cityName
  };
}

function deleteCityError(error) {
  return {
    type: Actions.DELETE_CITY_ERROR,
    payload: error
  };
}