import React from "react";
import { getIconURL } from "../WeatherApi"

import WeatherParam from "./WeatherParam";

import Loader from "./Loader";
import "./styles/City.css";




export default class City extends React.Component {
  
  componentDidMount() {
    this.props.onFetch();
  }

  render() {
    if (!this.props.forecast) {
      return this.renderLoader();
    }

    return this.renderWeather();
  }

  renderLoader() {
    return <Loader />
  }

  renderWeather() {
    const {
      forecast: {
        cityName,
        temperature,
        icon,
        windSpeed,
        description,
        pressure,
        humidity,
        coords: {
          lat: latitude,
          lon: longitude
        } = {}
      },
      onDelete
    } = this.props;

    return (
      <div className="city">
        <div className="header">
          <div className="city-name">{cityName}</div>
          <div className="temperature">{temperature} &#8451;</div>
          <img src={getIconURL(icon)} alt="Weather icon" />
        </div>

        <WeatherParam name="Wind" value={`${windSpeed} m/s`} />
        <WeatherParam name="Cloudness" value={description} />
        <WeatherParam name="Pressure" value={`${pressure} hPa`} />
        <WeatherParam name="Humidity" value={`${humidity}%`} />
        <WeatherParam name="Coords" value={`${latitude}, ${longitude}`} />

        {onDelete && <button className="button" onClick={onDelete}>delete</button>}
      </div>
    );
  }
}