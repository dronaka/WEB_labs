import React from "react";
import renderer from "react-test-renderer";

import CityForm from "../CityForm";


describe("<CityForm /> render", () => {

  test("should has form with text input and button", () => {
    const tree = renderer
      .create(<CityForm />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

});
