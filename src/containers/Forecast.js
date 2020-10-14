import React, { useContext, useEffect } from 'react';

import { WeatherContext } from '../context/weather-context';
import WeatherList from '../components/WeatherList';
import Button from '../components/UI/Button';
import Spinner from '../components/UI/Spinner';

const Forecast = ({ history, location }) => {
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
                    <h1>{city}</h1>
                </div>
                <div className="col-sm-auto">
                    <Button size="sm" clicked={() => history.push('/')}>Change Location</Button>
                </div>
            </div>
            
            {!forecast ? <Spinner /> : <WeatherList city={city} forecast={weekForecast} /> }
        </div>
    );
};

export default Forecast;