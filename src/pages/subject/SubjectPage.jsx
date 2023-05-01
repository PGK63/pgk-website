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
import BaseConstants from "../../utils/BaseConstants";
import EmptyListUi from "../../components/EmptyListUi";
import {useNavigate} from "react-router-dom";

const SubjectsPage = (preps) => {
    const navigate = useNavigate()

    const [subjects, setSubjects] = useState([])
    const [totalPages, setTotalPages] = useState(0)
    const [totalCount, setTotalCount] = useState(0)
    const [page, setPage] = useState(1)
    const lastElement = useRef()
    const [showModal, setShowModal] = useState(false)
    const [subjectTitle, setSubjectTitle] = useState("")
    const [isSearch, setIsSearch] = useState(false)
    const search = preps.search

    const [fetchSubjects, isSubjectsLoading, subjectsError] = useFetching(async () => {
        const response = await SubjectsService.getAll(page, null,BaseConstants.PAGE_SIZE ,search);
        if(response != null){
            setTotalPages(response.totalPages)
            setTotalCount(response.totalCount)

            if(isSearch){
                setPage(1)
            }

            if(page === 1 && search !== null){
                setSubjects([])
                setSubjects([...response.results])
            }else {
                setSubjects([...subjects, ...response.results])
            }
        }
    })

    useObserver(lastElement, page < totalPages, isSubjectsLoading, () => {
        setPage(page + 1)
    })

    useEffect(() => {
        if(page === 1 && search !== null){
            // console.log(search)
        }else {
            fetchSubjects()
        }
    }, [page, showModal])

    useEffect(() => {
        searchUpdateData()
    }, [search])

    useEffect(() => {
        if(isSearch){
            fetchSubjects().then(() => setIsSearch(false))
        }
    }, [isSearch])

    async function searchUpdateData() {
        if(search !== null && search !== ""){
            setIsSearch(true)
            setTotalCount(0)
            setTotalPages(0)
            setSubjects([])
            setPage(1)
        }
    }

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

            {/*<div className="content">*/}
            {/*    { search === undefined &&*/}
            {/*        <div style={{margin: "30px", alignItems: "center", display: "flex", justifyContent: "space-around"}}>*/}
            {/*           <h1 style={{fontWeight: "bold"}}>{"Предметы (" + totalCount + ")"}</h1>*/}
            {/*            <BaseButton onClick={() => setShowModal(true)}>Добавить</BaseButton>*/}
            {/*        </div>*/}
            {/*    }*/}
            <div className="content">
                {search === undefined && (
                    <div
                        style={{
                            margin: "30px",
                            alignItems: "center",
                            display: "flex",
                            justifyContent: "space-between"
                        }}
                    >
                        <h1 style={{ fontWeight: "bold", textAlign: "center", flex: "1" }}>
                            {"Предметы (" + totalCount + ")"}
                        </h1>
                        <BaseButton onClick={() => setShowModal(true)}>Добавить</BaseButton>

                    </div>
                )}
            </div>

                {subjectsError &&
                    <ErrorText>{"Произошла ошибка \n " + subjectsError}</ErrorText>
                }
                {isSubjectsLoading &&
                    <Loading/>
                }

                {(!isSubjectsLoading && subjectsError === "" && subjects.length === 0) &&
                    <EmptyListUi/>
                }

                <li style={{margin: "0 auto", textAlign: "center"}}>{
                    subjects.map(subject =>
                        <ul style={{display: "inline-block", verticalAlign: "top", margin: "5px"}}>
                            <SubjectItem subject={subject} onClick={() => navigate(`/subjects/${subject.id}`)}/>
                        </ul>
                    )
                }</li>

                <div ref={lastElement} style={{height: 20}}/>
            </div>

    );
};

export default SubjectsPage;