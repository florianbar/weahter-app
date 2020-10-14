import React from 'react';

const WeatherIcon = ({ iconCode, altText }) => {
    return (
        <img 
            src={`http://openweathermap.org/img/w/${iconCode}.png`}
            alt={altText} 
        />
    );
};

export default WeatherIcon;