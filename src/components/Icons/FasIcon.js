import React from 'react';

const FasIcon = ({ icon, color, className }) => {
    return (
        <i 
            className={`fas ${icon} ${className}`} 
            style={color ? { "color": color } : null}
        />
    );
};

export default FasIcon;