import React, { useState, useCallback } from 'react';
import axios from 'axios';

export const WeatherContext = React.createContext({
    city: null,
    forecast: [],
    error: false,
    clearErrorMessage: () => {},
    fetchForecastData: () => {},
    getWeekForecast: () => {},
    getDayForecast: () => {}
});

export default ({ children }) => {
    const [city, setCity] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [error, setError] = useState(null);

    const fetchForecastData = useCallback(cityName => {
        setCity(null);
        setForecast(null);
        setError(false);

        const queryParams = `?q=${cityName}&appid=${process.env.REACT_APP_OPENWEATHER_APP_KEY}&units=metric`;
        //console.log(queryParams);
        axios.get("https://api.openweathermap.org/data/2.5/forecast" + queryParams)
            .then(response => {
                localStorage.setItem("city", cityName);
                setCity(cityName);
                setForecast(response.data.list);
            })
            .catch(error => {
                setError(error.response.data.message);
            });
    }, [setCity, setForecast, setError]);

    const getWeekForecast = forecast => {
        let date = new Date(forecast[0].dt_txt);

        return forecast.filter(item => {
            const forecastDate = new Date(item.dt_txt);
            if (date.getHours() === forecastDate.getHours()) {
                date.setDate(date.getDate() + 1);
                return true;
            }
            return false;
        });
    };

    const getDayForecast = (forecast, date) => {
        let day = new Date(date);

        return forecast.filter(item => {
            const forecastDate = new Date(item.dt_txt);
            return day.getDate() === forecastDate.getDate();
        });
    };

    const clearErrorMessage = () => {
        setError(null);
    };

    return (
        <WeatherContext.Provider value={{
            city: city,
            forecast: forecast,
            error: error,
            clearErrorMessage: clearErrorMessage,
            fetchForecastData: fetchForecastData,
            getWeekForecast: getWeekForecast,
            getDayForecast: getDayForecast
        }}>
            {children}
        </WeatherContext.Provider>
    );
};