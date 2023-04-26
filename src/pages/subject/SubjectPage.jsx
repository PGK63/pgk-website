import React, {useEffect, useRef, useState} from 'react';
import MainHeader from "../../components/mainHeader/MainHeader";
import {useFetching} from "../../hooks/useFetching";
import {useObserver} from "../../hooks/useObserver";
import BaseButton from "../../components/BaseButton";
import ErrorText from "../../components/ErrorText";
import Loading from "../../components/Loading";
import SubjectItem from "./components/SubjectItem";
import SubjectsService from "../../api/subject/SubjectsService";
import Modal from "../../components/modal/Modal";

const SubjectsPage = () => {
    const [subjects, setSubjects] = useState([])
    const [totalPages, setTotalPages] = useState(0)
    const [totalCount, setTotalCount] = useState(0)
    const [page, setPage] = useState(1)
    const lastElement = useRef()
    const [showModal, setShowModal] = useState(false)

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

            <Modal show={showModal} handleClose={() => setShowModal(false)}>
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%"}}>
                        <div style={{margin: "30px", textAlign:"center"}}>
                    <h1 >Добавить предмет</h1>

                    <div className="form-floating">
                        <input
                            type="text"
                            className="form-control"
                            placeholder=""
                        />
                        <label htmlFor="firstName">Название предмета</label>
                    </div>

                    <BaseButton>Добавить</BaseButton>
                        </div></div>

            </Modal>

            <div className="content">
                <div style={{margin: "30px", alignItems: "center", display: "flex", justifyContent: "space-around"}}>
                    <h1 style={{fontWeight: "bold"}}>{"Предметы (" + totalCount + ")"}</h1>
                    <BaseButton onClick={() => setShowModal(true)}>Добавить</BaseButton>
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