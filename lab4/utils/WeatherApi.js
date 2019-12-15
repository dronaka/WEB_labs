const axios = require("axios");

const API_BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_BASE_PARAMETERS = "&appid=7825ce4ffa896c5019e53087c858568a&units=metric&lang=en"


async function fetchWeatherByCityName(cityName) {
  const API_URL = encodeURI(`${API_BASE_URL}?q=${cityName}${API_BASE_PARAMETERS}`);

  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    let errorMessage;
    if (error.response)
      errorMessage = error.response.data.message;
    else
      errorMessage = error.message;
    throw new Error(errorMessage);
  }
}

async function fetchWeatherByCoords(lat, lon) {
  const API_URL = encodeURI(`${API_BASE_URL}?lat=${lat}&lon=${lon}${API_BASE_PARAMETERS}`);

  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    let errorMessage;
    if (error.response)
      errorMessage = error.response.data.message;
    else
      errorMessage = error.message;
    throw new Error(errorMessage);
  }
}


module.exports = {
  fetchWeatherByCityName,
  fetchWeatherByCoords,
};