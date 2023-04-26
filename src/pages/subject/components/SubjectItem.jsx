import React from 'react';

const SubjectItem = (props) => {
    const subject = props.subject
    const borderColor = props.isCurrent === true ? "#205798" : "#d2d2d2"

    return (
        <div className="card" style={{width: "18rem", borderColor: borderColor, cursor: "pointer"}} onClick={props.onClick}>
            <div className="card-body">
                {subject.subjectTitle}
            </div>
        </div>
    );
};

export default SubjectItem;