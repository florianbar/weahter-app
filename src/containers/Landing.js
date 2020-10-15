import React, { useEffect, useState, useContext } from 'react';
import { Row, Col, Button, Form, InputGroup, Input, InputGroupAddon, Spinner, FormFeedback } from 'reactstrap';
import IPGeolocationAPI from 'ip-geolocation-api-javascript-sdk';

import { WeatherContext } from '../context/weather-context';
import FasIcon from '../components/Icons/FasIcon';

const Landing = ({ history }) => {
    const [city, setCity] = useState(localStorage.getItem("city") || "");
    const [touched, setTouched] = useState(false);
    const [loading, setLoading] = useState(false);

    const { error, clearErrorMessage } = useContext(WeatherContext);

    useEffect(() => {
        // Fetch City name with IPGeolocationAPI
        if (!city && !touched) {
            setLoading(true);

            var ipgeolocationApi = new IPGeolocationAPI(process.env.REACT_APP_IPGEOLOCATION_API_KEY, false); 
            ipgeolocationApi.getGeolocation(response => {
                setCity(response.city);
                setLoading(false);
            });
        }
    }, [city, touched, setCity, setLoading]);

    const submitHandler = event => {
        event.preventDefault();
        clearErrorMessage();
        history.push(`/forecast?city=${city}`);
    };

    const changeCityHandler = event => {
        clearErrorMessage();
        setCity(event.target.value);
        setTouched(true);
    };

    let content = <Spinner color="primary" size="lg" />;
    if (!loading) {
        content = (
            <Form onSubmit={submitHandler}>
                <InputGroup >
                    <Input 
                        { ...(error ? {invalid: true} : {}) }
                        value={city} 
                        onChange={changeCityHandler} 
                        placeholder="Your city"
                        bsSize="lg" 
                    />
                    <InputGroupAddon addonType="append">
                        <Button color="primary">
                            <FasIcon icon="fa-search" className="mr-1" /> Search
                        </Button>
                    </InputGroupAddon>
                    { error && <FormFeedback className="text-capitalize">{error}</FormFeedback> }
                </InputGroup>
            </Form>
        );
    }

    return (
        <Row className="mt-4">
            <Col sm={{ size: 6, offset: 3 }}>
                <h3 className="text-center mb-3">Where do you live?</h3>
                {content}
            </Col>
        </Row>
    );
};

export default Landing;