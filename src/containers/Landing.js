import React, { useState } from 'react';

const Landing = ({ history }) => {
    const [city, setCity] = useState(localStorage.getItem("city") || "");

    const submitHandler = city => {
        history.push(`/forecast?city=${city}`);
    };

    return (
        <div>
            <label>Where do you live?</label><br/>
            <input 
                type="text" 
                placeholder="Cape Town"
                value={city}
                onChange={(event) => setCity(event.target.value)} 
            />
            <button onClick={() => submitHandler(city)}>View Forecast</button>
        </div>
    );
};

export default Landing;