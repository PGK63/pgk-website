import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import GroupService from "../../api/group/GroupService";
import Loading from "../../components/Loading";
import GroupNameContainer from "./components/GroupNameContainer";
import ErrorText from "../../components/ErrorText";
import GroupClassroomTeacherContainer from "./components/GroupClassroomTeacherContainer";
import BaseButton from "../../components/BaseButton";
import GroupStudents from "./components/GroupStudents";
import SpecialityItem from "../speciality/components/SpecialityItem";
import UserService from "../../api/user/UserService";
import {UserRole} from "../../api/user/model/UserRole";
import HeadmanService from "../../api/headman/HeadmanService";
import {HistoryType} from "../../api/user/model/HistoryType";
import Modal from "../../components/modal/Modal";
import EvaluationItem from "../journal/components/EvaluationItem";
import Groupmenu from "./components/Gmenu";

const GroupDetailsPage = () => {

    const navigate = useNavigate()
    const groupId = useParams().id
    const [group, setGroup] = useState()
    const [errorText, setErrorText] = useState()
    const [user, setUser] = useState(null)
    const [modal, setModal] = useState(false)
    const [course, setCourse] = useState(0)

    useEffect(() => {
        getGroupsDetails()
    }, [groupId])

    useEffect(() => {
        setUser(UserService.getLocalUser())
    }, [])

    useEffect(() => {
        if(group !== null && group !== undefined){
            UserService.postHistoryItem(
                groupId,
                GroupService.getName(group),
                null,
                HistoryType.GROUP
            )
        }
    }, [group])

    function createRaportichka() {
        if(user !== null){
            if(user.userRole === UserRole.headman || user.userRole === UserRole.deputyHeadman) {
                HeadmanService.createRaportichka().then(r => {
                    navigate(`/raportichka/${r.id}/table`)
                })
            }else {
                GroupService.createRaportichka(groupId).then(r => {
                    navigate(`/raportichka/${r.id}/table`)
                })
            }
        }
    }

    async function getGroupsDetails() {
        try {
            setErrorText(null)
            const response = await GroupService.getById(groupId)
            setGroup(response)
            setCourse(response.course)
        }catch (e) {
            setErrorText(e.message)
        }
    }

    function updateCourse() {
        GroupService.updateCourse(groupId, course).then((r) => {
            setModal(false)
            getGroupsDetails()
        })
    }

    return (
        <div>
            <div className="content">

                <Modal show={modal} handleClose={() => setModal(false)}>
                    <div style={{
                        display: 'flex',
                        justifyContent: "center",
                        width: "100%",
                        textAlign: "center"
                    }}>
                        <div>
                            <h1 style={{marginBottom: "15px"}}>Изменить курс</h1>
                            <div style={{
                                display: 'flex',
                                justifyContent: "center",
                                width: "100%"
                            }}>
                                {[1, 2, 3, 4, 5].map(i =>
                                    <EvaluationItem elevation={i} color={
                                        course === i ? "#205798" : "#919090"
                                    } onClick={() => setCourse(i)}/>
                                )}
                            </div>
                            <BaseButton onClick={updateCourse}>Обновить</BaseButton>
                        </div>
                    </div>
                </Modal>

                { errorText != null &&
                    <ErrorText>{errorText}</ErrorText>
                }
                { group != null &&
                    <div>
                        <GroupNameContainer group={group}/>
                        <div style={{marginLeft:"90%", scale:"150%"}}>
                            <Groupmenu/></div>
                        <div style={{alignItems: "center", display: "flex", justifyContent: "space-around"}}>
                            <GroupClassroomTeacherContainer classroomTeacher={group.classroomTeacher}/>
                            <SpecialityItem speciality={group.speciality}/>
                        </div>
                        <GroupStudents groupId={groupId}/>

                        {/*<div className="card" style={{marginLeft: "50px", marginRight: "50px"}}>*/}
                        {/*    <div className="group-add-buttons" style={{*/}
                        {/*        display: 'flex',*/}
                        {/*        alignItems: "center",*/}
                        {/*        justifyContent: "center"*/}
                        {/*    }}>*/}
                        {/*        <b style={{fontSize:"25px", margin: "10px"}}>Добавить</b>*/}
                        {/*        <BaseButton onClick={() => navigate("/registration/student?groupId=" + groupId)}>Студент</BaseButton>*/}
                        {/*        <BaseButton onClick={() => navigate("/registration/headman?groupId=" + groupId)}>Староста</BaseButton>*/}
                        {/*        <BaseButton onClick={() => navigate("/registration/headmanDeputy?groupId=" + groupId)}>Зам Староста</BaseButton>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </div>
                }
                { errorText === null && group === null &&
                    <Loading/>
                }
            </div>
        </div>
    );
};

export default GroupDetailsPage;