import React, { useContext, useEffect } from 'react';
import { Row, Col, Button, Spinner } from 'reactstrap';
import moment from 'moment';

import { WeatherContext } from '../context/weather-context';
import HourlyForecast from '../components/HourlyForecast';
import FasIcon from '../components/Icons/FasIcon';

const DayForecast = ({ history, location }) => {
    const city = new URLSearchParams(location.search).get("city");
    const date = new URLSearchParams(location.search).get("date");

    if (!city || !date) {
        // Redirect back home if queryParams don't exist
        history.replace("/");
    }

    const { 
        forecast, 
        fetchForecastData, 
        getDayForecast 
    } = useContext(WeatherContext);

    useEffect(() => {
        // Only fetch forecast data if it hasn't been fetched yet
        if (!forecast) {
            fetchForecastData(city);
        }
    }, [forecast, fetchForecastData, city]);

    let content = (
        <div className="text-center">
            <Spinner color="primary" size="lg" />
        </div>
    );
    if (forecast) {
        content = (
            <HourlyForecast 
                city={city} 
                forecast={getDayForecast(forecast, date)} 
            />
        );
    }

    return (
        <React.Fragment>
            <Row className="mb-3">
                <Col>
                    <h2>
                        {city} <small>| {moment(date).format("dddd DD MMMM YYYY")}</small>
                    </h2>
                </Col>
                <Col sm={{ size: 'auto' }}>
                    <Button 
                        color="primary" 
                        size="sm" 
                        onClick={() => history.push(`/forecast?city=${city}`)}
                    >
                        <FasIcon icon="fa-calendar-day" className="mr-2" />
                        Change Day
                    </Button>
                </Col>
            </Row>
            {content}
        </React.Fragment>
    );
};

export default DayForecast;