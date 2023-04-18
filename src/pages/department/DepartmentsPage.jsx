import React, {useEffect, useRef, useState} from 'react';
import MainHeader from "../../components/mainHeader/MainHeader";
import {useFetching} from "../../hooks/useFetching";
import {useObserver} from "../../hooks/useObserver";
import BaseButton from "../../components/BaseButton";
import ErrorText from "../../components/ErrorText";
import Loading from "../../components/Loading";
import DepartmentItem from "./components/DepartmentItem";
import DepartmentService from "../../api/department/DepartmentService";

const DepartmentsPage = () => {

    const [departments, setDepartments] = useState([])
    const [totalPages, setTotalPages] = useState(0)
    const [totalCount, setTotalCount] = useState(0)
    const [page, setPage] = useState(1)
    const lastElement = useRef()

    const [fetchDepartments, isDepartmentsLoading, departmentsError] = useFetching(async () => {
        const response = await DepartmentService.getAll(page);
        if(response != null){
            setTotalPages(response.totalPages)
            setTotalCount(response.totalCount)
            setDepartments([...departments, ...response.results])
        }
    })

    useObserver(lastElement, page < totalPages, isDepartmentsLoading, () => {
        setPage(page + 1)
    })

    useEffect(() => {
        fetchDepartments()
    }, [page])

    return (
        <div>
            <MainHeader/>
            <div className="content">
                <div style={{margin: "30px", alignItems: "center", display: "flex", justifyContent: "space-around"}}>
                    <h1 style={{fontWeight: "bold"}}>{"Отделения (" + totalCount + ")"}</h1>
                    <BaseButton>Добавить</BaseButton>
                </div>

                {departmentsError &&
                    <ErrorText>{"Произошла ошибка \n " + departmentsError}</ErrorText>
                }
                {isDepartmentsLoading &&
                    <Loading/>
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