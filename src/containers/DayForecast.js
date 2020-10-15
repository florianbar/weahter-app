import React, { useContext, useEffect } from 'react';
import { Redirect} from 'react-router-dom';
import { Row, Col, Button, Spinner } from 'reactstrap';
import moment from 'moment';

import { WeatherContext } from '../context/weather-context';
import HourlyForecast from '../components/HourlyForecast';
import FasIcon from '../components/Icons/FasIcon';
import RechartAreaChart from '../components/Recharts/AreaChart';

const DayForecast = ({ history, location }) => {
    const cityParam = new URLSearchParams(location.search).get("city");
    const dateParam = new URLSearchParams(location.search).get("date");

    const { forecast, error, fetchForecastData, getDayForecast } = useContext(WeatherContext);

    useEffect(() => {
        if (!forecast) {
            fetchForecastData(cityParam);
        }
    }, [forecast, cityParam, fetchForecastData]);

    let content = (
        <div className="text-center">
            <Spinner color="primary" size="lg" />
        </div>
    );
    if (forecast) {
        const dayForecast = getDayForecast(forecast, dateParam);
        const chartData = dayForecast.map(forecast => {
            return {
                name: moment(forecast.dt_txt).format("HH") + ":00",
                uv: parseInt(forecast.main.temp_max)
            };
        });
        content = (
            <React.Fragment>
                <Row className="mb-3">
                    <Col>
                        <h2>
                            {cityParam} <small>| {moment(dateParam).format("dddd DD MMMM YYYY")}</small>
                        </h2>
                    </Col>
                    <Col sm={{ size: 'auto' }}>
                        <Button 
                            color="primary" 
                            size="sm" 
                            onClick={() => history.push(`/forecast?city=${cityParam}`)}
                        >
                            <FasIcon icon="fa-calendar-day" className="mr-2" />
                            Change Day
                        </Button>
                    </Col>
                </Row>
                <div className="mb-3">
                    <h4 className="mb-3">Temperature</h4>
                    <RechartAreaChart data={chartData} />
                </div>
                <h4 className="mb-3">Hourly</h4>
                <HourlyForecast city={cityParam} forecast={dayForecast} />
            </React.Fragment>
        );
    }

    return (!cityParam || !dateParam || error) ? <Redirect to="/" /> : content;
};

export default DayForecast;