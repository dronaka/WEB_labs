import React from "react";
import renderer from "react-test-renderer";

import WeatherParam from "../WeatherParam";


describe("<WeatherParam /> render", () =>{

  const DEFAULT_PROPS = {
    name: "Temperature",
    value: "25",
  };

  test("должно быть name и value", () => {
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

  test("должно быть name", () => {
    const { name } = DEFAULT_PROPS;
    
    const tree = renderer
      .create(
        <WeatherParam
          name={name}
        />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  test("должно быть value", () => {
    const { value } = DEFAULT_PROPS;
    
    const tree = renderer
      .create(
        <WeatherParam
          value={value}
        />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  test("ничего не должно быть", () => {
    const tree = renderer
      .create(
        <WeatherParam />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

});