import React, {useEffect, useRef, useState} from 'react';
import MainHeader from "../../components/mainHeader/MainHeader";
import {useFetching} from "../../hooks/useFetching";
import {useObserver} from "../../hooks/useObserver";
import SpecialityService from "../../api/speciality/SpecialityService";
import BaseButton from "../../components/BaseButton";
import ErrorText from "../../components/ErrorText";
import Loading from "../../components/Loading";
import SpecialityItem from "./components/SpecialityItem";
import {useNavigate} from "react-router-dom";
import BaseConstants from "../../utils/BaseConstants";
import EmptyListUi from "../../components/EmptyListUi";

const SpecialtiesPage = (preps) => {
    const navigate = useNavigate()
    const [specialties, setSpecialties] = useState([])
    const [totalPages, setTotalPages] = useState(0)
    const [totalCount, setTotalCount] = useState(0)
    const [page, setPage] = useState(1)
    const lastElement = useRef()
    const [isSearch, setIsSearch] = useState(false)
    const search = preps.search

    const [fetchSpecialties, isSpecialtiesLoading, specialtiesError] = useFetching(async () => {
        const response = await SpecialityService.getAll(page, BaseConstants.PAGE_SIZE, search);
        if(response != null){
            setTotalPages(response.totalPages)
            setTotalCount(response.totalCount)

            if(isSearch){
                setPage(1)
            }

            if(page === 1 && search !== null){
                setSpecialties([])
                setSpecialties([...response.results])
            }else {
                setSpecialties([...specialties, ...response.results])
            }
        }
    })

    useObserver(lastElement, page < totalPages, isSpecialtiesLoading, () => {
        setPage(page + 1)
    })

    useEffect(() => {
        if(page === 1 && search !== null){
            // console.log(search)
        }else {
            fetchSpecialties()
        }
    }, [page])

    useEffect(() => {
        searchUpdateData()
    }, [search])

    useEffect(() => {
        if(isSearch){
            fetchSpecialties().then(() => setIsSearch(false))
        }
    }, [isSearch])

    async function searchUpdateData() {
        if(search !== null && search !== ""){
            setIsSearch(true)
            setTotalCount(0)
            setTotalPages(0)
            setSpecialties([])
            setPage(1)
        }
    }

    return (
        <div>
            <div className="content">
                { search === undefined &&
                    <div style={{margin: "30px", alignItems: "center", display: "flex", justifyContent: "space-around"}}>
                        <h1 style={{fontWeight: "bold"}}>{"Специальности (" + totalCount + ")"}</h1>
                        <BaseButton onClick={() => navigate(`/specialties/create`)}>Добавить</BaseButton>
                    </div>
                }

                {specialtiesError &&
                    <ErrorText>{"Произошла ошибка \n " + specialtiesError}</ErrorText>
                }
                {isSpecialtiesLoading &&
                    <Loading/>
                }
                {(!isSpecialtiesLoading && specialtiesError === "" && specialties.length === 0) &&
                    <EmptyListUi/>
                }

                <li style={{margin: "0 auto", textAlign: "center"}}>{
                    specialties.map( speciality =>
                        <ul style={{display: "inline-block", verticalAlign: "top", margin: "10px"}}>
                            <SpecialityItem speciality={speciality} width="50rem"/>
                        </ul>
                    )
                }</li>

                <div ref={lastElement} style={{height: 20}}/>
            </div>
        </div>
    );
};

export default SpecialtiesPage;