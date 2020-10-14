import React, { useEffect, useState } from 'react';
import IPGeolocationAPI from 'ip-geolocation-api-javascript-sdk';

import Input from '../components/UI/Input';
import Button from '../components/UI/Button';
import Spinner from '../components/UI/Spinner';

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
        <div className="row">
            <div className="col-sm-6 offset-sm-3">
                <h3 className="mt-4">Where do you live?</h3>
                {loading ? <Spinner /> : (
                    <form onSubmit={submitHandler}>
                        <Input 
                            type="text" 
                            placeholder="Cape Town"
                            value={city}
                            change={event => setCity(event.target.value)} 
                        />
                        <Button>View Forecast</Button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Landing;