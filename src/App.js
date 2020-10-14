import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Container } from 'reactstrap';

import WeatherProvider from './context/weather-context';
import Landing from './containers/Landing';
import Forecast from './containers/Forecast';
import DayForecast from './containers/DayForecast';

const App = () => {
  return (
    <div className="App">
      <Container className="mt-4">
        <WeatherProvider>
          <Switch>
            <Route path="/forecast/day" component={DayForecast} />
            <Route path="/forecast" component={Forecast} />
            <Route path="/" component={Landing} />
            <Redirect to="/" />
          </Switch>
        </WeatherProvider>
      </Container>
    </div>
  );
};

export default App;
