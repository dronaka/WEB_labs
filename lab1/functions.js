
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