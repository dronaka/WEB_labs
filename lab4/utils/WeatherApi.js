
const fetch = require("node-fetch");
const axios = require("axios");

const API_BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_BASE_PARAMETERS = "&appid=e9931f3a56608b6f3be9e93c5d8d26b4&units=metric&lang=en"


async function fetchWeatherByCityName(cityName) {

  const API_URL = `${API_BASE_URL}?q=${cityName}${API_BASE_PARAMETERS}`;
  try {
    const response = await axios.get(API_URL)
    console.log(response.ok)
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
  const API_URL = `${API_BASE_URL}?lat=${lat}&lon=${lon}${API_BASE_PARAMETERS}`;
  //const API_URL = "https://api.openweathermap.org/data/2.5/weather?lat=46.47&lon=41.53&appid=e9931f3a56608b6f3be9e93c5d8d26b4&units=metric&lang=en"
  try {
    const response = await axios.get(API_URL)
    console.log(response.ok)
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