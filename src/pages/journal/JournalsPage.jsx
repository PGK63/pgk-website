import React, {useEffect, useRef, useState} from 'react';
import MainHeader from "../../components/mainHeader/MainHeader";
import {useFetching} from "../../hooks/useFetching";
import {useObserver} from "../../hooks/useObserver";
import JournalService from "../../api/journal/JournalService";
import BaseButton from "../../components/BaseButton";
import ErrorText from "../../components/ErrorText";
import Loading from "../../components/Loading";
import JournalItem from "./components/JournalItem";

const JournalsPage = () => {
    const [journals, setJournals] = useState([])
    const [totalPages, setTotalPages] = useState(0)
    const [totalCount, setTotalCount] = useState(0)
    const [page, setPage] = useState(1)
    const lastElement = useRef()

    const [fetchJournals, isJournalsLoading, journalsError] = useFetching(async () => {
        const response = await JournalService.getAll(page);
        if(response != null){
            setTotalPages(response.totalPages)
            setTotalCount(response.totalCount)
            setJournals([...journals, ...response.results])
        }
    })

    useObserver(lastElement, page < totalPages, isJournalsLoading, () => {
        setPage(page + 1)
    })

    useEffect(() => {
        fetchJournals()
    }, [page])

    return (
        <div>
            <MainHeader/>
            <div className="content">
                <div style={{margin: "30px", alignItems: "center", display: "flex", justifyContent: "space-around"}}>
                    <h1 style={{fontWeight: "bold"}}>{"Журналы (" + totalCount + ")"}</h1>
                    <BaseButton>Добавить</BaseButton>
                </div>

                {journalsError &&
                    <ErrorText>{"Произошла ошибка \n " + journalsError}</ErrorText>
                }
                {isJournalsLoading &&
                    <Loading/>
                }

                <li style={{margin: "0 auto", textAlign: "center"}}>{
                    journals.map(journal =>
                        <ul style={{display: "inline-block", verticalAlign: "top", margin: "10px"}}>
                            <JournalItem journal={journal} width="50rem"/>
                        </ul>
                    )
                }</li>

                <div ref={lastElement} style={{height: 20}}/>
            </div>
        </div>
    );
};

export default JournalsPage;