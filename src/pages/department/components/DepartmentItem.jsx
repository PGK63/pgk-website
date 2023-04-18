import React from 'react';

const DepartmentItem = (props) => {
    return (
        <div
            className="card text-center mb-3"
            style={{width: "28rem", cursor: "pointer"}}>
            <div className="card-body">
                <h5 className="card-title">{props.department.name}</h5>
            </div>
        </div>
    );
};

export default DepartmentItem;