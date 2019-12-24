
const API_BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_BASE_PARAMETERS = "&appid=7825ce4ffa896c5019e53087c858568a&units=metric&lang=en";


async function getWeather(cityName) {
    const url = `${API_BASE_URL}?q=${cityName}${API_BASE_PARAMETERS}`;
    
    const weatherResponse = await fetch(url);
    const weatherJSON = await weatherResponse.json();
    if (!weatherResponse.ok)
        throw Error(weatherJSON.message);

    return weatherJSON;
}

function extractForecast(response) {
    let forecast =
    {
        parameters:
            [
                {
                    name: "Temperature",
                    value: response.main.temp,
                    units: "&deg;C",
                },
                {
                    name: "Pressure",
                    value: response.main.pressure,
                    units: "hPa",
                },
                {
                    name: "Humidity",
                    value: response.main.humidity,
                    units: "%",
                },
                {
                    name: "Clouds",
                    value: response.clouds.all,
                    units: "%",
                },
                {
                    name: "Wind speed",
                    value: response.wind.speed,
                    units: "m/s",

                },
            ],
    };

    return forecast;
}

module.exports = {getWeather, extractForecast}