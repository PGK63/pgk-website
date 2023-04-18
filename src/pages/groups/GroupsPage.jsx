import React, {useEffect, useRef, useState} from 'react';
import MainHeader from "../../components/mainHeader/MainHeader";
import GroupService from "../../api/group/GroupService";
import GroupItem from "./components/GroupItem";
import BaseButton from "../../components/BaseButton";
import {useFetching} from "../../hooks/useFetching";
import {useObserver} from "../../hooks/useObserver";
import ErrorText from "../../components/ErrorText";
import Loading from "../../components/Loading";

const GroupsPage = () => {
    const [groups, setGroups] = useState([])
    const [totalPages, setTotalPages] = useState(0)
    const [totalCount, setTotalCount] = useState(0)
    const [page, setPage] = useState(1)
    const lastElement = useRef()

    const [fetchGroups, isGroupsLoading, groupsError] = useFetching(async () => {
        const response = await GroupService.getAll(page);
        if(response != null){
            setTotalPages(response.totalPages)
            setTotalCount(response.totalCount)
            setGroups([...groups, ...response.results])
        }
    })

    useObserver(lastElement, page < totalPages, isGroupsLoading, () => {
        setPage(page + 1)
    })

    useEffect(() => {
        fetchGroups()
    }, [page])

    return (
        <div>
            <MainHeader/>
            <div className="content">
                <div style={{margin: "30px", alignItems: "center", display: "flex", justifyContent: "space-around"}}>
                    <h1 style={{fontWeight: "bold"}}>{"Группы (" + totalCount + ")"}</h1>
                    <BaseButton>Добавить</BaseButton>
                </div>

                {groupsError &&
                    <ErrorText>{"Произошла ошибка \n " + groupsError}</ErrorText>
                }
                {isGroupsLoading &&
                    <Loading/>
                }

                <li style={{margin: "0 auto", textAlign: "center"}}>{
                    groups.map(group =>
                        <ul style={{display: "inline-block", verticalAlign: "top", margin: "10px"}}>
                            <GroupItem group={group}/>
                        </ul>
                    )
                }</li>

                <div ref={lastElement} style={{height: 20}}/>
            </div>
        </div>
    );
};

export default GroupsPage;