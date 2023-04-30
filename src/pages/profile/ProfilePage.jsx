import React, {useEffect, useState} from 'react';
import MainHeader from "../../components/mainHeader/MainHeader";
import UserService from "../../api/user/UserService";
import BaseButton from "../../components/BaseButton";
import {useNavigate} from "react-router-dom";
import {EmailState, getEmailState} from "../../api/user/model/EmailState";
import {getTelegramState, TelegramState} from "../../api/user/model/TelegramState";

const ProfilePage = () => {

    const [userIcon, serUserIcon] = useState("")
    const [newUserIcon, setNewUserIcon] = useState(null)
    const [user, setUser] = useState()
    const navigate = useNavigate()
    const [emailState, setEmailState] = useState(EmailState.INSECURITY)
    const [telegramState, setTelegramState] = useState(TelegramState.INSECURITY)

    useEffect( () => {
        getUser()
    }, [])

    async function getUser() {
        const response = await UserService.get()

        if(response != null){
            setUser(response)
            setEmailState(getEmailState(response.email, response.emailVerification))
            setTelegramState(getTelegramState(response.telegramId))
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
            <div className="content" style={{margin: "0 auto", textAlign: "center"}}>

                <div style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: 'center',
                    textAlign: "center"
                }}>
                    <div className="profile-card" style={{marginTop: "30px"}}>
                        <img src={userIcon} style={{borderRadius: "10px", width: "300px"}}/>
                        <h3 style={{margin: "10px"}}>{UserService.getFIOFull(user)}</h3>
                    </div>
                </div>

                <div style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: 'center'
                }}>
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
                </div>


                <div style={{
                    marginTop: "80px",
                    width: "100%",
                    display: "flex",
                    justifyContent: 'center'
                }}>
                    <div style={{textAlign: "center"}}>
                        <h3>Безопасность</h3>
                        <BaseButton onClick={() => navigate("/settings/email")}>
                            <img src={emailState.icon} style={{width: "30px", height: "30px", marginRight: "10px"}}/>
                            {emailState.text}
                        </BaseButton>
                        <BaseButton onClick={() => navigate("/settings/telegram")}>
                            <img src={telegramState.icon} style={{width: "30px", height: "30px", marginRight: "10px"}}/>
                            {telegramState.text}
                        </BaseButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;