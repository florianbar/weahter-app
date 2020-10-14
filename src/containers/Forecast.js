import React, { useContext, useEffect } from 'react';
import { Row, Col, Button, Spinner } from 'reactstrap';

import { WeatherContext } from '../context/weather-context';
import WeekForecast from '../components/WeekForecast';
import FasIcon from '../components/FasIcon';

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
                    <h2>{city}</h2>
                </Col>
                <Col sm={{ size: 'auto' }}>
                    <Button 
                        color="primary" 
                        size="sm" 
                        onClick={() => history.push('/')}
                    >
                        <FasIcon icon="fa-location-arrow" className="mr-2" />
                        Change Location
                    </Button>
                </Col>
            </Row>
            {content}
        </React.Fragment>
    );
};

export default Forecast;