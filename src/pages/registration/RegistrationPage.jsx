import React, {useEffect, useState} from 'react';
import "./RegistrationPage.css";
import {Player} from "@lottiefiles/react-lottie-player";
import MainHeader from "../../components/mainHeader/MainHeader";
import {useLocation, useParams} from "react-router-dom";
import DirectorService from "../../api/director/DirectorService";
import TeacherService from "../../api/teacher/TeacherService";
import DepartmentHeadService from "../../api/departmentHead/DepartmentHeadService";
import EducationalSectorService from "../../api/educationalSector/EducationalSectorService";
import SearchBar from "../../components/searchBar/SearchBar";
import StudentService from "../../api/student/StudentService";
import HeadmanService from "../../api/headman/HeadmanService";
import UserService from "../../api/user/UserService";

function RegistrationPage() {

    const location = useLocation()
    const role = useParams().role
    const groupId = new URLSearchParams(location.search).get('groupId')
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [middleName, setMiddleName] = useState("")
    const [password, setPassword] = useState("")
    const [errorText, setErrorText] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [studentSearch, setStudentSearch] = useState("")
    const [student, setStudent] = useState(null)
    const [students, setStudents] = useState([])

    useEffect(() => {
        if(role === "headman" || role === "headmanDeputy"){
            StudentService.getAll(1, 50, groupId, studentSearch).then((r) => {
                setStudents(r.results)
            })
        }
    }, [studentSearch, role, groupId])

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
        }else if(role === "headman" || role === "headmanDeputy"){
            if(student !== null){
                if(role === "headman"){
                    HeadmanService.registration(student.id).then((r) => {
                        setPassword(r.passowrd)
                        setIsLoading(false)
                    }).catch((e) => {
                        console.log(e)
                        setErrorText("Произошла ошибка")
                        setIsLoading(false)
                    })
                }else {
                    HeadmanService.registrationDeputy(student.id).then((r) => {
                        setPassword(r.passowrd)
                        setIsLoading(false)
                    }).catch(() => {
                        setErrorText("Произошла ошибка")
                        setIsLoading(false)
                    })
                }
            }else {
                setErrorText("Выберите студента")
                setIsLoading(false)
            }
        }else if(role === "student"){
            StudentService.registration(firstName, lastName, middleName, groupId).then((r) => {
                setPassword(r.passowrd)
                setIsLoading(false)
            }).catch((e) => {
                setErrorText("Произошла ошибка")
                setIsLoading(false)
            })
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
                                <SearchBar
                                    placeholder="Введите имя студента..."
                                    searchText={studentSearch}
                                    handleFilter={(v) => {setStudentSearch(v)}}
                                    data={students}
                                    dataResultVisibility={student !== null ? studentSearch.length !== 0 &&
                                        UserService.getFIOFull(student).length !== studentSearch.length
                                        : studentSearch.length !== 0}
                                    item={(v) => {
                                        return <p style={{
                                            cursor: "pointer"
                                        }} onClick={() => {
                                            setStudent(v)
                                            setStudentSearch(UserService.getFIOFull(v))
                                        }}>{UserService.getFIOFull(v)}</p>
                                    }}/>
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
                <div style={{height: "100px"}}/>
            </div>
        </div>
    );
}
export default RegistrationPage;