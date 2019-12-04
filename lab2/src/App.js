import React from "react";
import Cities from "./components/Cities";
import Geolocation from "./components/Geolocation"
import "./App.css"

class App extends React.Component {
  render() {
    return (
      <div>
        <Geolocation />
        <Cities />
      </div>
    );
  }
}


export default App;