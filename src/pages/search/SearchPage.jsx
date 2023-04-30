import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import {SearchType} from "./model/SearchType";
import StudentsPage from "../student/StudentsPage";
import DepartmentsPage from "../department/DepartmentsPage";
import GroupsPage from "../groups/GroupsPage";
import SpecialityPage from "../speciality/SpecialityPage";
import SubjectsPage from "../subject/SubjectPage";
import GuidePaige from "../guide/GuidePaige";

const SearchPage = () =>
{
    const location = useLocation()
    const searchTextParams = new URLSearchParams(location.search).get('searchText')
    const [searchText, setSearchText] = useState("")
    const [searchType, setSearchType] = useState(SearchType[0])

    useEffect(() => {
        setSearchText(searchTextParams)
    }, [searchTextParams])

    return (
        <div>
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

            {searchType.id === "STUDENT" && <StudentsPage search={searchText}/>}
            {searchType.id === "DEPARTMENT" && <DepartmentsPage search={searchText}/>}
            {searchType.id === "GROUP" && <GroupsPage search={searchText}/>}
            {searchType.id === "SPECIALITY" && <SpecialityPage search={searchText}/>}
            {searchType.id === "SUBJECT" && <SubjectsPage search={searchText}/>}
            {searchType.id === "DEPARTMENT_HEAD" && <GuidePaige search={searchText} teacherVisibility={false} directorVisibility={false}/>}
            {searchType.id === "TEACHER" && <GuidePaige search={searchText} departmentHeadVisibility={false} directorVisibility={false}/>}
        </div>
    );
};

export default SearchPage;