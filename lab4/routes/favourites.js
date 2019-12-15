const favouritesCRUD = require('../database/crud');
const weatherAPI = require('../utils/WeatherApi');
const express = require('express');
const router = express.Router();


router.post('/', (req, res) => {
    const city_name = req.body.cityname;

    favouritesCRUD.AddCity(city_name).then((result) => {
        if (!result) {
            res.status(400).json({"message": `Did not add city ${city_name}`});
        } else {
            res.status(200).end();
        }
    });
});


router.delete('/', (req, res) => {
    const city_name = req.body.cityname;
    favouritesCRUD.DeleteCity(city_name).then((result) => {
        if (!result) {
            res.status(400).json({"message": `Did not delete city ${city_name}`});
        } else {
            res.status(200).end()
        }
    });
});


router.get('/', (req, res) => {
    favouritesCRUD.GetAllCities().then(result => {
        res.status(200).json({"cities": result});
    });
});


module.exports = router;