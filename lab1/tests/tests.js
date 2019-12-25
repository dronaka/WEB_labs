
sinon = require("sinon");

chai = require("chai");

functions = require("../functions")


var assert = chai.assert;
var getWeather = functions.getWeather
var extractForecast = functions.extractForecast






describe("index.js", function() {
    
    describe("extractForecast", function() {

        const JSON = {
            "coord": {
                "lon": 41.54,
                "lat": 46.48
            },
            "weather": [
                {
                    "id": 804,
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
            "id": 499161,
            "name": "Salsk",
            "cod": 200
        };


        it("forecast should contains array 'parametrs'", function() {
            const forecast = extractForecast(JSON);

            assert.property(forecast, "parameters");
            assert.isArray(forecast.parameters);
        });

        it("forecast's array 'parameters' should contain 5 elements", function() {
            let parametersLength = 5;

            const forecast = extractForecast(JSON);

            assert.lengthOf(forecast.parameters, parametersLength);
        });

        it("each forecast's parameter should contains fields: 'name', 'value', 'units'", function() {
            const forecast = extractForecast(JSON);
            
            forecast.parameters.forEach(parameter => {
                assert.property(parameter, "name");
                assert.property(parameter, "value");
                assert.property(parameter, "units");
            });
        });

        it("json shoud be parsed to forecast", function() {
            
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

    describe("getWeather", () => {

        before(() => {
            global.fetch = () => null;
        });
        
        after(() => {
            delete global.fetch;
        });

        let stubbedFetch = sinon.stub();
        
        beforeEach(() => {
            stubbedFetch = sinon.stub(global, "fetch");
            stubbedFetch
                .resolves({
                    ok: true,
                    json: () => Promise.resolve("default json content")
                });
        });

        afterEach(() => {
            stubbedFetch.restore();
        });

        it("should call fetch once", async () => {
            await getWeather("cityName");

            sinon.assert.calledOnce(stubbedFetch);
        });
        
        it("should call fetch and return resolved promise", async () => {
            const expectedJsonContent = "fake json data";
            stubbedFetch
                .resolves({
                    ok: true,
                    json: () => Promise.resolve(expectedJsonContent)
                });

            const response = await getWeather("cityName");
            
            assert.equal(expectedJsonContent, response);
        });

        it("should call fetch with url with cityName", async () => {
            const API_BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
            const API_BASE_PARAMETERS = "&appid=7825ce4ffa896c5019e53087c858568a&units=metric&lang=en";
            const cityName = "testCityName";
            const expectedUrl = `${API_BASE_URL}?q=${cityName}${API_BASE_PARAMETERS}`;
            await getWeather(cityName);

            stubbedFetch.calledWithExactly(expectedUrl);
        });

        it("should call fetch and return not found error in json()", async () => {
            const expectedErrorMessage = "fake not found message";
            stubbedFetch
                .resolves({
                    ok: false,
                    json: () => Promise.resolve({
                        message: expectedErrorMessage
                    })
                });

            try {
                await getWeather("cityName");
                assert.isTrue(true, "Error wasn't thrown")
            } catch (error) {
                assert.typeOf(error, "Error");
                assert.equal(error.message, expectedErrorMessage);
            }
        });

    });

});