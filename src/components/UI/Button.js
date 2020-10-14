import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
    background-color: #1a73e8;

    &:hover {
        background-color: #1666d0;
    }
`;

const Button = ({clicked, children}) => {
    return (
        <StyledButton 
            className="btn btn-primary" 
            onClick={clicked}
        >
            {children}
        </StyledButton>
    );
}

export default Button;