import React from 'react';

const EvaluationItem = (preps) => {

    const color = preps.color

    return (
        <button style={{
            width: "50px",
            height: "50px",
            background: color,
            justifyContent: "center",
            display: "flex",
            borderRadius: "10px",
            alignContent: "center",
            marginLeft: "10px",
            marginRight: "10px",
            marginTop: "20px",
            marginBottom: "20px",
            paddingTop: "8px",
            borderColor: "transparent"
        }} onClick={preps.onClick}>
            <h3 style={{
                color: "white"
            }}>{preps.elevation}</h3>
        </button>
    );
};

export default EvaluationItem;