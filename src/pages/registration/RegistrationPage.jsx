import React, {useEffect, useRef, useState} from 'react';
import "./RegistrationPage.css";
import {Player} from "@lottiefiles/react-lottie-player";
import MainHeader from "../../components/mainHeader/MainHeader";
import {useParams} from "react-router-dom";
import DirectorService from "../../api/director/DirectorService";
import TeacherService from "../../api/teacher/TeacherService";
import DepartmentHeadService from "../../api/departmentHead/DepartmentHeadService";
import EducationalSectorService from "../../api/educationalSector/EducationalSectorService";
import GroupService from "../../api/group/GroupService";
import {useFetching} from "../../hooks/useFetching";
import {useObserver} from "../../hooks/useObserver";
import GroupItem from "../groups/components/GroupItem";

function RegistrationPage() {

    const role = useParams().role
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [middleName, setMiddleName] = useState("")
    const [password, setPassword] = useState("")
    const [errorText, setErrorText] = useState("")
    const [groups, setGroups] = useState([])
    const [pageGroup, setPageGroup] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const lastElement = useRef()

    const [fetchGroups, isGroupLoading] = useFetching(async () => {
        const response = await GroupService.getAll(pageGroup);
        if(response != null){
            setGroups([...groups, ...response.results])
        }
    })

    useObserver(lastElement, true, isGroupLoading, () => {
        setPageGroup(pageGroup + 1)
    })

    useEffect(() => {
        if(role === "student"){
            fetchGroups()
        }
    }, [role, pageGroup])
    
    function registration() {
        setErrorText("")
        setIsLoading(true)

        if(role === "director"){
            DirectorService.registration(firstName, lastName, middleName).then((r) => {
                setPassword(r.passowrd)
                setIsLoading(false)
            }).catch(() => {
                setErrorText("Произошла ошибка")
                setIsLoading(false)
            })
        }else if(role === "teacher"){
            TeacherService.registration(firstName, lastName, middleName).then((r) => {
                setPassword(r.passowrd)
                setIsLoading(false)
            }).catch(() => {
                setErrorText("Произошла ошибка")
                setIsLoading(false)
            })
        }else if(role === "department_head"){
            DepartmentHeadService.registration(firstName, lastName, middleName).then((r) => {
                setPassword(r.passowrd)
                setIsLoading(false)
            }).catch(() => {
                setErrorText("Произошла ошибка")
                setIsLoading(false)
            })
        }else if(role === "educational_sector"){
            EducationalSectorService.registration(firstName, lastName, middleName).then((r) => {
                setPassword(r.passowrd)
                setIsLoading(false)
            }).catch(() => {
                setErrorText("Произошла ошибка")
                setIsLoading(false)
            })
        }else if(role === "student"){

        }
    }

    return (
        <div>
            <MainHeader/>

            <div style={{
                marginLeft: "auto",
                marginRight: "auto",
                width: "28%"
            }}>
                <Player
                    autoplay={true}
                    src="https://assets1.lottiefiles.com/packages/lf20_jcikwtux.json"
                    style={{ height: '360px', width: '360px'}}/>

                { password !== ""
                    ? <div>
                        <h3 style={{margin: "10px"}}>Пароль для входа <b>{password}</b></h3>
                    </div>
                    : <div>
                        <h1 style={{
                            width: "100%",
                            textAlign: "center"
                        }}>Регистрация</h1>

                        { errorText &&
                            <h4 style={{
                                margin: "10px",
                                color: "red",
                                textAlign: "center",
                                width: "100%"
                            }}>{errorText}</h4>
                        }

                        { role === "headman" || role === "headmanDeputy"
                            ? <div>

                            </div>
                            : <div>
                                <div className="form-floating">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Имя"
                                        value={firstName}
                                        onChange={event => setFirstName(event.target.value)}
                                    />
                                    <label htmlFor="firstName">Имя</label>
                                </div>

                                <div className="form-floating">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="lastName"
                                        placeholder="Фамилия"
                                        value={lastName}
                                        onChange={event => setLastName(event.target.value)}
                                    />
                                    <label htmlFor="lastName">Фамилия</label>
                                </div>

                                <div className="form-floating">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="middleName"
                                        placeholder="Отчество"
                                        value={middleName}
                                        onChange={event => setMiddleName(event.target.value)}
                                    />
                                    <label htmlFor="lastName">Отчество</label>
                                </div>

                                { role === "student" &&
                                    <div>
                                        <li style={{display: "flex"}}>{
                                            groups.map(group =>
                                                <ul style={{
                                                    verticalAlign: "top",
                                                    margin: "10px"
                                                }}>
                                                    <GroupItem group={group}/>
                                                </ul>
                                            )
                                        }<ul style={{
                                            verticalAlign: "top",
                                            margin: "10px"
                                        }}>
                                            <div ref={lastElement} style={{width: 20}}/>
                                        </ul></li>
                                    </div>
                                }
                            </div>
                        }

                        { isLoading
                            ? <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            : <button style={{
                                backgroundColor: "#205798",
                                border: "none",
                                padding: "10px 130px",
                                color: "#ffffff",
                                fontSize: "1.05rem",
                                marginTop: "15px",
                                borderRadius: "15px",
                                cursor: "pointer",
                                textDecoration:" none"
                            }} onClick={registration}>Зарегистрировать</button>
                        }
                    </div>
                }
            </div>

            { role !== "student" &&
                <div ref={lastElement} style={{height: 20}}/>
            }
        </div>
    );
}
export default RegistrationPage;