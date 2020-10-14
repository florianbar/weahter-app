import React from 'react';
import styled from 'styled-components';

const StyledLabel = styled.label`
    font-weight: 600;
`;

const styles = `
    display: inline-block;
    width: 100%;
    padding: 10px;
    background-color: #fff;
    border: none;
    border-radius: 5px;
    box-sizing: border-box;
    outline: none;
`;
const StyledInput = styled.input`${styles}`;
const StyledSelect = styled.select`${styles}`;

const Input = ({
    label,
    elementType, 
    type, 
    value, 
    options, 
    change, 
    placeholder
}) => {
    let inputElement = null;

    switch (elementType) {
        case "select":
            inputElement = (
                <StyledSelect 
                    className="form-control"
                    value={value} 
                    onChange={change}
                >
                    {options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </StyledSelect>
            );
            break;

        default:
            inputElement = (
                <StyledInput 
                    className="form-control"
                    type={type}
                    value={value}
                    onChange={change} 
                    placeholder={placeholder}
                />
            );
    }

    return (
        <div className="form-group">
            <StyledLabel className="form-label">{label}</StyledLabel>
            {inputElement}
        </div>
    );
};

export default Input;