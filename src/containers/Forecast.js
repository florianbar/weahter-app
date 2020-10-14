import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { WeatherContext } from '../context/weather-context';

const Forecast = ({ location }) => {
    const city = new URLSearchParams(location.search).get("city");

    const { 
        forecast, 
        fetchForecastData, 
        getWeekForecast 
    } = useContext(WeatherContext);

    useEffect(() => {
        fetchForecastData(city);
    }, [fetchForecastData, city]);

    let forecastList = null;
    if (forecast) {
        forecastList = getWeekForecast(forecast).map(forecast => {
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