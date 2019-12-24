import React from "react";
import renderer from "react-test-renderer";

import WeatherParam from "../WeatherParam";


describe("<WeatherParam /> render", () =>{

  const DEFAULT_PROPS = {
    name: "Temperature",
    value: "25",
  };

  it("should has name and value", () => {
    const { name, value } = DEFAULT_PROPS;
    
    const tree = renderer
      .create(
        <WeatherParam
          name={name}
          value={value}
        />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

});