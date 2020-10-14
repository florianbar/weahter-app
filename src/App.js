import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import WeatherProvider from './context/weather-context';
import Layout from './hoc/Layout';
import Landing from './containers/Landing';
import Forecast from './containers/Forecast';
import DayForecast from './containers/DayForecast';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Layout>
        <WeatherProvider>
          <Switch>
            <Route path="/forecast/day" component={DayForecast} />
            <Route path="/forecast" component={Forecast} />
            <Route path="/" component={Landing} />
            <Redirect to="/" />
          </Switch>
        </WeatherProvider>
      </Layout>
    </div>
  );
};

export default App;
