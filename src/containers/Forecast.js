import React, { useContext, useEffect } from 'react';

import { WeatherContext } from '../context/weather-context';

const Forecast = ({ location }) => {
    const { city, forecastNowList, fetchCityForecast } = useContext(WeatherContext);

    useEffect(() => {
        const cityName = new URLSearchParams(location.search).get("city");
        fetchCityForecast(cityName);
    }, [location, fetchCityForecast]);

    let forecastContent = "Loading forecast...";
    if (forecastNowList) {
        forecastContent = forecastNowList.map(forecast => {
            return (
                <div key={forecast.dt}>
                    {forecast.dt_txt}
                    {forecast.weather[0].description}
                </div>
            );
        });
    }

    return (
        <div>
            <h1>{city}</h1>
            {forecastContent}
        </div>
    );
};

export default Forecast;