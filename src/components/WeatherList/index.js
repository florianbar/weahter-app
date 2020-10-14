import React from 'react';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import styled from 'styled-components';

const StyledUl = styled.ul`
    padding: 0;
    list-style: none;
`;

const StyledLi = styled.li`
    &:hover {
        cursor: pointer;
    }

    .date {
        color: #1a73e8;
        font-weight: 700;
        font-size: 16px;
    }

    .condition {
        text-transform: capitalize;
        font-style: italic;
        color: #666;
    }
`;

const WeatherList = ({ history, city, forecast }) => {
    const list = forecast.map(forecast => {
        return (
            <StyledLi 
                key={forecast.dt} 
                onClick={() => history.push(`/forecast/day?city=${city}&date=${forecast.dt_txt}`)}
                className="list-group-item list-group-item-action" 
            >
                <div className="row">
                    <div className="col-sm-4">
                        <div className="date">
                            {moment(forecast.dt_txt).format("dddd DD MMMM YYYY")}
                        </div>
                        <div className="condition">
                            {forecast.weather[0].description}
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <b>Temp High:</b> {parseInt(forecast.main.temp_max / 10)}&#8451;<br />
                        <b>Temp Low:</b> {parseInt(forecast.main.temp_min / 10)}&#8451;<br />
                    </div>
                    <div className="col-sm-4">
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