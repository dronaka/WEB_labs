
document.getElementById("form-submit").addEventListener('submit', onSubmit)


function onSubmit(event) {
    event.preventDefault();
    let cityName = event.currentTarget[0].value;


    let request = new XMLHttpRequest();

    let requestText = "https://api.openweathermap.org/data/2.5/weather" +
        "?q=" + cityName +
        "&appid=7825ce4ffa896c5019e53087c858568a" +
        "&units=metric";

    request.open("GET", requestText);
    request.responseType = "json";

    request.onload = function () {
        if (request.status == 200) {
       
            let data = extractForecast(request.response);
            displayWeather(data);
        }
        else {
            displayError(request.response.message);
        }
    }

    request.send();
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
