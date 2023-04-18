import React, {useEffect, useRef, useState} from 'react';
import MainHeader from "../../components/mainHeader/MainHeader";
import {useFetching} from "../../hooks/useFetching";
import {useObserver} from "../../hooks/useObserver";
import BaseButton from "../../components/BaseButton";
import GuideItem from "./components/GuideItem";
import DirectorService from "../../api/director/DirectorService";
import DepartmentHeadService from "../../api/departmentHead/DepartmentHeadService";
import TeacherService from "../../api/teacher/TeacherService";

const GuidePaige = () => {
    const [directors, setDirectors] = useState([])
    const [techers, setTeachers] = useState([])
    const [departmentHead, setDepartmentHead] = useState([])
    const [directorTotalPages, setDirectorTotalPages] = useState(0)
    const [teacherTotalPages, setTeacherTotalPages] = useState(0)
    const [departmentHeadTotalPages, setDepartmentHeadTotalPages] = useState(0)
    const [direcotorTotalCount, setDirecotorTotalCount] = useState(0)
    const [departmentHeadTotalCount, setDepartmentHeadTotalCount] = useState(0)
    const [teacherTotalCount, setTecherTotalCount] = useState(0)
    const [page, setPage] = useState(1)
    const lastElement = useRef()

    const [fetchDirectors, isDirectorsLoading] = useFetching(async () => {
        const response = await DirectorService.getAll(page);
        if(response != null){
            setDirectorTotalPages(response.totalPages)
            setDirecotorTotalCount(response.totalCount)
            setDirectors([...directors, ...response.results])
        }
    })
    const [fetchDepartmentHead] = useFetching(async () => {
        const response = await DepartmentHeadService.getAll(page);
        if(response != null){
            setDepartmentHeadTotalPages(response.totalPages)
            setDepartmentHeadTotalCount(response.totalCount)
            setDepartmentHead([...departmentHead, ...response.results])
        }
    })

    const [fetchTeachers] = useFetching(async () => {
        const response = await TeacherService.getAll(page);
        if(response != null){
            setTeacherTotalPages(response.totalPages)
            setTecherTotalCount(response.totalCount)
            setTeachers([...techers, ...response.results])
        }
    })

    useObserver(lastElement,
        page < directorTotalPages + teacherTotalPages+departmentHeadTotalPages, isDirectorsLoading,
        () => {
        setPage(page + 1)
    })

    useEffect(() => {
        fetchDirectors()
        fetchDepartmentHead()
        fetchTeachers()
    }, [page])

    return (
        <div>
            <MainHeader/>
            <div className="content">
                <div style={{margin: "30px", alignItems: "center", display: "flex", justifyContent: "space-around"}}>
                    <h1 style={{fontWeight: "bold"}}>{"Руководство (" + (direcotorTotalCount + teacherTotalCount + departmentHeadTotalCount) + ")"}</h1>
                    <BaseButton>Добавить</BaseButton>
                </div>

                <li style={{margin: "0 auto", textAlign: "center"}}>{
                    directors.map(director =>
                        <ul style={{display: "inline-block", verticalAlign: "top", margin: "10px"}}>
                            <GuideItem role="Дириктор" quide={director}/>
                        </ul>
                    )
                }</li>

                <li style={{margin: "80px auto", textAlign: "center"}}>{
                    departmentHead.map(departmentHead =>
                        <ul style={{display: "inline-block", verticalAlign: "top", margin: "10px"}}>
                            <GuideItem role="Заведующий отделением" quide={departmentHead}/>
                        </ul>
                    )
                }</li>

                <li style={{margin: "0 auto", textAlign: "center"}}>{
                    techers.map(teacher =>
                        <ul style={{display: "inline-block", verticalAlign: "top", margin: "10px"}}>
                            <GuideItem role="Преподаватель" quide={teacher}/>
                        </ul>
                    )
                }</li>

                <div ref={lastElement} style={{height: 20}}/>
            </div>
        </div>
    );
};

export default GuidePaige;