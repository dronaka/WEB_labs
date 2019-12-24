import { API_BASE_URL, API_BASE_PARAMETERS } from "../WeatherApi";

export const Actions = {
  SET_GEOLOCATION: "SET_GEOLOCATION",
  FETCH_GEO_SUCCESS: "FETCH_GEO_SUCCESS",
  FETCH_GEO_ERROR: "FETCH_GEO_ERROR",
}

export function setGeolocation(coords) {
  return {
    type: Actions.SET_GEOLOCATION,
    payload: coords
  }
}

export function fetchWeatherByCoords(coords) {
  const API_URL = `${API_BASE_URL}/weather/coordinates?lat=${coords.lat}&lon=${coords.lon}`;

  return  async function(dispatch) {
    try {
      const response = await fetch(API_URL);
      const json = await response.json();

      if (!response.ok) {
        dispatch(fetchGeoError(json.message));
      } else {
        dispatch(fetchGeoSuccess(json));
      }
    } catch (error){
      dispatch(fetchGeoError(error.message));
    }  
  }
}

function fetchGeoSuccess(apiResponse) {
  return {
    type: Actions.FETCH_GEO_SUCCESS,
    payload: apiResponse
  }
}

export function fetchGeoError(error) {
  return {
    type: Actions.FETCH_GEO_ERROR,
    payload: error
  }
}