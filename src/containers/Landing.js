import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Form, InputGroup, Input, InputGroupAddon, Spinner } from 'reactstrap';
import IPGeolocationAPI from 'ip-geolocation-api-javascript-sdk';

const Landing = ({ history }) => {
    const [city, setCity] = useState(localStorage.getItem("city") || "");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch City name with IPGeolocationAPI
        if (!city && !localStorage.getItem("city")) {
            var ipgeolocationApi = new IPGeolocationAPI(process.env.REACT_APP_IPGEOLOCATION_API_KEY, false); 
            ipgeolocationApi.getGeolocation(response => {
                setCity(response.city);
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    }, [city, setCity, setLoading]);

    const submitHandler = event => {
        event.preventDefault();
        localStorage.setItem("city", city);
        history.push(`/forecast?city=${city}`);
    };

    return (
        <Row className="mt-4">
            <Col sm={{ size: 6, offset: 3 }}>
                <h3 className="mb-4 text-center">Where do you live?</h3>
                {loading ? <Spinner color="primary" size="lg" /> : (
                    <Form onSubmit={submitHandler}>
                         <InputGroup>
                            <Input 
                                value={city} 
                                onChange={event => setCity(event.target.value)} 
                                placeholder="Your city" 
                            />
                            <InputGroupAddon addonType="append">
                                <Button color="primary">View Forecast</Button>
                            </InputGroupAddon>
                        </InputGroup>
                    </Form>
                )}
            </Col>
        </Row>
    );
};

export default Landing;