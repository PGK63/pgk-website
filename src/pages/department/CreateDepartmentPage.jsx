import React, {useEffect, useState} from 'react';
import MainHeader from "../../components/mainHeader/MainHeader";
import BaseButton from "../../components/BaseButton";
import DepartmentHeadService from "../../api/departmentHead/DepartmentHeadService";
import SearchBar from "../../components/searchBar/SearchBar";
import DepartmentService from "../../api/department/DepartmentService";
import {useNavigate} from "react-router-dom";
import UserService from "../../api/user/UserService";

const CreateDepartmentPage = () => {

    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [departmentHeadSearch, setDepartmentHeadSearch] = useState("")
    const [departmentHead, setDepartmentHead] = useState(null)
    const [departmentHeads, setDepartmentHeads] = useState([])

    useEffect(() => {
        DepartmentHeadService.getAll(1, 50, departmentHeadSearch).then((r) => {
            setDepartmentHeads(r.results)
        })
    }, [departmentHeadSearch])

    function createDepartment() {
        if(departmentHead !== null){
            DepartmentService.create(name, departmentHead.id).then(() => {
                navigate("/departments")
            })
        }
    }

    return (
        <div>
            <MainHeader/>
            <div className="content">
                <div style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "center"
                }}>
                    <div>
                        <h1 style={{
                            marginTop: "40px",
                            marginBottom: "30px"
                        }}>Добавить отделения</h1>

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

                        <SearchBar
                            placeholder="Введите имя заведущего отделения..."
                            searchText={departmentHeadSearch}
                            handleFilter={(v) => {setDepartmentHeadSearch(v)}}
                            data={departmentHeads}
                            dataResultVisibility={departmentHead !== null ? departmentHeadSearch.length !== 0 &&
                                UserService.getFIOFull(departmentHead).length !== departmentHeadSearch.length
                                : departmentHeadSearch.length !== 0}
                            item={(v) => {
                                return <p style={{
                                    cursor: "pointer"
                                }} onClick={() => {
                                    setDepartmentHead(v)
                                    setDepartmentHeadSearch(UserService.getFIOFull(v))
                                }}>{UserService.getFIOFull(v)}</p>
                            }}
                        />

                        <div style={{
                            justifyContent: "center",
                            display: "flex",
                            width: "100%"
                        }}>
                            <BaseButton onClick={createDepartment}>Добаивть</BaseButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateDepartmentPage;