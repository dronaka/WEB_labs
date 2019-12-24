import React from "react";
import thunk from "redux-thunk";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";

import Cities from "../Cities";


describe("<Cities /> render", () => {

  const DEFAULT_FORECAST = {
    cityName: "New York",
    temperature: "-22",
    icon: "icon_code",
    windSpeed: 15,
    description: "good to stay at home",
    pressure: 234,
    humidity: 1,
    coords: {
      lat: 74,
      lon: 89
    }
  };

  const storeCreator = configureStore([thunk]);

  beforeAll(() => {
    global.fetch = jest.fn(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve("fake success response")}
      ))
  });

  afterAll(() => {
    delete global.fetch;
  });

  test("should has error and empty cities", () => {
    const store = storeCreator({
    cities: {
        error: "test error message",
        cities: new Map()
      }
    });

    const tree = renderer
      .create(
        <Provider store={store}>
          <Cities />
        </Provider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  test("should has cities with 1 loading element", () => {
    const store = storeCreator({
      cities: {
        cities: new Map([["firstLoadingCity", undefined]])
      }
    });

    const tree = renderer
    .create(
      <Provider store={store}>
        <Cities />
      </Provider>
    )
    .toJSON();

    expect(tree).toMatchSnapshot();
  });

  test("should has error and cities with 1 element", () => {
    const store = storeCreator({
      cities: {
        error: "test error message",
        cities: new Map([["firstCity", DEFAULT_FORECAST]])
      }
    });

    const tree = renderer
    .create(
      <Provider store={store}>
        <Cities />
      </Provider>
    )
    .toJSON();

    expect(tree).toMatchSnapshot();
  });

  test("should has empty cities", () => {
    const store = storeCreator({
      cities: {
        cities: new Map()
      }
    });

    const tree = renderer
    .create(
      <Provider store={store}>
        <Cities />
      </Provider>
    )
    .toJSON();

    expect(tree).toMatchSnapshot();
  });

  test("should has cities with 1 element", () => {
    const store = storeCreator({
    cities: {
        cities: new Map([["firstCity", DEFAULT_FORECAST]])
      }
    });

    const tree = renderer
    .create(
      <Provider store={store}>
        <Cities />
      </Provider>
    )
    .toJSON();

    expect(tree).toMatchSnapshot();
  });

  test("should has cities with 2 element", () => {
    const store = storeCreator({
    cities: {
        cities: new Map([
          ["firstCity", DEFAULT_FORECAST],
          ["secondCity", DEFAULT_FORECAST]])
      }
    });

    const tree = renderer
    .create(
      <Provider store={store}>
        <Cities />
      </Provider>
    )
    .toJSON();

    expect(tree).toMatchSnapshot();
  });

});