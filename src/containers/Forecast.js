import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { WeatherContext } from '../context/weather-context';

const Forecast = ({ location }) => {
    const [city] = useState(new URLSearchParams(location.search).get("city"));

    const { 
        forecast, 
        fetchForecast, 
        getCurrentForecast 
    } = useContext(WeatherContext);

    useEffect(() => {
        fetchForecast(city);
    }, [fetchForecast, city]);

    let forecastList = null;
    if (forecast) {
        forecastList = getCurrentForecast(forecast).map(forecast => {
            return (
                <li key={forecast.dt}>
                    <Link to={`/forecast/day?city=${city}&date=${forecast.dt_txt}`}>
                        {forecast.dt_txt}<br />
                        {forecast.weather[0].description}
                    </Link>
                </li>
            );
        });
    }

    return (
        <div>
            <Link to="/">Change location</Link>
            <h1>{city}</h1>
            {!forecast ? "Loading forecast..." : (
                <ul>
                    {forecastList}
                </ul>
            )}
        </div>
    );
};

export default Forecast;