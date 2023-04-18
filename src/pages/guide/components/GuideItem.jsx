import React, {useEffect, useState} from 'react';
import UserService from "../../../api/user/UserService";
import profilePhotoIcon from "../../../resources/icons/profile_photo.png";

const GuideItem = (props) => {
    const [name, setName] = useState("")
    const [icon, setIcon] = useState("")

    const role = props.role

    useEffect( () => {
        const photoUrl = props.quide.photoUrl

        setName(UserService.getFIOFull(props.quide))

        if(photoUrl === null){
            setIcon(profilePhotoIcon)
        }else {
            setIcon(photoUrl)
        }
    }, [props.quide])

    return (
        <div>
            <div className="content">
                <div className="card" style={{width: "18rem"}}>
                    <img src={icon} className="card-img-top" />
                    <div className="card-body">
                        <p className="card-text" style={{fontSize:'24px'}}>{name}</p>
                        <p className="card-text"
                           style={{fontSize:'18px', margin: "10px", fontWeight: "bold"}
                        }>{role}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GuideItem;