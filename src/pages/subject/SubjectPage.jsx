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
    const [subjectTitle, setSubjectTitle] = useState("")

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
    }, [page, showModal])

    function createSubject() {
        if(subjectTitle !== ""){
            SubjectsService.create(subjectTitle).then((r) => {
                setSubjects([])
                setTotalPages(0)
                setTotalCount(0)
                setPage(1)
                setShowModal(false)
            })
        }
    }

    return (
        <div>
            <Modal show={showModal} handleClose={() => setShowModal(false)}>
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%"}
                }>
                    <div style={{textAlign:"center"}}>
                        <h1 style={{marginTop: "35px", marginBottom: "20px"}}>Добавить предмет</h1>

                        <div className="form-floating">
                            <input
                                type="text"
                                id="subjectTitle"
                                className="form-control"
                                placeholder="Название предмета"
                                value={subjectTitle}
                                onChange={event => setSubjectTitle(event.target.value)}
                            />

                            <label htmlFor="subjectTitle">Название предмета</label>
                        </div>

                            <div style={{marginTop: "10px"}}>
                                <BaseButton onClick={createSubject}>Добавить</BaseButton>
                            </div>
                        </div>
                </div>

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