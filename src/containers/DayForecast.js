import React, { useContext, useEffect } from 'react';

import { WeatherContext } from '../context/weather-context';
import Spinner from '../components/UI/Spinner';

const DayForecast = ({ location }) => {
    const city = new URLSearchParams(location.search).get("city");
    const date = new URLSearchParams(location.search).get("date");

    const { 
        forecast, 
        fetchForecastData, 
        getDayForecast 
    } = useContext(WeatherContext);

    useEffect(() => {
        // Only fetch forecast data if it hasn't been fetched yet
        if (!forecast) {
            fetchForecastData(city);
        }
    }, [forecast, fetchForecastData, city]);

    let forecastList = null;
    if (forecast) {
        forecastList = getDayForecast(forecast, date).map(forecast => {
            return (
                <li key={forecast.dt}>
                    {forecast.dt_txt}<br />
                    {forecast.weather[0].description}
                </li>
            );
        });
    }

    return (
        <div>
            <h1>{city}, {date}</h1>
            {!forecast ? <Spinner /> : (
                <ul>
                    {forecastList}
                </ul>
            )}
        </div>
    );
};

export default DayForecast;