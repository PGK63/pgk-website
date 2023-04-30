import React, {useEffect, useRef, useState} from 'react';
import MainHeader from "../../components/mainHeader/MainHeader";
import {useLocation} from "react-router-dom";
import {SearchType} from "./model/SearchType";
const SearchPage = () =>
{
    const location = useLocation()
    const searchTextParams = new URLSearchParams(location.search).get('searchText')
    const [searchText, setSearchText] = useState("")
    const [searchType, setSearchType] = useState(SearchType[0])
    const lastElement = useRef()

    useEffect(() => {
        setSearchText(searchTextParams)
    }, [searchTextParams])

    return (
        <div>
            {/*<MainHeader searchText={searchText}/>*/}
            <div className="content">
                <div style={{
                    display: "flex"
                }}>
                    { SearchType.map((type) => {
                        return <div style={{
                            padding: "5px",
                            margin: "5px",
                            background: type !== searchType ? "#a4aab4" : "#205798",
                            borderRadius: "30px",
                            textAlign: "center",
                            cursor: "pointer"
                        }} onClick={() => setSearchType(type)}>
                            <h5 style={{
                                color: "white",
                                marginTop: "5px"
                            }}>{type.name}</h5>
                        </div>
                    })}
                </div>
            </div>
            <div ref={lastElement} style={{height: 20}}/>
        </div>
    );
};

export default SearchPage;