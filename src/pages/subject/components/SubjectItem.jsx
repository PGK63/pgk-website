import React from 'react';

const SubjectItem = (props) => {
    const subject = props.subject

    return (
        <div className="card" style={{width: "18rem"}}>
            <div className="card-body">
                {subject.subjectTitle}
            </div>
        </div>
    );
};

export default SubjectItem;