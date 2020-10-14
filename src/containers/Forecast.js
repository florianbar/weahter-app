import React, { useContext, useEffect } from 'react';
import { Row, Col, Button, Spinner } from 'reactstrap';

import { WeatherContext } from '../context/weather-context';
import WeekForecast from '../components/WeekForecast';

const Forecast = ({ history, location }) => {
    const city = new URLSearchParams(location.search).get("city");

    const { 
        forecast, 
        fetchForecastData, 
        getWeekForecast 
    } = useContext(WeatherContext);

    useEffect(() => {
        fetchForecastData(city);
    }, [fetchForecastData, city]);

    let content = (
        <div className="text-center">
            <Spinner color="primary" size="lg" />
        </div>
    );
    if (forecast) {
        content = (
            <WeekForecast 
                city={city} 
                forecast={getWeekForecast(forecast)} 
            />
        );
    }

    return (
        <React.Fragment>
            <Row className="mb-3">
                <Col>
                    <h1>{city}</h1>
                </Col>
                <Col sm={{ size: 'auto' }}>
                    <Button 
                        color="primary" 
                        size="sm" 
                        onClick={() => history.push('/')}
                    >Change location</Button>
                </Col>
            </Row>
            {content}
        </React.Fragment>
    );
};

export default Forecast;