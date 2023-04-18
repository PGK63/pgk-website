import React from 'react';
import GroupService from "../../../api/group/GroupService";
import TeacherService from "../../../api/teacher/TeacherService";
import {useNavigate} from "react-router-dom";

const GroupItem = (props) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate("/groups/" + props.group.id)}
            className="card text-center mb-3"
            style={{width: "18rem", cursor: "pointer"}}>
            <div className="card-body">
                <h5 className="card-title">{GroupService.getName(props.group)}</h5>
                <p className="card-text">{TeacherService.getName(props.group.classroomTeacher)}</p>
            </div>
        </div>
    );
};

export default GroupItem;