import React, {useEffect, useRef, useState} from 'react';
import UserService from "../../api/user/UserService";
import {useFetching} from "../../hooks/useFetching";
import {useObserver} from "../../hooks/useObserver";
import ErrorText from "../../components/ErrorText";
import Loading from "../../components/Loading";
import HistoryItem from "./components/HistoryItem";
import EmptyListUi from "../../components/EmptyListUi";

const MainPage = () => {
    const [totalPages, setTotalPages] = useState(0)
    const [totalCount, setTotalCount] = useState(0)
    const [page, setPage] = useState(1)
    const lastElement = useRef()
    const [history, setHistory] = useState([])

    const [fetchHistory, isHistoryLoading, historyError] = useFetching(async () => {
        const response = await UserService.getHistory(page);
        if(response != null){
            setTotalPages(response.totalPages)
            setTotalCount(response.totalCount)
            setHistory([...history, ...response.results])
        }
    })

    useObserver(lastElement, page < totalPages, isHistoryLoading, () => {
        setPage(page + 1)
    })

    useEffect(() => {
        fetchHistory()
    }, [page])

    return (
        <div className="content">
            { history.length > 0 &&
                <div style={{margin: "30px", alignItems: "center", display: "flex", justifyContent: "space-around"}}>
                    <h1 style={{fontWeight: "bold"}}>{"Вы недавно смотрели (" + totalCount + ")"}</h1>
                </div>
            }

            {historyError &&
                <ErrorText>{"Произошла ошибка \n " + historyError}</ErrorText>
            }
            {isHistoryLoading &&
                <Loading/>
            }
            {(!isHistoryLoading && historyError === "" && history.length === 0) &&
                <EmptyListUi/>
            }

            <li style={{margin: "0 auto", textAlign: "center"}}>{
                history.map(historyItem =>
                    <ul style={{display: "inline-block", verticalAlign: "top", margin: "10px"}}>
                        <HistoryItem historyItem={historyItem}/>
                    </ul>
                )
            }</li>

            <div ref={lastElement} style={{height: 20}}/>
        </div>
    );
};

export default MainPage;