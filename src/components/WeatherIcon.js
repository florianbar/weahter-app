import React from 'react';

const WeatherIcon = ({ iconCode, altText, size }) => {
    return (
        <img 
            src={`http://openweathermap.org/img/w/${iconCode}.png`}
            alt={altText} 
            style={size ? { width: "30px" } : null}
        />
    );
};

export default WeatherIcon;