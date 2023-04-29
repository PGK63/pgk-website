import React, {useEffect, useState} from 'react';
import MainHeader from "../../components/mainHeader/MainHeader";
import UserService from "../../api/user/UserService";
import BaseButton from "../../components/BaseButton";
import {useNavigate} from "react-router-dom";

const ProfilePage = () => {

    const [userIcon, serUserIcon] = useState("")
    const [newUserIcon, setNewUserIcon] = useState(null)
    const [user, setUser] = useState()
    const navigate = useNavigate()

    useEffect( () => {
        getUser()
    }, [])

    async function getUser() {
        const response = await UserService.get()

        if(response != null){
            setUser(response)
            console.log(response.photoUrl)
            if(response.photoUrl === null){
                serUserIcon(require("../../resources/icons/profile_photo.png"))
            }else {
                serUserIcon(response.photoUrl)
            }
        }
    }

    async function updateUserPhoto() {
        if(newUserIcon != null){
            await UserService.updatePhoto(newUserIcon)
            await getUser()
            setNewUserIcon(null)
        }
    }

    async function onChangeUserPhoto(e) {
        setNewUserIcon(e.target.files[0])
    }

    return (
        <div>
            <MainHeader/>
            <div className="content" style={{margin: "0 auto", textAlign: "center"}}>
                <div className="profile-card" style={{marginTop: "30px"}}>
                    <img src={userIcon} style={{borderRadius: "10px", width: "300px"}}/>
                    <h3 style={{margin: "10px"}}>{UserService.getFIOFull(user)}</h3>
                </div>

                <div className="input-group" style={{margin: "0 auto", textAlign: "center"}}>
                    <input
                        onChange={(e) => onChangeUserPhoto(e)}
                        accept="image/png, image/gif, image/jpeg"
                        type="file"
                        className="form-control"
                        id="inputGroupFile04"
                        aria-describedby="inputGroupFileAddon04"
                        aria-label="Upload"
                    />
                    <button onClick={updateUserPhoto} className="btn btn-outline-secondary" type="button" id="inputGroupFileAddon04">Изменить фото</button>
                </div>
                    <div style={{margin: "30px", width: "100%", display: "flex",justifyContent: "center"}}>
                <BaseButton onClick={() => navigate("/settings/telegram")}>Telegram-бот добавлен</BaseButton></div>
            </div>
        </div>
    );
};

export default ProfilePage;