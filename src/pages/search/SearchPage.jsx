import React, {useEffect, useRef, useState} from 'react';
import MainHeader from "../../components/mainHeader/MainHeader";
import {useLocation} from "react-router-dom";
import SearchService from "../../api/search/SearchService";
import {useFetching} from "../../hooks/useFetching";
import GroupService from "../../api/group/GroupService";
import {useObserver} from "../../hooks/useObserver";
import ErrorText from "../../components/ErrorText";
import Loading from "../../components/Loading";
import GroupItem from "../groups/components/GroupItem";
import StudentItem from "../student/components/StudentItem";
const SearchPage = () =>
{
    const location = useLocation()
    const searchTextParams = new URLSearchParams(location.search).get('searchText')
    const [searchText, setSearchText] = useState("")

    const [searchResult, setSearchResult] = useState([])
    const [page, setPage] = useState(1)
    const lastElement = useRef()

    const [fetchSearchResult, isSearchLoading, searchError] = useFetching(async () => {
        const response = await SearchService.getSearchAll(page);
        if(response.students != null){
            setSearchResult(response.students) // бля
        }
    })

    useObserver(lastElement, true, isSearchLoading, () => {
        setPage(page + 1)
    })

    useEffect(() => {
        fetchSearchResult()
    }, [page])

    useEffect(() => {
        setSearchText(searchTextParams)
    }, [searchTextParams])

    return (
        <div>
            <MainHeader searchText={searchText}/>
            <div className="content">
                {searchError &&
                    <ErrorText>{"Произошла ошибка \n " + searchError}</ErrorText>
                }
                {isSearchLoading &&
                    <Loading/>
                }

                <li style={{margin: "0 auto", textAlign: "center"}}>{
                    searchResult.map(student =>
                        <ul style={{display: "inline-block", verticalAlign: "top", margin: "10px"}}>
                            <StudentItem student={student}/>
                        </ul>
                    )
                }</li>
            </div>
        </div>
    );
};

export default SearchPage;