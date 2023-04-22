import React from 'react';
import UserService from "../../../api/user/UserService";
import {useNavigate} from "react-router-dom";

const JournalSubjectItem = (preps) => {
    const navigate = useNavigate();
    const journalSubject = preps.journalSubject
    const journalId = preps.journalId
    const groupId = preps.groupId

    const url = `/journals/${journalId}/subjects/${journalSubject.id}/table?groupId=${groupId}`

    return (
        <div>
            <div className="card" style={{cursor: "pointer"}} onClick={() => navigate(url)}>
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