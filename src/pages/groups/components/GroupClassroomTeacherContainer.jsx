import React from 'react';
import UserService from "../../../api/user/UserService";

const GroupClassroomTeacherContainer = (props) => {

    const classroomTeacher = props.classroomTeacher

    return (
        <div style={{margin: "30px", alignItems: "center", justifyContent: "center"}}>
            <div className="card" style={{width: "40rem"}}>
                <div className="card-body" style={{textAlign: "center"}}>
                    <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                        <img src={
                            classroomTeacher.photoUrl == null
                                ? require("../../../resources/icons/profile_photo.png")
                                : classroomTeacher.photoUrl
                        } style={{borderRadius: "10px", width: "200px"}}/>
                        <div style={{textAlign: "center"}}>
                            <p style={{fontSize: "1.8em", margin: "10px"}}>{UserService.getFIOFull(classroomTeacher)}</p>
                            <p style={{fontSize: "1.2em", margin: "10px", fontWeight: "bold"}}>Куратор</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GroupClassroomTeacherContainer;