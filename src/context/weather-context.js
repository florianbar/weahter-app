import React, { useState, useCallback } from 'react';
import axios from 'axios';

const API_KEY = "d1532124114bf335227917703493e10e";

export const WeatherContext = React.createContext({
    forecast: [],
    fetchForecast: () => {},
    getCurrentForecast: () => {},
    getDayForecast: () => {}
});

export default props => {
    const [forecast, setForecast] = useState(null);

    const fetchForecast = useCallback(city => {
        localStorage.setItem("city", city);

        axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`)
            .then(response => {
                console.log(response.data);
                setForecast(response.data.list);
            })
            .catch(error => {
                console.log(error);
            });
    }, [setForecast]);

    const getCurrentForecast = forecast => {
        let date = new Date();
        const currentForecast = forecast.filter(item => {
            const forecastDate = new Date(item.dt_txt);
            if (date.getDate() === forecastDate.getDate()) {
                date.setDate(date.getDate() + 1);
                return true;
            }
            return false;
        });

        return currentForecast;
    };

    const getDayForecast = (forecast, date) => {
        let day = new Date(date);

        const dayForecast = forecast.filter(item => {
            const forecastDate = new Date(item.dt_txt);
            return day.getDate() === forecastDate.getDate();
        });

        return dayForecast;
    };

    return (
        <WeatherContext.Provider value={{
            forecast: forecast,
            fetchForecast: fetchForecast,
            getCurrentForecast: getCurrentForecast,
            getDayForecast: getDayForecast
        }}>
            {props.children}
        </WeatherContext.Provider>
    );
};