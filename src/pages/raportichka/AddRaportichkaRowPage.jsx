import React from 'react';
import MainHeader from "../../components/mainHeader/MainHeader";
import {useParams} from "react-router-dom";

const AddRaportichkaRowPage = () => {

    const params = useParams()
    const raportichkaId = params.id

    return (
        <div>
            <MainHeader/>
            <div className="content">
                <h1>Create row</h1>
                <h1>{raportichkaId}</h1>
            </div>
        </div>
    );
};

export default AddRaportichkaRowPage;