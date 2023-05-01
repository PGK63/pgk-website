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
import MainMenu from "../../components/menu/MainMenu";
import MenuItem from "@mui/material/MenuItem";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import SettingsIcon from "@mui/icons-material/Settings";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';



const SubjectDetailsPage = () => {
    
    const params = useParams()
    const subjectId = params.id
    const [subject, setSubject] = useState(null)
    const [teachers, setTeachers] = useState([])
    const [totalPages, setTotalPages] = useState(0)
    const [totalCount, setTotalCount] = useState(0)
    const [page, setPage] = useState(1)
    const lastElement = useRef()
    const [addSubjectModal, setAddSubjectModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
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

            <Modal show={addSubjectModal} handleClose={() => setAddSubjectModal(false)}>
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

            <Modal show={deleteModal} handleClose={() => setDeleteModal(false)} >


                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",

                }


                }>
                    <div style={{textAlign:"center"}}>
                        <h1 style={{marginTop: "35px", marginBottom: "20px"}}>Вы уверены?</h1>




                        <h4>Отменить действие будет нельзя</h4>
                        <h4>Действие удалит также все оценки и поля в рапортичках где присутствует этот предмет</h4>


                        <div style={{marginTop: "10px"}}>
                            <button  style={{
                                backgroundColor: "#b81414",
                                border: "none",
                                padding: "10px 130px",
                                color: "#ffffff",
                                fontSize: "1.05rem",
                                margin: "10px",
                                borderRadius: "15px",
                                cursor: "pointer",
                                textDecoration: "none"


                            }}>Удалить</button>
                        </div>
                    </div>
                </div>

            </Modal>

            { subject !== null &&
                <div>
                    <div style={{
                        width: "100%",
                        justifyContent: "space-between",
                        textAlign: "center",
                        display: "flex",
                        marginTop: "30px",
                        verticalAlign:"middle",
                    }}>
                        <h1 style={{marginLeft:"50%"}}>{subject.subjectTitle}</h1>
                       <div style={{marginRight:"3%",scale:"120%"}}> <br/><MainMenu content={(handleClose) => {
                            return <div>

                                <MenuItem onClick={() => {
                                    handleClose()
                                    setAddSubjectModal(true)
                                }} disableRipple>
                                    <PersonAddAlt1Icon />
                                    Добавить преподователя к предмету
                                </MenuItem>

                                <MenuItem onClick={() => {
                                    handleClose()
                                }} disableRipple>
                                    <SettingsSuggestIcon />
                                    Изменить название предмета
                                </MenuItem>

                                <MenuItem onClick={() => {
                                    handleClose()
                                    setDeleteModal(true)
                                }} disableRipple>
                                    <DeleteForeverIcon />
                                    Удалить
                                </MenuItem>
                            </div>
                        }}/></div>
                    </div>
                    <div style={{
                        display: "flex",
                        textAlign: "center",
                        marginTop: "50px",
                       width: "100%",
                        justifyContent: "center"
                    }}>
                        <h3>{"Преподаватели" + " (" + totalCount + ")"}</h3>
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