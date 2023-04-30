import React from 'react';
import {HistoryType} from "../../../api/user/model/HistoryType";
import {useNavigate} from "react-router-dom";

const HistoryItem = (preps) => {

    const navigate = useNavigate()
    const historyItem = preps.historyItem

    function cardClick() {
        if(historyItem.type === HistoryType.GROUP){
            navigate(`/groups/${historyItem.contentId}`)
        }
    }

    return (
        <div className="card" style={{cursor: "pointer"}} onClick={cardClick}>
            <div className="card-body">
                <h5 className="card-title">{historyItem.title}</h5>
                {historyItem.description !== undefined &&
                    <h5 className="card-title">{historyItem.description}</h5>
                }
            </div>
        </div>
    );
};

export default HistoryItem;