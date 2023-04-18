import React, {useEffect, useRef, useState} from 'react';
import MainHeader from "../../components/mainHeader/MainHeader";
import {useFetching} from "../../hooks/useFetching";
import {useObserver} from "../../hooks/useObserver";
import BaseButton from "../../components/BaseButton";
import ErrorText from "../../components/ErrorText";
import Loading from "../../components/Loading";
import SubjectItem from "./components/SubjectItem";
import SubjectsService from "../../api/subject/SubjectsService";

const SubjectsPage = () => {
    const [subjects, setSubjects] = useState([])
    const [totalPages, setTotalPages] = useState(0)
    const [totalCount, setTotalCount] = useState(0)
    const [page, setPage] = useState(1)
    const lastElement = useRef()

    const [fetchSubjects, isSubjectsLoading, subjectsError] = useFetching(async () => {
        const response = await SubjectsService.getAll(page);
        if(response != null){
            setTotalPages(response.totalPages)
            setTotalCount(response.totalCount)
            setSubjects([...subjects, ...response.results])
        }
    })

    useObserver(lastElement, page < totalPages, isSubjectsLoading, () => {
        setPage(page + 1)
    })

    useEffect(() => {
        fetchSubjects()
    }, [page])

    return (
        <div>
            <MainHeader/>
            <div className="content">
                <div style={{margin: "30px", alignItems: "center", display: "flex", justifyContent: "space-around"}}>
                    <h1 style={{fontWeight: "bold"}}>{"Предметы (" + totalCount + ")"}</h1>
                    <BaseButton>Добавить</BaseButton>
                </div>
                {subjectsError &&
                    <ErrorText>{"Произошла ошибка \n " + subjectsError}</ErrorText>
                }
                {isSubjectsLoading &&
                    <Loading/>
                }

                <li style={{margin: "0 auto", textAlign: "center"}}>{
                    subjects.map(subject =>
                        <ul style={{display: "inline-block", verticalAlign: "top", margin: "5px"}}>
                            <SubjectItem subject={subject}/>
                        </ul>
                    )
                }</li>

                <div ref={lastElement} style={{height: 20}}/>
            </div>
        </div>
    );
};

export default SubjectsPage;