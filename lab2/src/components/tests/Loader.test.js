import React from "react";
import renderer from "react-test-renderer";

import Loader from "../Loader";

describe("<Loader /> render", () => {

  test("should has text", () => {
    const tree = renderer
      .create(<Loader />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
