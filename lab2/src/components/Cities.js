import React from "react";
import { connect } from "react-redux";

import CityForm from "./CityForm"
import City from "./City";
import { addСity, deleteСity, fetchWeatherByCityName } from "../actions";



class Сities extends React.Component {
  render() {
    return (
      <div className="Сities">
        <h1>Сities</h1>
        <CityForm onSubmit={(e) => this.handleCityForm(e)} />
        {this.props.error && <div className="error">Error: {this.props.error}</div>}
        <div className="forecasts">
          {
            [...this.props.cities.entries()].map((entry) => {
              console.log(entry[0])
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
    this.props.addСity(cityName);
  }
}


function mapStateToProps(state) {
  return {
    cities: state.cities,
    error: state.error
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addСity: (cityName) => {
      dispatch(addСity(cityName));
    },

    deleteСity: (cityName) => {
      dispatch(deleteСity(cityName)); 
    },

    fetchWeatherByCityName: (cityName) => {
      dispatch(fetchWeatherByCityName(cityName));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Сities);