const API_BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_BASE_PARAMETERS = "&appid=7825ce4ffa896c5019e53087c858568a&units=metric&lang=en";

document.getElementById("form-submit").addEventListener('submit', onSubmit)


async function onSubmit(e) {
    e.preventDefault();

    const inputCityName = e.currentTarget.elements.input.value;
    try {
        const weatherResponse = await getWeather(inputCityName);
        const forecast = extractForecast(weatherResponse);
        displayWeather(forecast);
    } catch (error) {
        error.cityName = inputCityName;
        displayError(error);
    }
}

function displayError(message) {
    var source = document.getElementById("error-template").innerHTML;
    var template = Handlebars.compile(source);

    let context ={ message };
    var html = template(context);

    document.getElementById("error-container").innerHTML = html;
    document.getElementById("weather-container").innerHTML = "";
}


function displayWeather(forecast) {
    var source = document.getElementById("weather-template").innerHTML;
    var template = Handlebars.compile(source);

    var html = template(forecast);
    document.getElementById("error-container").innerHTML = "";
    document.getElementById("weather-container").innerHTML = html;
}

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
