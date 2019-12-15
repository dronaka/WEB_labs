const { Router } = require("express");
const router = Router();

const { fetchWeatherByCityName, fetchWeatherByCoords } = require("../utils/WeatherApi");


router.get("/", async (req, res) => {
  try {
    const city = req.query.city;
    console.log(req.query)
    const forecast = await fetchWeatherByCityName(city);
    res.status(200).json(forecast);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/coordinates", async (req, res) => {
  try {
    const lat = req.query.lat;
    const lon = req.query.lon;

    const forecast = await fetchWeatherByCoords(lat, lon);
    res.status(200).json(forecast);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;