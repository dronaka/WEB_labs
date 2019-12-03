export const API_BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
export const API_BASE_PARAMETERS = "&appid=7825ce4ffa896c5019e53087c858568a&units=metric&lang=en"
const API_ICON_URL = "https://openweathermap.org/img/wn/";

export function getIconURL(iconCode) {
  return `${API_ICON_URL}${iconCode}.png`;
}

export function extractWeatherParams(apiResponse) {
  const {
    coord: coords,
    weather: [{ icon, description }],
    main: {
      temp: temperature,
      pressure,
      humidity
    },
    wind: {
      speed: windSpeed
    },
    name: cityName
  } = apiResponse;

  return {
    cityName,
    temperature,
    pressure,
    humidity,
    windSpeed,
    icon,
    description,
    coords
  }
}
