import React, {useEffect, useRef, useState} from 'react';
import MainHeader from "../../components/mainHeader/MainHeader";
import {useFetching} from "../../hooks/useFetching";
import {useObserver} from "../../hooks/useObserver";
import BaseButton from "../../components/BaseButton";
import ErrorText from "../../components/ErrorText";
import Loading from "../../components/Loading";
import DepartmentItem from "./components/DepartmentItem";
import DepartmentService from "../../api/department/DepartmentService";
import {useNavigate} from "react-router-dom";
import BaseConstants from "../../utils/BaseConstants";
import EmptyListUi from "../../components/EmptyListUi";

const DepartmentsPage = (preps) => {

    const navigate = useNavigate()
    const [departments, setDepartments] = useState([])
    const [totalPages, setTotalPages] = useState(0)
    const [totalCount, setTotalCount] = useState(0)
    const [page, setPage] = useState(1)
    const lastElement = useRef()
    const [isSearch, setIsSearch] = useState(false)
    const search = preps.search

    const [fetchDepartments, isDepartmentsLoading, departmentsError] = useFetching(async () => {
        const response = await DepartmentService.getAll(page, BaseConstants.PAGE_SIZE, search);
        if(response != null){

            setTotalPages(response.totalPages)
            setTotalCount(response.totalCount)

            if(isSearch){
                setPage(1)
            }

            if(page === 1 && search !== null){
                setDepartments([])
                setDepartments([...response.results])
            }else {
                setDepartments([...departments, ...response.results])
            }
        }
    })

    useObserver(lastElement, page < totalPages, isDepartmentsLoading, () => {
        setPage(page + 1)
    })

    useEffect(() => {
        if(page === 1 && search !== null){
            // console.log(search)
        }else {
            fetchDepartments()
        }
    }, [page])

    useEffect(() => {
        searchUpdateData()
    }, [search])

    useEffect(() => {
        if(isSearch){
            fetchDepartments().then(() => setIsSearch(false))
        }
    }, [isSearch])

    async function searchUpdateData() {
        if(search !== null && search !== ""){
            setIsSearch(true)
            setTotalCount(0)
            setTotalPages(0)
            setDepartments([])
            setPage(1)
        }
    }

    return (
        <div>
            <div className="content">
                { search === undefined &&
                    <div style={{margin: "30px", alignItems: "center", display: "flex", justifyContent: "space-around"}}>
                        <h1 style={{fontWeight: "bold"}}>{"Отделения (" + totalCount + ")"}</h1>
                        <BaseButton onClick={() => navigate("/departments/create")}>Добавить</BaseButton>
                    </div>
                }

                {departmentsError &&
                    <ErrorText>{"Произошла ошибка \n " + departmentsError}</ErrorText>
                }
                {isDepartmentsLoading &&
                    <Loading/>
                }
                {(!isDepartmentsLoading && departmentsError === "" && departments.length === 0) &&
                    <EmptyListUi/>
                }

                <li style={{margin: "0 auto", textAlign: "center"}}>{
                    departments.map(department =>
                        <ul style={{display: "inline-block", verticalAlign: "top", margin: "10px"}}>
                            <DepartmentItem department={department}/>
                        </ul>
                    )
                }</li>

                <div ref={lastElement} style={{height: 20}}/>
            </div>
        </div>
    );
};

export default DepartmentsPage;