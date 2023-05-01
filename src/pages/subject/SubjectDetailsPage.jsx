import React, {useEffect, useRef, useState} from 'react';
import {useParams} from "react-router-dom";
import SubjectsService from "../../api/subject/SubjectsService";
import BaseButton from "../../components/BaseButton";
import SubjectItem from "./components/SubjectItem";
import GuideItem from "../guide/components/GuideItem";
import {useFetching} from "../../hooks/useFetching";
import JournalService from "../../api/journal/JournalService";
import {useObserver} from "../../hooks/useObserver";
import TeacherService from "../../api/teacher/TeacherService";
import BaseConstants from "../../utils/BaseConstants";
import UserService from "../../api/user/UserService";
import GroupService from "../../api/group/GroupService";
import {HistoryType} from "../../api/user/model/HistoryType";
import Modal from "../../components/modal/Modal";
import SearchBar from "../../components/searchBar/SearchBar";

const SubjectDetailsPage = () => {
    
    const params = useParams()
    const subjectId = params.id
    const [subject, setSubject] = useState(null)
    const [teachers, setTeachers] = useState([])
    const [totalPages, setTotalPages] = useState(0)
    const [totalCount, setTotalCount] = useState(0)
    const [page, setPage] = useState(1)
    const lastElement = useRef()
    const [modal, setModal] = useState(false)
    const [teacherSearch, setTeacherSearch] = useState("")
    const [teacher, setTeacher] = useState(null)
    const [teachersAll, setTeachersAll] = useState([])

    const [fetchTeachers, isTeachersLoading] = useFetching(async () => {
        const response = await TeacherService.getAll(page, BaseConstants.PAGE_SIZE, null, subjectId);
        if(response != null){
            setTotalPages(response.totalPages)
            setTotalCount(response.totalCount)
            setTeachers([...teachers, ...response.results])
        }
    })

    useEffect(() => {
        TeacherService.getAll(1, 50, teacherSearch).then((r) => {
            setTeachersAll(r.results)
        })
    }, [teacherSearch])

    useEffect(() => {
        if(subject !== null && subject !== undefined){
            UserService.postHistoryItem(
                subjectId,
                subject.subjectTitle,
                null,
                HistoryType.SUBJECT
            )
        }
    }, [subject])

    useObserver(lastElement, page < totalPages, isTeachersLoading, () => {
        setPage(page + 1)
    })

    useEffect(() => {
        fetchTeachers()
    }, [page])

    useEffect(() => {
        SubjectsService.getById(subjectId).then((r) => {
            setSubject(r)
        })
    }, [subjectId])

    function addTeacher() {
        if(subject !== null){
            TeacherService.addSubject(teacher.id, subjectId).then(() => {
                window.location.reload()
            })
        }
    }
    
    return (
        <div className="content">

            <Modal show={modal} handleClose={() => setModal(false)}>
                <SearchBar
                    placeholder="Введите имя преподавателя..."
                    searchText={teacherSearch}
                    handleFilter={(v) => {setTeacherSearch(v)}}
                    data={teachersAll}
                    dataResultVisibility={teacher !== null ? teacherSearch.length !== 0 &&
                        UserService.getFIOFull(teacher).length !== teacherSearch.length
                        : teacherSearch.length !== 0}
                    item={(v) => {
                        return <p style={{
                            cursor: "pointer"
                        }} onClick={() => {
                            setTeacher(v)
                            setTeacherSearch(UserService.getFIOFull(v))
                        }}>{UserService.getFIOFull(v)}</p>
                    }}
                />

                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%"
                }}>
                    <BaseButton onClick={addTeacher}>
                        Добавить
                    </BaseButton>
                </div>
            </Modal>

            { subject !== null &&
                <div>
                    <div style={{
                        width: "100%",
                        justifyContent: "center",
                        textAlign: "center",
                        display: "flex",
                        marginTop: "30px"
                    }}>
                        <h1>{subject.subjectTitle}</h1>
                    </div>
                    <div style={{
                        display: "flex",
                        textAlign: "center",
                        marginTop: "50px",
                        marginLeft: "70%"
                    }}>
                        <h3>{"Преподаватели" + " (" + totalCount + ")"}</h3>
                        <br/><BaseButton onClick={() => setModal(true)}>Добавить</BaseButton>
                    </div>
                </div>
            }

            <li style={{margin: "0 auto", textAlign: "center"}}>{
                teachers.map(teacher =>
                    <ul style={{display: "inline-block", verticalAlign: "top", margin: "10px"}}>
                        <GuideItem role="Преподаватель" quide={teacher}/>
                    </ul>
                )
            }</li>

            <div ref={lastElement} style={{height: 20}}/>
        </div>
    );
};

export default SubjectDetailsPage;