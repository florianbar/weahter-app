import React, { useEffect, useState } from 'react';
import IPGeolocationAPI from 'ip-geolocation-api-javascript-sdk';

const Landing = ({ history }) => {
    const [city, setCity] = useState(localStorage.getItem("city") || "");

    useEffect(() => {
        if (!city) {
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
                <label>Where do you live?</label><br/>
                <input 
                    type="text" 
                    placeholder="Cape Town"
                    value={city}
                    onChange={event => setCity(event.target.value)} 
                />
                <button>View Forecast</button>
            </form>
        </div>
    );
};

export default Landing;