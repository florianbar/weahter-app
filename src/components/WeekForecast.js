import React from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import moment from 'moment';

import WeatherIcon from '../components/WeatherIcon';

//import styled from 'styled-components';

// const StyledUl = styled.ul`
//     padding: 0;
//     list-style: none;
// `;

// const StyledLi = styled.li`
//     &:hover {
//         cursor: pointer;
//     }

//     .date {
//         color: #1a73e8;
//         font-weight: 700;
//         font-size: 16px;
//     }

//     .condition {
//         text-transform: capitalize;
//         font-style: italic;
//         color: #666;
//     }
// `;

const WeekForecast = ({ history, city, forecast }) => {
    const list = forecast.map(forecast => {
        return (
            <ListGroupItem 
                key={forecast.dt} 
                tag="button"
                action 
                onClick={() => history.push(`/forecast/day?city=${city}&date=${forecast.dt_txt}`)}
            >
                <Row sm="5">
                    <Col>
                        <WeatherIcon 
                            iconCode={forecast.weather[0].icon} 
                            alt={forecast.weather[0].description} 
                        />
                        {moment(forecast.dt_txt).format("HH")}:00
                    </Col>
                    <Col>
                        <div className="date">
                            {moment(forecast.dt_txt).format("dddd DD MMMM YYYY")}
                        </div>
                        <div className="condition">
                            {forecast.weather[0].description}
                        </div>
                    </Col>
                    <Col>
                        <b>Temp High:</b> {parseInt(forecast.main.temp_max / 10)}&#8451;<br />
                        <b>Temp Low:</b> {parseInt(forecast.main.temp_min / 10)}&#8451;<br />
                    </Col>
                    <Col>
                        <b>Wind</b> {forecast.wind.speed} m/s<br />
                        <b>Clouds:</b> {forecast.clouds.all}%
                    </Col>
                </Row>
            </ListGroupItem>
        );
    });

    return (
        <ListGroup>
            {list}
        </ListGroup>
    );
};

export default withRouter(WeekForecast);