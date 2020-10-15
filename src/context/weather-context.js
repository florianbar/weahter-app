import React, { useState, useCallback } from 'react';
import axios from 'axios';

export const WeatherContext = React.createContext({
    forecast: [],
    fetchForecastData: () => {},
    getWeekForecast: () => {},
    getDayForecast: () => {}
});

export default props => {
    const [forecast, setForecast] = useState(null);

    const fetchForecastData = useCallback(city => {
        const queryParams = `?q=${city}&appid=${process.env.REACT_APP_OPENWEATHER_APP_KEY}&units=metric`;
        axios.get("https://api.openweathermap.org/data/2.5/forecast" + queryParams)
            .then(response => {
                console.log(response.data);
                setForecast(response.data.list);
            })
            .catch(error => {
                console.log(error);
            });
    }, [setForecast]);

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

    return (
        <WeatherContext.Provider value={{
            forecast: forecast,
            fetchForecastData: fetchForecastData,
            getWeekForecast: getWeekForecast,
            getDayForecast: getDayForecast
        }}>
            {props.children}
        </WeatherContext.Provider>
    );
};