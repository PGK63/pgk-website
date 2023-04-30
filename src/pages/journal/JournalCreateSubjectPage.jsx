import React, {useEffect, useRef, useState} from 'react';
import MainHeader from "../../components/mainHeader/MainHeader";
import {useNavigate, useParams} from "react-router-dom";
import BaseButton from "../../components/BaseButton";
import JournalService from "../../api/journal/JournalService";
import UserService from "../../api/user/UserService";
import SubjectsService from "../../api/subject/SubjectsService";
import {useFetching} from "../../hooks/useFetching";
import {useObserver} from "../../hooks/useObserver";
import SubjectItem from "../subject/components/SubjectItem";

const JournalCreateSubjectPage = () => {

    const navigate = useNavigate()
    const params = useParams()
    const journalId = params.journalId
    const [maxHours, setMaxHours] = useState("")
    const [subjectId, setSubjectId] = useState(0)
    const [subjects, setSubjects] = useState([])
    const [user, setUser] = useState(null)
    const [totalPages, setTotalPages] = useState(0)
    const [page, setPage] = useState(1)
    const lastElement = useRef()

    const [fetchSubjects, isSubjectsLoading] = useFetching(async () => {
        if(user !== null){
            const response = await SubjectsService.getAll(page, user.userId)

            if(response != null){
                setTotalPages(response.totalPages)
                setSubjects([...subjects, ...response.results])
            }
        }
    })

    useObserver(lastElement, page < totalPages, isSubjectsLoading, () => {
        setPage(page + 1)
    })

    useEffect(() => {
        setUser(UserService.getLocalUser())
    }, [])

    useEffect(() => {
        fetchSubjects()
    }, [user, page])

    function createSubject() {
        JournalService.createSubject(journalId, maxHours, subjectId).then((r) => {
            navigate(`/journals/:journalId/subjects/${r.id}/table`)
        })
    }

    return (
        <div>
            <div className="content">
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%"
                }}>
                    <div>
                        <h1 style={{
                            marginTop: "40px",
                            marginBottom: "30px",
                            textAlign: "center"
                        }}>Добавить придмет к журналу</h1>

                        <h2 style={{
                            marginLeft: '30px',
                            marginTop: "40px",
                            marginBottom: "25px"
                        }}>Выберите предмет</h2>

                        <li style={{margin: "0 auto", textAlign: "center"}}>{
                            subjects.map(subject =>
                                <ul style={{display: "inline-block", verticalAlign: "top", margin: "5px"}}>
                                    <SubjectItem
                                        subject={subject}
                                        isCurrent={subject.id === subjectId}
                                        onClick={() => {
                                            setSubjectId(subject.id)
                                        }}
                                    />
                                </ul>
                            )
                        }</li>

                        <div ref={lastElement} style={{height: 20, marginBottom: "50px"}}/>


                        <div className="form-floating">
                            <input
                                type="text"
                                className="form-control"
                                id="maxHours"
                                placeholder="Часов всего"
                                value={maxHours}
                                onChange={event => setMaxHours(event.target.value)}
                            />
                            <label htmlFor="maxHours">Количество часов всего</label>
                        </div>

                        <div style={{
                            display: "flex",
                            justifyContent: "center",
                            width: "100%"
                        }}>
                            <BaseButton onClick={createSubject}>Добавить</BaseButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JournalCreateSubjectPage;