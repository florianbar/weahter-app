import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17';

import App from './App';

// Setup enzyme's react adapter
Enzyme.configure({ adapter: new EnzymeAdapter() });

test('App renders without error', () => {
  const wrapper = shallow(<App />);
  const app = wrapper.find("[data-test='component-app']");
  expect(app.length).toBe(1);
});

test('WeatherProvider renders without error', () => {
  const wrapper = shallow(<App />);
  const weatherProvider = wrapper.find("[data-test='weather-provider']");
  expect(weatherProvider.length).toBe(1);
});

describe("Routing", () => {
  test('Switch renders without error', () => {
    const wrapper = shallow(<App />);
    const switchTag = wrapper.find("[data-test='switch']");
    expect(switchTag.length).toBe(1);
  });

  test('DayForecast route renders without error', () => {
    const wrapper = shallow(<App />);
    const dayForecastRoute = wrapper.find("[data-test='day-forecast']");
    expect(dayForecastRoute.length).toBe(1);
  });

  test('Forecast route renders without error', () => {
    const wrapper = shallow(<App />);
    const forecastRoute = wrapper.find("[data-test='forecast']");
    expect(forecastRoute.length).toBe(1);
  });

  test('Landing route renders without error', () => {
    const wrapper = shallow(<App />);
    const landingRoute = wrapper.find("[data-test='landing']");
    expect(landingRoute.length).toBe(1);
  });

  test('Redirect renders without error', () => {
    const wrapper = shallow(<App />);
    const redirect = wrapper.find("[data-test='redirect']");
    expect(redirect.length).toBe(1);
  });
});
