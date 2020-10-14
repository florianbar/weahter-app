import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import Button from '../UI/Button';

const StyledUl = styled.ul`
    padding: 0;
    list-style: none;
`;

const StyledLi = styled.li`
    &:hover {
        cursor: pointer;
    }
    
    .date {
        font-weight: 700;
        color: #1a73e8;
        font-size: 16px;
    }

    .condition {
        text-transform: capitalize;
        font-style: italic;
        color: #666;
    }
`;

const WeatherList = ({ history, city, forecast }) => {
    const clickHandler = date => {
        history.push(`/forecast/day?city=${city}&date=${date}`);
    };

    const getFormattedDate = datetime => {
        let date = new Date(datetime);
        const weekday = date.toLocaleString('default', { weekday: 'long' });
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();
        const day = date.getDate();
        return `${weekday} ${day} ${month} ${year}`;
    };

    const list = forecast.map(forecast => {
        return (
            <StyledLi 
                key={forecast.dt} 
                onClick={() => clickHandler(forecast.dt_txt)}
                className="list-group-item list-group-item-action" 
            >
                <div className="row">
                    <div className="col-4">
                        <span className="date">{getFormattedDate(forecast.dt_txt)}</span><br />
                        <span className="condition">{forecast.weather[0].description}</span><br />
                    </div>
                    <div className="col-4">
                        <b>Temp High:</b> {parseInt(forecast.main.temp_max / 10)}&#8451;<br />
                        <b>Temp Low:</b> {parseInt(forecast.main.temp_min / 10)}&#8451;<br />
                    </div>
                    <div className="col-4">
                        <b>Wind</b> {forecast.wind.speed} m/s<br />
                        <b>Clouds:</b> {forecast.clouds.all}%
                    </div>
                </div>
            </StyledLi>
        );
    });

    return <StyledUl className="list-group">{list}</StyledUl>;
};

export default withRouter(WeatherList);