import React from "react";
import renderer from "react-test-renderer";

import City from "../City";

describe("<City /> render", () => {

  const DEFAULT_FORECAST = {
    cityName: "Moscow",
    temperature: "-4",
    icon: "icon_code",
    windSpeed: 10,
    description: "nice to swim",
    pressure: 234,
    humidity: 99,
    coords: {
      lat: 40,
      lon: 40
    }
  };

  test("should has forecast and button delete", () => {
    const tree = renderer
      .create(
        <City
          onFetch={() => {}}
          onDelete={() => {}}
          forecast={DEFAULT_FORECAST}
        />)
      .toJSON();
    
    expect(tree).toMatchSnapshot();
  });
  

  test("should has <Loader />", () => {
    const tree = renderer
      .create(
        <City
          onFetch={() => {}}
        />)
      .toJSON();
    
    expect(tree).toMatchSnapshot();
  });

});