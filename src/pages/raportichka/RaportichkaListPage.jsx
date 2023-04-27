import React, {useEffect, useRef, useState} from 'react';
import MainHeader from "../../components/mainHeader/MainHeader";
import RaportichkaService from "../../api/raportichka/RaportichkaService";
import {useFetching} from "../../hooks/useFetching";
import {useObserver} from "../../hooks/useObserver";
import BaseButton from "../../components/BaseButton";
import ErrorText from "../../components/ErrorText";
import Loading from "../../components/Loading";
import RaportichkaItem from "./components/RaportichkaItem";
import Modal from "../../components/modal/Modal";
import GroupService from "../../api/group/GroupService";
import SearchBar from "../../components/searchBar/SearchBar";

const RaportichkaListPage = () => {

    const [raportichka, setRaportichka] = useState([])
    const [totalPages, setTotalPages] = useState(0)
    const [totalCount, setTotalCount] = useState(0)
    const [page, setPage] = useState(1)
    const lastElement = useRef()
    const [modal, setModal] = useState(false)
    const [groupSearch, setGroupSearch] = useState("")
    const [group, setGroup] = useState(null)
    const [groups, setGroups] = useState([])
    const [filter, setFilter] = useState(false)

    const [fetchRaportichka, isRaportichkaLoading, raportichkaError] = useFetching(async () => {
        console.log(page)
        const response = await RaportichkaService.getAll(
            group === null ? null : Number(group.id),
            page
        )

        if(response !== null){
            setTotalPages(response.totalPages)
            setTotalCount(response.totalCount)
            setRaportichka([...raportichka, ...response.results])
        }
    })

    useObserver(lastElement, page < totalPages, isRaportichkaLoading, () => {
        setPage(page + 1)
    })

    useEffect(() => {
        fetchRaportichka()
    }, [page, filter])

    useEffect(() => {
        GroupService.getAll(1, 50, groupSearch).then((r) => {
            setGroups(r.results)
        })
    }, [groupSearch])

    return (
        <div>
            <MainHeader/>

            <Modal show={modal} handleClose={() => setModal(false)}>
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%"
                }}>
                    <div>
                        <SearchBar
                            placeholder="Введите номер группы..."
                            searchText={groupSearch}
                            handleFilter={(v) => {setGroupSearch(v)}}
                            data={groups}
                            dataResultVisibility={group !== null ? groupSearch.length !== 0 &&
                                GroupService.getName(group).length !== groupSearch.length
                                : groupSearch.length !== 0}
                            item={(v) => {
                                return <p style={{
                                    cursor: "pointer"
                                }} onClick={() => {
                                    setGroup(v)
                                    setGroupSearch(GroupService.getName(v))
                                }}>{GroupService.getName(v)}</p>
                            }}
                        />

                        <div style={{
                            display: "flex",
                            justifyContent: "center",
                            width: "100%"
                        }}>
                            <BaseButton onClick={() => {
                                setRaportichka([])
                                setPage(1)
                                setTotalCount(0)
                                setTotalCount(0)
                                setModal(false)
                                setFilter(true)
                            }}>Искать</BaseButton>

                            <BaseButton onClick={() => {
                                setGroup(null)
                                setGroupSearch("")
                                setRaportichka([])
                                setPage(1)
                                setTotalCount(0)
                                setTotalCount(0)
                                setModal(false)
                                setFilter(false)
                            }}>Сбросить филтр</BaseButton>
                        </div>
                    </div>
                </div>
            </Modal>

            <div className="content">
                <div style={{margin: "30px", alignItems: "center", display: "flex", justifyContent: "space-around"}}>
                    <h1 style={{fontWeight: "bold"}}>{"Рапортички (" + totalCount + ")"}</h1>
                    <BaseButton onClick={() => setModal(true)}>Сортировать</BaseButton>
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