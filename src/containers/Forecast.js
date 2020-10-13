import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { WeatherContext } from '../context/weather-context';

const Forecast = ({ location }) => {
    const { city, forecast, fetchForecast } = useContext(WeatherContext);

    useEffect(() => {
        const cityParam = new URLSearchParams(location.search).get("city");
        fetchForecast(cityParam);
    }, [location, fetchForecast]);

    let forecastList = null;
    if (forecast) {
        let date = new Date();
        const currentForecast = forecast.filter(item => {
            const forecastDate = new Date(item.dt_txt);
            if (date.getDate() === forecastDate.getDate()) {
                date.setDate(date.getDate() + 1); // increment day
                return true;
            }
            return false;
        });

        forecastList = currentForecast.map(forecast => {
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