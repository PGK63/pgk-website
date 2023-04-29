import React from 'react';
import GroupService from "../../../api/group/GroupService";
import {useNavigate} from "react-router-dom";

const JournalItem = (preps) => {
    const navigate = useNavigate();
    const journal = preps.journal
    const groupId = journal.group.id

    return (
        <div style={{
            padding: "15px",
            background: "#205798",
            borderRadius: "15px",
            height: "300px",
            width: "200px",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            cursor: "pointer"
        }} onClick={() => navigate("/journals/" + journal.id + `/subjects?groupId=${groupId}`)}>
            <div style={{
                padding: "5px",
                background: "white",
                borderRadius: "10px",
                marginBottom: "100px",
                width: "150px",
                textAlign: "center"
            }}>
                <h2 style={{color: "black"}}>{GroupService.getName(journal.group)}</h2>
                <h5 style={{color: "black"}}>{"Курс " + journal.course}</h5>
                <h5 style={{color: "black"}}>{"Семестр " + journal.semester}</h5>
            </div>
        </div>
    );
};

export default JournalItem;