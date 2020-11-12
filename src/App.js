import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Container } from 'reactstrap';

import WeatherProvider from './context/weather-context';
import Landing from './containers/Landing';
import Forecast from './containers/Forecast';
import DayForecast from './containers/DayForecast';

const App = () => {
  return (
    <div data-test="component-app" className="App">
      <Container className="mt-4">
        <WeatherProvider data-test="weather-provider">
          <Switch data-test="switch">
            <Route path="/forecast/day" component={DayForecast} data-test="day-forecast" />
            <Route path="/forecast" component={Forecast} data-test="forecast" />
            <Route path="/" component={Landing} data-test="landing" />
            <Redirect to="/" data-test="redirect" />
          </Switch>
        </WeatherProvider>
      </Container>
    </div>
  );
};

export default App;
