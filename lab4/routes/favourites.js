const favouritesCRUD = require('../database/crud');
const weatherAPI = require('../utils/WeatherApi');
const express = require('express');
const router = express.Router();


router.post('/', (req, res) => {
    const cityName = req.body.cityName;

    favouritesCRUD.AddCity(cityName).then((result) => {
        if (!result) {
            res.status(400).json({"message": `Did not add city ${cityName}`});
        } else {
            res.status(200).json({"message" : "Ok"});
        }
    });
});


router.delete('/', (req, res) => {
    const cityName = req.body.cityName;
    favouritesCRUD.DeleteCity(cityName).then((result) => {
        if (!result) {
            res.status(400).json({"message": `Did not delete city ${cityName}`});
        } else {
            res.status(200).json({"message" : "Ok"})
        }
    });
});


router.get('/', (req, res) => {
    favouritesCRUD.GetAllCities().then(result => {
        res.status(200).json({"cities": result});
    });
});


module.exports = router;