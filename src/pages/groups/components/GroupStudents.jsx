import React, {useEffect, useRef, useState} from 'react';
import {useFetching} from "../../../hooks/useFetching";
import StudentService from "../../../api/student/StudentService";
import {useObserver} from "../../../hooks/useObserver";
import BaseConstants from "../../../utils/BaseConstants";
import StudentItem from "../../student/components/StudentItem";
import Loading from "../../../components/Loading";
import ErrorText from "../../../components/ErrorText";

const GroupStudents = (props) => {
    const [students, setStudents] = useState([])
    const [totalPages, setTotalPages] = useState(0)
    const [totalCount, setTotalCount] = useState(0)
    const [page, setPage] = useState(1)
    const lastElement = useRef()

    const [fetchStudent, isStudentsLoading, studentsError] = useFetching(async () => {
        const response = await StudentService.getAll(page, BaseConstants.PAGE_SIZE, props.groupId);
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

            <div style={{margin: "30px", alignItems: "center", display: "flex", justifyContent: "space-around"}}>
                <h1 style={{fontWeight: "bold"}}>{"Студенты (" + totalCount + ")"}</h1>
            </div>

            {studentsError &&
                <ErrorText>{"Произошла ошибка \n " + studentsError}</ErrorText>
            }

            {isStudentsLoading &&
                <Loading/>
            }

            <li style={{margin: "0 auto", textAlign: "center"}}>{
                students.map(student =>
                    <ul style={{display: "inline-block", verticalAlign: "top", margin: "10px"}}>
                        <StudentItem student={student}/>
                    </ul>
                )
            }</li>

            <div ref={lastElement} style={{height: 20}}/>
        </div>
    );
};

export default GroupStudents;