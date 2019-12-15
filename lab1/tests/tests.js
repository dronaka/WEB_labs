
describe("index.js", function() {
    
    describe("extractForecast", function() {

        const JSON = {
            "coord": {
                "lon": 46.47,
                "lat": 41.53
            },
            "weather": [
                {
                    "id": 801,
                    "main": "Clouds",
                    "description": "few clouds",
                    "icon": "02n"
                }
            ],
            "base": "stations",
            "main": {
                "temp": 8.93,
                "pressure": 1023,
                "humidity": 66,
                "temp_min": 8.89,
                "temp_max": 9
            },
            "visibility": 10000,
            "wind": {
                "speed": 4,
                "deg": 100
            },
            "clouds": {
                "all": 20
            },
            "dt": 1573312299,
            "sys": {
                "type": 1,
                "id": 8969,
                "country": "RU",
                "sunrise": 1573271122,
                "sunset": 1573307090
            },
            "timezone": 10800,
            "id": 473249,
            "name": "Salsk",
            "cod": 200
        };


        it("forecast содержит свойства 'parameters'", function() {
            const forecast = extractForecast(JSON);

            assert.property(forecast, "parameters");
            assert.isArray(forecast.parameters);
        });

        it("список 'parameters' содержит 5 элементов", function() {
            let parametersLength = 5;

            const forecast = extractForecast(JSON);

            assert.lengthOf(forecast.parameters, parametersLength);
        });

        it("каждый элемент из 'parameters' содержит поля: 'name', 'value', 'units'", function() {
            const forecast = extractForecast(JSON);
            
            forecast.parameters.forEach(parameter => {
                assert.property(parameter, "name");
                assert.property(parameter, "value");
                assert.property(parameter, "units");
            });
        });

        it("json парсится в forecast", function() {
            
            let expectedForecast = {
                parameters:
                    [
                        {
                            name: "Temperature",
                            value: JSON.main.temp,
                            units: "&deg;C",
                        },
                        {
                            name: "Pressure",
                            value: JSON.main.pressure,
                            units: "hPa",
                        },
                        {
                            name: "Humidity",
                            value: JSON.main.humidity,
                            units: "%",
                        },
                        {
                            name: "Clouds",
                            value: JSON.clouds.all,
                            units: "%",
                        },
                        {
                            name: "Wind speed",
                            value: JSON.wind.speed,
                            units: "m/s",
                        },
                    ]
            };

            const actualForecast = extractForecast(JSON);

            assert.deepEqual(actualForecast, expectedForecast);
        });

    });

    describe("getForecast")

});