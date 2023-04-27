import React, {useEffect, useState} from 'react';
import MainHeader from "../../components/mainHeader/MainHeader";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import SearchBar from "../../components/searchBar/SearchBar";
import TeacherService from "../../api/teacher/TeacherService";
import UserService from "../../api/user/UserService";
import SubjectsService from "../../api/subject/SubjectsService";
import StudentService from "../../api/student/StudentService";
import BaseButton from "../../components/BaseButton";
import RaportichkaService from "../../api/raportichka/RaportichkaService";

const AddRaportichkaRowPage = () => {

    const navigate = useNavigate()
    const params = useParams()
    const location = useLocation()
    const raportichkaId = params.id
    const groupId = new URLSearchParams(location.search).get('groupId')
    const [numberLesson, setNumberLesson] = useState("1")
    const [hours, setHours] = useState("2")
    const [teacherSearch, setTeacherSearch] = useState("")
    const [teacher, setTeacher] = useState(null)
    const [teachers, setTeachers] = useState([])
    const [subjectSearch, setSubjectSearch] = useState("")
    const [subject, setSubject] = useState(null)
    const [subjects, setSubjects] = useState([])
    const [studentSearch, setStudentSearch] = useState("")
    const [student, setStudent] = useState(null)
    const [students, setStudents] = useState([])

    useEffect(() => {
        TeacherService.getAll(1, 50, teacherSearch).then((r) => {
            setTeachers(r.results)
        })
    }, [teacherSearch])

    useEffect(() => {
        if(teacher !== null){
            SubjectsService.getAll(1,teacher.id, 50, subjectSearch).then((r) => {
                setSubjects(r.results)
            })
        }else {
            setSubjects([{text: "Сначала выберите преподавателя"}])
        }
    }, [subjectSearch, teacher])

    useEffect(() => {
        StudentService.getAll(1, 50, groupId === "0" ? undefined : groupId, studentSearch).then((r) => {
            setStudents(r.results)
        })
    }, [studentSearch, groupId])

    function addRow() {
        RaportichkaService.addRow(raportichkaId, numberLesson, hours, subject.id, student.id, teacher.id)
            .then(() => {
                navigate(`/raportichka/${raportichkaId}/table`)
            })
    }

    return (
        <div>
            <MainHeader/>

            <div className="content">
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%"
                }}>
                    <div style={{
                        marginTop: "40px"
                    }}>
                        <h1 style={{
                            marginBottom: "20px"
                        }}>Добавить к рапортичке поле</h1>

                        <div className="form-floating">
                            <input
                                type="text"
                                className="form-control"
                                id="numberLesson"
                                placeholder="Номер пары"
                                value={numberLesson}
                                onChange={event => setNumberLesson(event.target.value)}
                            />
                            <label htmlFor="numberLesson">Номер пары</label>
                        </div>

                        <div style={{
                            height: "10px"
                        }}/>

                        <div className="form-floating">
                            <input
                                type="text"
                                className="form-control"
                                id="hours"
                                placeholder="Количество часов"
                                value={hours}
                                onChange={event => setHours(event.target.value)}
                            />
                            <label htmlFor="hours">Количество часов</label>
                        </div>

                        <SearchBar
                            placeholder="Введите имя преподавателя..."
                            searchText={teacherSearch}
                            handleFilter={(v) => {setTeacherSearch(v)}}
                            data={teachers}
                            dataResultVisibility={teacher !== null ? teacherSearch.length !== 0 &&
                                UserService.getFIOFull(teacher).length !== teacherSearch.length
                                : teacherSearch.length !== 0}
                            item={(v) => {
                                return <p style={{
                                    cursor: "pointer"
                                }} onClick={() => {
                                    setTeacher(v)
                                    setTeacherSearch(UserService.getFIOFull(v))
                                }}>{UserService.getFIOFull(v)}</p>
                            }}
                        />

                        <SearchBar
                            placeholder="Введите название предмета..."
                            searchText={subjectSearch}
                            handleFilter={(v) => {setSubjectSearch(v)}}
                            data={subjects}
                            dataResultVisibility={subject !== null ? subjectSearch.length !== 0 &&
                                subject.subjectTitle.length !== subjectSearch.length
                                : subjectSearch.length !== 0}
                            item={(v) => {
                                if(v.text === undefined){
                                    return <p style={{
                                        cursor: "pointer"
                                    }} onClick={() => {
                                        setSubject(v)
                                        setSubjectSearch(v.subjectTitle)
                                    }}>{v.subjectTitle}</p>
                                }else {
                                    return <p>{v.text}</p>
                                }
                            }}
                        />

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
                            }}
                        />

                        <div style={{
                            display: "flex",
                            justifyContent: "center",
                            width: "100%"
                        }}>
                            <BaseButton onClick={addRow}>
                                Добавить
                            </BaseButton>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddRaportichkaRowPage;