import React, {useEffect, useRef, useState} from 'react';
import GroupService from "../../api/group/GroupService";
import GroupItem from "./components/GroupItem";
import BaseButton from "../../components/BaseButton";
import {useFetching} from "../../hooks/useFetching";
import {useObserver} from "../../hooks/useObserver";
import ErrorText from "../../components/ErrorText";
import Loading from "../../components/Loading";
import {useNavigate} from "react-router-dom";
import BaseConstants from "../../utils/BaseConstants";
import EmptyListUi from "../../components/EmptyListUi";

const GroupsPage = (preps) => {

    const navigate = useNavigate()
    const [groups, setGroups] = useState([])
    const [totalPages, setTotalPages] = useState(0)
    const [totalCount, setTotalCount] = useState(0)
    const [page, setPage] = useState(1)
    const lastElement = useRef()
    const [isSearch, setIsSearch] = useState(false)
    const search = preps.search

    const [fetchGroups, isGroupsLoading, groupsError] = useFetching(async () => {
        const response = await GroupService.getAll(page, BaseConstants.PAGE_SIZE, search);
        if(response != null){
            setTotalPages(response.totalPages)
            setTotalCount(response.totalCount)

            if(isSearch){
                setPage(1)
            }

            if(page === 1 && search !== null){
                setGroups([])
                setGroups([...response.results])
            }else {
                setGroups([...groups, ...response.results])
            }
        }
    })

    useObserver(lastElement, page < totalPages, isGroupsLoading, () => {
        setPage(page + 1)
    })

    useEffect(() => {
        if(page === 1 && search !== null){
            // console.log(search)
        }else {
            fetchGroups()
        }
    }, [page])

    useEffect(() => {
        searchUpdateData()
    }, [search])

    useEffect(() => {
        if(isSearch){
            fetchGroups().then(() => setIsSearch(false))
        }
    }, [isSearch])

    async function searchUpdateData() {
        if(search !== null && search !== ""){
            setIsSearch(true)
            setTotalCount(0)
            setTotalPages(0)
            setGroups([])
            setPage(1)
        }
    }

    return (
        <div>
            <div className="content">
                { search === undefined &&
                    <div style={{margin: "30px", alignItems: "center", display: "flex", justifyContent: "space-around"}}>
                        <h1 style={{fontWeight: "bold"}}>{"Группы (" + totalCount + ")"}</h1>
                        <BaseButton onClick={() => navigate("/groups/create")}>Добавить</BaseButton>
                    </div>

                }

                {groupsError &&
                    <ErrorText>{"Произошла ошибка \n " + groupsError}</ErrorText>
                }
                {isGroupsLoading &&
                    <Loading/>
                }
                {(!isGroupsLoading && groupsError === "" && groups.length === 0) &&
                    <EmptyListUi/>
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