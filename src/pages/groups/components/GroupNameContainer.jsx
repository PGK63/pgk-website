import React from 'react';
import GroupService from "../../../api/group/GroupService";

const GroupNameContainer = (props) => {
    return (
        <div style={{margin: "30px", alignItems: "center", display: "flex", justifyContent: "center"}}>
            <h1 style={{fontWeight: "bold"}}>{GroupService.getName(props.group)}</h1>
        </div>
    );
};

export default GroupNameContainer;