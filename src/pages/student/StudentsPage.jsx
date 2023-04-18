import React, {useEffect, useRef, useState} from 'react';
import StudentServide from '../../api/student/StudentService';
import BaseButton from '../../components/BaseButton';
import MainHeader from '../../components/mainHeader/MainHeader';
import StudentItem from './components/StudentItem';
import Loading from "../../components/Loading";
import {useFetching} from "../../hooks/useFetching";
import ErrorText from "../../components/ErrorText";
import {useObserver} from "../../hooks/useObserver";

const StudentsPage = () => {
    const [students, setStudents] = useState([])
    const [totalPages, setTotalPages] = useState(0)
    const [totalCount, setTotalCount] = useState(0)
    const [page, setPage] = useState(1)
    const lastElement = useRef()

    const [fetchStudent, isStudentsLoading, studentsError] = useFetching(async () => {
        const response = await StudentServide.getAll(page);
        if(response != null){
            setTotalPages(response.totalPages)
            setTotalCount(response.totalCount)
            setStudents([...students, ...response.results])
        }
    })

    useObserver(lastElement, page < totalPages, isStudentsLoading, () => {
        setPage(page + 1)
    })

    useEffect(() => {
        fetchStudent()
    }, [page])

    return (
        <div>
            <MainHeader/>
            <div className="content">
            <div style={{margin: "30px", alignItems: "center", display: "flex", justifyContent: "space-around"}}>
                    <h1 style={{fontWeight: "bold"}}>{"Студенты (" + totalCount + ")"}</h1>
                    <BaseButton>Добавить</BaseButton>
            </div>
                {studentsError &&
                    <ErrorText>{"Произошла ошибка \n " + studentsError}</ErrorText>
                }
                {isStudentsLoading &&
                    <Loading/>
                }

                <li style={{margin: "0 auto", textAlign: "center"}}>{
                    students.map(student =>
                        <ul style={{display: "inline-block", verticalAlign: "top", margin: "5px"}}>
                            <StudentItem student={student}/>
                        </ul>
                    )
                }</li>

                <div ref={lastElement} style={{height: 20}}/>
            </div>
        </div>
    )
}

export default StudentsPage;