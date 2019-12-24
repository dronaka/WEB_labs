import React from "react";
import { connect } from "react-redux";

import CityForm from "./CityForm";
import City from "./City";
import { addCity, fetchWeatherByCityName, getCities, deleteCity } from "../actions/cityActions";
import "./styles/Cities.css";



class Сities extends React.Component {
  componentDidMount() {
    console.log("FIRST")
    this.props.getCities();
  }

  render() {
    return (
      <div className="cities">
        <h1>Сities</h1>
        <CityForm onSubmit={(e) => this.handleCityForm(e)} />
        {this.props.error && <div className="error">Error: {this.props.error}</div>}
        <div className="forecasts">
          {
            [...this.props.cities.entries()].map((entry) => {
              return (
                <City
                  key={entry[0]}
                  onFetch={() => this.props.fetchWeatherByCityName(entry[0])}
                  onDelete={() => this.props.deleteСity(entry[0])}
                  forecast={entry[1]} />
              );
            })
          }
        </div>
      </div>
    );
  }

  handleCityForm(e) {
    e.preventDefault();
    const cityName = e.currentTarget.elements.cityName.value;
    this.props.addCity(cityName);
  }
}


function mapStateToProps(state) {
  return {
    cities: state.cities.cities,
    error: state.cities.error
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getCities: () => {dispatch(getCities())},

    addCity: (cityName) => {dispatch(addCity(cityName));},

    deleteСity: (cityName) => {dispatch(deleteCity(cityName)); },

    fetchWeatherByCityName: (cityName) => {dispatch(fetchWeatherByCityName(cityName));}
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Сities);