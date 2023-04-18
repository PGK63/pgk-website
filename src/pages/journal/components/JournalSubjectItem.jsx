import React from 'react';
import UserService from "../../../api/user/UserService";

const JournalSubjectItem = (preps) => {

    const journalSubject = preps.journalSubject

    return (
        <div>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{journalSubject.subject.subjectTitle}</h5>
                    <h5 className="card-title">{"(" + UserService.getFIOShort(journalSubject.teacher) + ")"}</h5>
                    <h5 className="card-title">{"Количество часов " + journalSubject.hours}</h5>
                </div>
            </div>
        </div>
    );
};

export default JournalSubjectItem;