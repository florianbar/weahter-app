import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { WeatherContext } from '../context/weather-context';
import WeatherList from '../components/WeatherList';

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

    let weekForecast = forecast ? getWeekForecast(forecast) : null;

    return (
        <div>
            <div className="row mb-3">
                <div className="col-sm">
                    <h1>Forecast for {city}</h1>
                </div>
                <div className="col-sm-auto">
                    <Link to="/" className="btn btn-sm btn-secondary mt-3">Change Location</Link>
                </div>
            </div>
            
            {!forecast ? "Loading forecast..." : <WeatherList city={city} forecast={weekForecast} /> }
        </div>
    );
};

export default Forecast;