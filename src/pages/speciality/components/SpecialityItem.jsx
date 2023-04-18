import React from 'react';

const SpecialityItem = (props) => {
    const speciality = props.speciality
    const width = props.width

    return (
        <div style={{margin: "30px", alignItems: "center", justifyContent: "center"}}>
            <div className="card" style={{width: width != null ? width :"30rem"}}>
                <div className="card-body" style={{textAlign: "center"}}>
                    <p style={{fontSize: "1.8em", margin: "10px"}}>{speciality.name}</p>
                    <p style={{fontSize: "1.2em", margin: "10px", fontWeight: "bold"}}>{speciality.department.name}</p>
                </div>
            </div>
        </div>
    );
};

export default SpecialityItem;