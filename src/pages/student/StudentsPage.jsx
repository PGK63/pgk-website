import React, {useEffect, useRef, useState} from 'react';
import StudentService from '../../api/student/StudentService';
import StudentItem from './components/StudentItem';
import Loading from "../../components/Loading";
import {useFetching} from "../../hooks/useFetching";
import ErrorText from "../../components/ErrorText";
import {useObserver} from "../../hooks/useObserver";
import BaseConstants from "../../utils/BaseConstants";
import EmptyListUi from "../../components/EmptyListUi";

const StudentsPage = (preps) => {
    const [students, setStudents] = useState([])
    const [totalPages, setTotalPages] = useState(0)
    const [totalCount, setTotalCount] = useState(0)
    const [page, setPage] = useState(1)
    const lastElement = useRef()
    const [isSearch, setIsSearch] = useState(false)
    const search = preps.search

    const [fetchStudent, isStudentsLoading, studentsError] = useFetching(async () => {
        const response = await StudentService.getAll(page, BaseConstants.PAGE_SIZE, null, search);
        if(response != null){
            setTotalPages(response.totalPages)
            setTotalCount(response.totalCount)

            if(isSearch){
                setPage(1)
            }

            if(page === 1 && search !== null){
                setStudents([])
                setStudents([...response.results])
            }else {
                setStudents([...students, ...response.results])
            }
        }
    })

    useObserver(lastElement, page < totalPages, isStudentsLoading, () => {
        setPage(page + 1)
    })

    useEffect(() => {
        if(page === 1 && search !== null){
            // console.log(search)
        }else {
            fetchStudent()
        }
    }, [page])

    useEffect(() => {
        searchUpdateData()
    }, [search])
    
    useEffect(() => {
        if(isSearch){
            fetchStudent().then(() => setIsSearch(false))
        }
    }, [isSearch])

    async function searchUpdateData() {
        if(search !== null && search !== ""){
            setIsSearch(true)
            setTotalCount(0)
            setTotalPages(0)
            setStudents([])
            setPage(1)
        }
    }

    return (
        <div>
            <div className="content">
                { search === undefined &&
                    <div style={{margin: "30px", alignItems: "center", display: "flex", justifyContent: "space-around"}}>
                        <h1 style={{fontWeight: "bold"}}>{"Студенты (" + totalCount + ")"}</h1>
                    </div>
                }

                {studentsError &&
                    <ErrorText>{"Произошла ошибка \n " + studentsError}</ErrorText>
                }
                {isStudentsLoading &&
                    <Loading/>
                }
                {(!isStudentsLoading && studentsError === "" && students.length === 0) &&
                    <EmptyListUi/>
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