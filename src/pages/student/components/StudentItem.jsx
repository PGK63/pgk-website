import React, {useEffect, useState} from 'react';
import GroupService from '../../../api/group/GroupService';
import profilePhotoIcon from '../../../resources/icons/profile_photo.png';
import UserService from "../../../api/user/UserService";

const StudentItem = (props) => {

    const [name, setName] = useState("")
    const [icon, setIcon] = useState("")

    useEffect( () => {
        const photoUrl = props.student.photoUrl

        setName(UserService.getFIOFull(props.student))

        if(photoUrl === null){
            setIcon(profilePhotoIcon)
        }else {
            setIcon(photoUrl)
        }
    }, [props.student])

    return (
        <div>
            <div className="content">
            <div className="card" style={{width: "18rem"}}>
                <img src={icon} className="card-img-top"/>
                <div className="card-body">
                    <p className="card-text">
                        {name}
                    </p>
                    <p className='card-text'>
                        {GroupService.getName(props.student.group)}
                    </p>
                </div>
            </div>
            </div>
        </div>
    )
}

export default StudentItem;