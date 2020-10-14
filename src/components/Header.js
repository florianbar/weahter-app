import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.div`
    margin: 0 0 20px;
    padding: 20px 0;
    box-shadow: 0 1px 5px 0 rgba(0,0,0,0.2);
    background-color: #fff;
`;

const StyledLogo = styled.h1`
    margin: 0;
    padding: 0;
    font-size: 18px;
    color: #1a73e8;
`;

const Header = () => {
    return (
        <StyledHeader>
            <div className="container">
                <StyledLogo>My Weather App</StyledLogo>
            </div>
        </StyledHeader>
    );
};

export default Header;