import React, { useContext, useEffect } from 'react';
import { Redirect} from 'react-router-dom';
import { Row, Col, Button, Spinner } from 'reactstrap';

import { WeatherContext } from '../context/weather-context';
import WeekForecast from '../components/WeekForecast';
import FasIcon from '../components/Icons/FasIcon';

const Forecast = ({ history, location }) => {
    const cityParam = new URLSearchParams(location.search).get("city");
    
    const { forecast, error, fetchForecastData, getWeekForecast } = useContext(WeatherContext);

    useEffect(() => {
        fetchForecastData(cityParam);
    }, [fetchForecastData, cityParam]);

    let content = (
        <div className="text-center">
            <Spinner color="primary" size="lg" />
        </div>
    );
    if (forecast) {
        content = (
            <React.Fragment>
                <Row className="mb-3">
                    <Col>
                        <h2>{cityParam}</h2>
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
                <WeekForecast 
                    city={cityParam} 
                    forecast={getWeekForecast(forecast)} 
                />
            </React.Fragment>
        );
    }

    return (!cityParam || error) ? <Redirect to="/" /> : content;
};

export default Forecast;