import React, {useEffect, useState} from 'react';
import MainHeader from "../../components/mainHeader/MainHeader";
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

const GroupDetailsPage = () => {

    const navigate = useNavigate()
    const groupId = useParams().id
    const [group, setGroup] = useState()
    const [errorText, setErrorText] = useState()
    const [user, setUser] = useState(null)

    useEffect(() => {
        getGroupsDetails()
    }, [groupId])

    useEffect(() => {
        setUser(UserService.getLocalUser())
    }, [])

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
            const response = await GroupService.getById(groupId)
            setGroup(response)
        }catch (e) {
            setErrorText(e.message)
        }
    }

    return (
        <div>
            <MainHeader/>

            <div className="content">
                { errorText != null &&
                    <ErrorText>{errorText}</ErrorText>
                }
                { group != null &&
                    <div>
                        <GroupNameContainer group={group}/>
                        <div className="card" style={{marginLeft: "50px", marginRight: "50px"}}>
                            <div className="group-add-buttons" style={{
                                display: 'flex',
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                                <b style={{fontSize:"25px", margin: "10px"}}>Добавить</b>
                                <BaseButton onClick={() => navigate("/registration/student")}>Студент</BaseButton>
                                <BaseButton onClick={() => navigate("/registration/headman")}>Староста</BaseButton>
                                <BaseButton onClick={() => navigate("/registration/headmanDeputy")}>Зам Староста</BaseButton>
                            </div>
                        </div>

                        <div className="card" style={{marginTop: "10px", marginLeft: "50px", marginRight: "50px"}}>
                            <div className="group-other-buttons" style={{
                                display: 'flex',
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                                <BaseButton>Изменить курс</BaseButton>
                                <BaseButton onClick={() => navigate(`/groups/${groupId}/journal/create`)}>Добавить журнал</BaseButton>
                                <BaseButton onClick={createRaportichka}>Создать рапортичку</BaseButton>
                            </div>
                        </div>
                        <div style={{alignItems: "center", display: "flex", justifyContent: "space-around"}}>
                            <GroupClassroomTeacherContainer classroomTeacher={group.classroomTeacher}/>
                            <SpecialityItem speciality={group.speciality}/>
                        </div>
                        <GroupStudents groupId={groupId}/>
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