import React, { useState, useContext, useEffect, useCallback } from 'react';

import { WeatherContext } from '../context/weather-context';

const DayForecast = ({ location }) => {
    const [city, setCity] = useState(null);
    const [date, setDate] = useState(null);
    const [dayForecast, setDayForecast] = useState(null);

    const { forecast, fetchForecast } = useContext(WeatherContext);

    const updateDayForecast = useCallback(date => {
        let day = new Date(date);

        const dayForecast = forecast.filter(item => {
            const forecastDate = new Date(item.dt_txt);
            return day.getDate() === forecastDate.getDate();
        });

        setDayForecast(dayForecast);
    }, [forecast, setDayForecast]);

    useEffect(() => {
        const cityParam = new URLSearchParams(location.search).get("city");
        const dateParam = new URLSearchParams(location.search).get("date");
        setCity(cityParam);
        setDate(dateParam);

        if (!forecast) {
            fetchForecast(cityParam);
        } else {
            updateDayForecast(dateParam);
        }
    }, [location, forecast, fetchForecast, updateDayForecast]);

    let dayForecastContent = null;
    if (dayForecast) {
        dayForecastContent = dayForecast.map(forecast => {
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
            {!dayForecastContent ? "Loading forecast..." : (
                <ul>
                    {dayForecastContent}
                </ul>
            )}
        </div>
    );
};

export default DayForecast;