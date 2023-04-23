import React from 'react';
import GroupService from "../../../api/group/GroupService";
import {correctionDate} from "../../../utils/DateExtensions";
import {useNavigate} from "react-router-dom";

const RaportichkaItem = (preps) => {

    const navigate = useNavigate()
    const raportichka = preps.item
    const url = `/raportichka/${raportichka.id}/table`

    return (
        <div className="card" style={{cursor: "pointer"}} onClick={() => navigate(url)}>
            <div className="card-body">
                <h5 className="card-title">{GroupService.getName(raportichka.group)}</h5>
                <h5 className="card-title">{correctionDate(raportichka.date)}</h5>
            </div>
        </div>
    );
};

export default RaportichkaItem;