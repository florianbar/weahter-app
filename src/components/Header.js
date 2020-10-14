import React from 'react';
import styled from 'styled-components';

const Header = () => {
    const Header = styled.div`
        margin: 0 0 20px;
        padding: 20px;
        box-shadow: 0 1px 5px 0 rgba(0,0,0,0.2);
    `;

    const Logo = styled.h1`
        margin: 0;
        padding: 0;
        font-size: 20px;
        color: #1a73e8;
    `;

    return (
        <Header>
            <Logo>Weather App</Logo>
        </Header>
    );
};

export default Header;