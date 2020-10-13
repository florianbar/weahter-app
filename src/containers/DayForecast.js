import React, { useState, useContext, useEffect } from 'react';

import { WeatherContext } from '../context/weather-context';

const DayForecast = ({ location }) => {
    const [city] = useState(new URLSearchParams(location.search).get("city"));
    const [date] = useState(new URLSearchParams(location.search).get("date"));

    const { 
        forecast, 
        fetchForecast, 
        getDayForecast 
    } = useContext(WeatherContext);

    useEffect(() => {
        // Only fetch forecast data if it hasn't been fetched yet
        if (!forecast) {
            fetchForecast(city);
        }
    }, [forecast, fetchForecast, city]);

    let dayForecastContent = null;
    if (forecast) {
        dayForecastContent = getDayForecast(forecast, date).map(forecast => {
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
            {!forecast ? "Loading forecast..." : (
                <ul>
                    {dayForecastContent}
                </ul>
            )}
        </div>
    );
};

export default DayForecast;