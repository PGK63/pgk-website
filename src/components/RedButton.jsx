import React from 'react';

const RedButton = ({children, ...props}) => {
    return (
        <button {...props} style={{
            backgroundColor: "#bb2d3b",
            border: "none",
            padding: "10px 130px",
            color: "#ffffff",
            fontSize: "1.05rem",
            margin: "10px",
            borderRadius: "15px",
            cursor: "pointer",
            textDecoration: "none"
        }}>{children}</button>
    );
};

export default RedButton;