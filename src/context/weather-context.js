import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API_KEY = "d1532124114bf335227917703493e10e";

export const WeatherContext = React.createContext({
    city: "",
    forecastList: [],
    forecastNow: [],
    fetchCityForecast: () => {}
});

export default props => {
    const [city, setCity] = useState("");
    const [forecastList, setForecastList] = useState(null);
    const [forecastNowList, setForecastNowList] = useState(null);

    useEffect(() => {
        if (forecastList) {
            let date = new Date();
            const forecastNowList = forecastList.filter(forecast => {
                const forecastDate = new Date(forecast.dt_txt);
                if (date.getDate() === forecastDate.getDate()) {
                    date.setDate(date.getDate() + 1); // increment day
                    return true;
                }
            });

            setForecastNowList(forecastNowList);
        }
    }, [forecastList, setForecastNowList]);

    const fetchCityForecast = useCallback(city => {
        setCity(city);
        localStorage.setItem("city", city);

        axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`)
            .then(response => {
                console.log(response.data);
                setForecastList(response.data.list);
            })
            .catch(error => {
                console.log(error);
            });
    }, [setCity, setForecastList]);

    return (
        <WeatherContext.Provider value={{
            city: city,
            forecastList: forecastList,
            forecastNowList: forecastNowList,
            fetchCityForecast: fetchCityForecast
        }}>
            {props.children}
        </WeatherContext.Provider>
    );
};