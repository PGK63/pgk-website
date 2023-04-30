import React, {useEffect, useState} from 'react';
import MainHeader from "../../components/mainHeader/MainHeader";
import DepartmentService from "../../api/department/DepartmentService";
import SearchBar from "../../components/searchBar/SearchBar";
import BaseButton from "../../components/BaseButton";
import SpecialityService from "../../api/speciality/SpecialityService";
import {useNavigate} from "react-router-dom";

const CreateSpecialityPage = () => {

    const navigate = useNavigate()
    const [number, setNumber] = useState("")
    const [name, setName] = useState("")
    const [nameAbbreviation, setNameAbbreviation] = useState("")
    const [qualification, setQualification] = useState("")
    const [departmentSearch, setDepartmentSearch] = useState("")
    const [department, setDepartment] = useState(null)
    const [departments, setDepartments] = useState([])

    useEffect(() => {
        DepartmentService.getAll(1, 50, departmentSearch).then((r) => {
            setDepartments(r.results)
        })
    }, [departmentSearch])

    function createSpeciality(){
        if(department !== null && number !== "" && name !== "" && nameAbbreviation !== "" && qualification !== "") {
            SpecialityService.create(number, name, nameAbbreviation, qualification, department.id)
                .then(() => {navigate("/specialties")})
        }
    }

    return (
        <div>
            <div className="content">
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%"
                }}>
                    <div>
                        <h1 style={{
                            marginTop: "40px",
                            marginBottom: "30px"
                        }}>Добавить специальность</h1>

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

                        <div style={{margin: "10px"}}/>

                        <div className="form-floating">
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder="Название"
                                value={name}
                                onChange={event => setName(event.target.value)}
                            />
                            <label htmlFor="name">Название</label>
                        </div>

                        <div style={{margin: "10px"}}/>

                        <div className="form-floating">
                            <input
                                type="text"
                                className="form-control"
                                id="nameAbbreviation"
                                placeholder="Аббревиатура"
                                value={nameAbbreviation}
                                onChange={event => setNameAbbreviation(event.target.value)}
                            />
                            <label htmlFor="nameAbbreviation">Аббревиатура</label>
                        </div>

                        <div style={{margin: "10px"}}/>

                        <div className="form-floating">
                            <input
                                type="text"
                                className="form-control"
                                id="qualification"
                                placeholder="Квалификация"
                                value={qualification}
                                onChange={event => setQualification(event.target.value)}
                            />
                            <label htmlFor="qualification">Квалификация</label>
                        </div>

                        <div style={{margin: "10px"}}/>

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

                        <div style={{
                            display: "flex",
                            width: "100%",
                            justifyContent: "center"
                        }}>
                            <BaseButton onClick={createSpeciality}>Добавить</BaseButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateSpecialityPage;