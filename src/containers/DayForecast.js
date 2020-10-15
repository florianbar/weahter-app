import React, { useContext, useEffect } from 'react';
import { Row, Col, Button, Spinner } from 'reactstrap';
import moment from 'moment';

import { WeatherContext } from '../context/weather-context';
import HourlyForecast from '../components/HourlyForecast';
import FasIcon from '../components/Icons/FasIcon';
import RechartAreaChart from '../components/Recharts/AreaChart';

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
        const dayForecast = getDayForecast(forecast, date);
        const chartData = dayForecast.map(forecast => {
            return {
                name: moment(forecast.dt_txt).format("HH") + ":00",
                uv: parseInt(forecast.main.temp_max / 10)
            };
        });
        content = (
            <React.Fragment>
                <Row>
                    <Col>
                        <div className="mb-3">
                            <h4 className="mb-3">Weather Map</h4>
                            Map goes here
                        </div>
                        <div className="mb-3">
                            <h4 className="mb-3">Temperature</h4>
                            <RechartAreaChart data={chartData} />
                        </div>
                    </Col>
                    <Col>
                        <h4 className="mb-3">Hourly</h4>
                        <HourlyForecast city={city} forecast={dayForecast} />
                    </Col>
                </Row>
            </React.Fragment>
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