import React, {useEffect, useRef, useState} from 'react';
import MainHeader from "../../components/mainHeader/MainHeader";
import RaportichkaService from "../../api/raportichka/RaportichkaService";
import {useFetching} from "../../hooks/useFetching";
import {useObserver} from "../../hooks/useObserver";
import BaseButton from "../../components/BaseButton";
import ErrorText from "../../components/ErrorText";
import Loading from "../../components/Loading";
import RaportichkaItem from "./components/RaportichkaItem";

const RaportichkaListPage = () => {

    const [raportichka, setRaportichka] = useState([])
    const [totalPages, setTotalPages] = useState(0)
    const [totalCount, setTotalCount] = useState(0)
    const [page, setPage] = useState(1)
    const lastElement = useRef()

    const [fetchRaportichka, isRaportichkaLoading, raportichkaError] = useFetching(async () => {
        RaportichkaService.getAll().then((response) => {
            setTotalPages(response.totalPages)
            setTotalCount(response.totalCount)
            setRaportichka([...raportichka, ...response.results])
        })
    })

    useObserver(lastElement, page < totalPages, isRaportichkaLoading, () => {
        setPage(page + 1)
    })

    useEffect(() => {
        fetchRaportichka()
    }, [page])


    return (
        <div>
            <MainHeader/>
            <div className="content">
                <div style={{margin: "30px", alignItems: "center", display: "flex", justifyContent: "space-around"}}>
                    <h1 style={{fontWeight: "bold"}}>{"Рапортички (" + totalCount + ")"}</h1>
                    <BaseButton>Сортировать</BaseButton>
                    <BaseButton>Добавить</BaseButton>
                </div>

                {raportichkaError &&
                    <ErrorText>{"Произошла ошибка \n " + raportichkaError}</ErrorText>
                }
                {isRaportichkaLoading &&
                    <Loading/>
                }

                <li style={{margin: "0 auto", textAlign: "center"}}>{
                    raportichka.map( item =>
                        <ul style={{display: "inline-block", verticalAlign: "top", margin: "10px"}}>
                            <RaportichkaItem item={item}/>
                        </ul>
                    )
                }</li>

                <div ref={lastElement} style={{height: 20}}/>

            </div>
        </div>
    );
};

export default RaportichkaListPage;