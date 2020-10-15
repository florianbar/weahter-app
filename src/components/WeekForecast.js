import React from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import moment from 'moment';

import WeatherIcon from './Icons/WeatherIcon';
import FasIcon from './Icons/FasIcon';

const WeekForecast = ({ history, city, forecast }) => {
    const list = forecast.map(forecast => {
        return (
            <ListGroupItem 
                key={forecast.dt} 
                tag="button"
                action 
                onClick={() => history.push(`/forecast/day?city=${city}&date=${forecast.dt_txt}`)}
                className="shadow-sm"
            >
                <Row>
                    <Col sm="6">
                        <Row>
                            <Col sm={{ size: 'auto' }}>
                                <WeatherIcon 
                                    iconCode={forecast.weather[0].icon} 
                                    alt={forecast.weather[0].description} 
                                />
                            </Col>
                            <Col>
                                <div><b>{moment(forecast.dt_txt).format("dddd DD MMMM YYYY")}</b></div>
                                <div className="text-capitalize">{forecast.weather[0].description}</div>
                            </Col>
                        </Row>
                    </Col>
                    <Col sm="3">
                        <div>
                            <FasIcon icon="fa-arrow-up" color="red" className="mr-2" /> 
                            <b>Temp High:</b> {parseInt(forecast.main.temp_max / 10)}&#8451;
                        </div>
                        <div>
                            <FasIcon icon="fa-arrow-down" color="#007bff" className="mr-2" /> 
                            <b>Temp Low:</b> {parseInt(forecast.main.temp_min / 10)}&#8451;
                        </div>
                    </Col>
                    <Col sm="3">
                        <div>
                            <FasIcon icon="fa-wind" color="#07cdff" className="mr-2" />
                            <b>Wind</b> {forecast.wind.speed} m/s
                        </div>
                        <div>
                            <FasIcon icon="fa-cloud" color="#ccc" className="mr-2" />
                            <b>Clouds:</b> {forecast.clouds.all}%
                        </div>
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