import React from 'react';
import { Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import moment from 'moment';

import WeatherIcon from './Icons/WeatherIcon';
import FasIcon from './Icons/FasIcon';

const HourlyForecast = ({ forecast }) => {
    const list = forecast.map(forecast => {
        return (
            <ListGroupItem 
                key={forecast.dt}
                className="font-13"
            >
                <Row>
                    <Col sm="6">
                        <Row>
                            <Col sm={{ size: 'auto' }}>
                                <WeatherIcon 
                                    iconCode={forecast.weather[0].icon} 
                                    alt={forecast.weather[0].description} 
                                    size="sm"
                                />
                            </Col>
                            <Col>
                                <FasIcon icon="fa-clock" color="#ccc" className="mr-2" />
                                <b>{moment(forecast.dt_txt).format("HH")}:00</b><br />
                                <span className="text-capitalize">{forecast.weather[0].description}</span>
                            </Col>
                        </Row>
                    </Col>
                    <Col>
                        <FasIcon icon="fa-arrow-up" color="red" className="mr-2" /> 
                        {parseInt(forecast.main.temp_max / 10)}&#8451;<br />
                        <FasIcon icon="fa-arrow-down" color="#007bff" className="mr-2" /> 
                        {parseInt(forecast.main.temp_min / 10)}&#8451;
                    </Col>
                    <Col>
                        <FasIcon icon="fa-wind" color="#07cdff" className="mr-2" />
                        {forecast.wind.speed} m/s<br />
                        <FasIcon icon="fa-cloud" color="#ccc" className="mr-2" />
                        {forecast.clouds.all}%
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

export default HourlyForecast;