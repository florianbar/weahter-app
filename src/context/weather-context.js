import React, { useState, useCallback } from 'react';
import axios from 'axios';

const API_KEY = "d1532124114bf335227917703493e10e";

export const WeatherContext = React.createContext({
    city: "",
    forecast: [],
    fetchForecast: () => {}
});

export default props => {
    const [city, setCity] = useState("");
    const [forecast, setForecast] = useState(null);

    const fetchForecast = useCallback(city => {
        setCity(city);
        localStorage.setItem("city", city);

        axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`)
            .then(response => {
                console.log(response.data);
                setForecast(response.data.list);
            })
            .catch(error => {
                console.log(error);
            });
    }, [setCity, setForecast]);

    return (
        <WeatherContext.Provider value={{
            city: city,
            forecast: forecast,
            fetchForecast: fetchForecast
        }}>
            {props.children}
        </WeatherContext.Provider>
    );
};