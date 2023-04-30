import React, {useEffect, useState} from 'react';
import MainHeader from "../../components/mainHeader/MainHeader";
import BaseButton from "../../components/BaseButton";
import DepartmentService from "../../api/department/DepartmentService";
import SearchBar from "../../components/searchBar/SearchBar";
import SpecialityService from "../../api/speciality/SpecialityService";
import TeacherService from "../../api/teacher/TeacherService";
import UserService from "../../api/user/UserService";
import GroupService from "../../api/group/GroupService";
import {useNavigate} from "react-router-dom";

const CreateGroupPage = () => {

    const navigate = useNavigate()
    const [course, setCourse] = useState("")
    const [number, setNumber] = useState("")
    const [departmentSearch, setDepartmentSearch] = useState("")
    const [department, setDepartment] = useState(null)
    const [departments, setDepartments] = useState([])
    const [specialitySearch, setSpecialitySearch] = useState("")
    const [speciality, setSpeciality] = useState(null)
    const [specialties, setSpecialties] = useState([])
    const [teacherSearch, setTeacherSearch] = useState("")
    const [teacher, setTeacher] = useState(null)
    const [teachers, setTeachers] = useState([])

    useEffect(() => {
        DepartmentService.getAll(1, 50, departmentSearch).then((r) => {
            setDepartments(r.results)
        })
    }, [departmentSearch])

    useEffect(() => {
        if(department !== null){
            SpecialityService.getAll(1, 50, specialitySearch, department.id).then((r) => {
                setSpecialties(r.results)
            })
        }else {
            setSpecialties([{text: "Сначала выберите отделения"}])
        }
    }, [specialitySearch, department])

    useEffect(() => {
        TeacherService.getAll(1, 50, teacherSearch).then((r) => {
            setTeachers(r.results)
        })
    }, [teacherSearch])

    function createGroup() {
        if(speciality !== null && department !== null && teacher !== null){
            GroupService.create(course, number, speciality.id, department.id, teacher.id)
                .then((r) => navigate(`/groups/${r.id}`))
        }
    }

    return (
        <div>
            <div className="content">
                <div style={{
                    display: "flex",
                    width : "100%",
                    justifyContent: "center"
                }}>
                    <div style={{textAlign: "center"}}>

                        <h1 style={{marginTop: "40px", marginBottom: "30px"}}>Создать группу</h1>

                        <div className="form-floating">
                            <input
                                type="text"
                                className="form-control"
                                id="course"
                                placeholder="Курс"
                                value={course}
                                onChange={event => setCourse(event.target.value)}
                            />
                            <label htmlFor="course">Курс</label>
                        </div>

                        <div style={{marginTop: "15px"}}/>

                        <div className="form-floating">
                            <input
                                type="text"
                                className="form-control"
                                id="number"
                                placeholder="Номер"
                                value={number}
                                onChange={event => setNumber(event.target.value)}
                            />
                            <label htmlFor="number">Номер</label>
                        </div>

                        <SearchBar
                            placeholder="Введите названия отделения..."
                            searchText={departmentSearch}
                            handleFilter={(v) => {setDepartmentSearch(v)}}
                            data={departments}
                            dataResultVisibility={department !== null ? departmentSearch.length !== 0 &&
                                department.name.length !== departmentSearch.length
                                : departmentSearch.length !== 0}
                            item={(v) => {
                                return <p style={{
                                    cursor: "pointer"
                                }} onClick={() => {
                                    setDepartment(v)
                                    setDepartmentSearch(v.name)
                                }}>{v.name}</p>
                            }}
                        />

                        <SearchBar
                            placeholder="Введите названия специальности..."
                            searchText={specialitySearch}
                            handleFilter={(v) => {setSpecialitySearch(v)}}
                            data={specialties}
                            dataResultVisibility={speciality !== null ? specialitySearch.length !== 0 &&
                                speciality.name.length !== specialitySearch.length
                                : specialitySearch.length !== 0}
                            item={(v) => {
                                if(v.text !== undefined){
                                    return <p>{v.text}</p>
                                }else {
                                    return <p style={{
                                        cursor: "pointer"
                                    }} onClick={() => {
                                        setSpeciality(v)
                                        setSpecialitySearch(v.name)
                                    }}>{v.name}</p>
                                }
                            }}
                        />

                        <SearchBar
                            placeholder="Введите имя куратора..."
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
                            }}/>

                        <div style={{
                            display: "flex",
                            justifyContent: "center",
                            width: "100%"
                        }}>
                            <BaseButton onClick={createGroup}>Создать</BaseButton>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateGroupPage;