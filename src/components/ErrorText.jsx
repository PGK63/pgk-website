import React from 'react';

const ErrorText = ({children, ...props}) => {
    return (
        <h4 {...props} style={{
            margin: "50px",
            color: "red",
            fontWeight: "bold",
            textAlign: "center"
        }}>{children}</h4>
    );
};

export default ErrorText;