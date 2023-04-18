import React from 'react';

const Loading = () => {
    return (
        <div style={{width: "10%", margin: "0 auto", marginTop:"50px"}}>
            <div className="spinner-grow text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
};

export default Loading;