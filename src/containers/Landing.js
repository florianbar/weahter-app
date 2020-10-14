import React, { useEffect, useState } from 'react';
import IPGeolocationAPI from 'ip-geolocation-api-javascript-sdk';

import Input from '../components/UI/Input';
import Button from '../components/UI/Button';

const Landing = ({ history }) => {
    const [city, setCity] = useState(localStorage.getItem("city") || "");

    useEffect(() => {
        if (!city && !localStorage.getItem("city")) {
            var ipgeolocationApi = new IPGeolocationAPI(process.env.REACT_APP_IPGEOLOCATION_API_KEY, false); 
            ipgeolocationApi.getGeolocation(response => {
                setCity(response.city);
            });
        }
    }, [city, setCity]);

    const submitHandler = event => {
        event.preventDefault();
        localStorage.setItem("city", city);
        history.push(`/forecast?city=${city}`);
    };

    return (
        <div>
            <form onSubmit={submitHandler}>
                <Input 
                    label="Where do you live?"
                    type="text" 
                    placeholder="Cape Town"
                    value={city}
                    change={event => setCity(event.target.value)} 
                />
                <Button>View Forecast</Button>
            </form>
        </div>
    );
};

export default Landing;