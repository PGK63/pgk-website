import React, {useEffect, useRef, useState} from 'react';
import {useFetching} from "../../hooks/useFetching";
import JournalService from "../../api/journal/JournalService";
import {useObserver} from "../../hooks/useObserver";
import MainHeader from "../../components/mainHeader/MainHeader";
import BaseButton from "../../components/BaseButton";
import ErrorText from "../../components/ErrorText";
import Loading from "../../components/Loading";
import JournalSubjectItem from "./components/JournalSubjectItem";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import UserService from "../../api/user/UserService";
import {UserRole} from "../../api/user/model/UserRole";

const JournalSubjectsPage = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const journalId = useParams().journalId
    const groupId = new URLSearchParams(location.search).get('groupId')
    const [journalSubjects, setJournalSubjects] = useState([])
    const [totalPages, setTotalPages] = useState(0)
    const [totalCount, setTotalCount] = useState(0)
    const [page, setPage] = useState(1)
    const lastElement = useRef()
    const [user, setUser] = useState(null)

    const [fetchJournalSubjects, isJournalSubjectsLoading, journalSubjectsError] = useFetching(async () => {
        const response = await JournalService.getSubjectAll(journalId, page);
        if(response != null){
            setTotalPages(response.totalPages)
            setTotalCount(response.totalCount)
            setJournalSubjects([...journalSubjects, ...response.results])
        }
    })

    useObserver(lastElement, page < totalPages, isJournalSubjectsLoading, () => {
        setPage(page + 1)
    })

    useEffect(() => {
        setUser(UserService.getLocalUser())
    }, [])

    useEffect(() => {
        fetchJournalSubjects()
    }, [page])

    return (
        <div>
            <MainHeader/>
            <div className="content">
                <div style={{margin: "30px", alignItems: "center", display: "flex", justifyContent: "space-around"}}>
                    <h1 style={{fontWeight: "bold"}}>{"Предметы (" + totalCount + ")"}</h1>
                    { (user !== null && user.userRole === UserRole.teacher) &&
                        <BaseButton onClick={() => navigate(`/journals/${journalId}/subjects/create`)}>Добавить</BaseButton>
                    }
                </div>

                {journalSubjectsError &&
                    <ErrorText>{"Произошла ошибка \n " + journalSubjectsError}</ErrorText>
                }
                {isJournalSubjectsLoading &&
                    <Loading/>
                }

                <li style={{margin: "0 auto", textAlign: "center"}}>{
                    journalSubjects.map(journalSubject =>
                        <ul style={{display: "inline-block", verticalAlign: "top", margin: "10px"}}>
                            <JournalSubjectItem
                                groupId={groupId}
                                journalId={journalId}
                                journalSubject={journalSubject} width="50rem"
                            />
                        </ul>
                    )
                }</li>

                <div ref={lastElement} style={{height: 20}}/>
            </div>
        </div>
    );
};

export default JournalSubjectsPage;