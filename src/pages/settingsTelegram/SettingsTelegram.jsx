import React, {useEffect, useState} from 'react';
import {Player} from "@lottiefiles/react-lottie-player";
import BaseButton from "../../components/BaseButton";
import UserService from "../../api/user/UserService";

const SettingsTelegram = () => {

    const [telegramToken, setTelegramToken] = useState("")

    useEffect(() => {
        UserService.getTelegramToken().then(r => {
            setTelegramToken(r)
        })
    }, [])

    return (
        <div>
            <div className="content">
                <h1 style={{textAlign: "center", marginTop: "40px"}}>Телеграм бот</h1>

                <Player
                    autoplay={true}
                    loop={true}
                    controls={true}
                    src="https://assets4.lottiefiles.com/temp/lf20_Pn8REz.json"
                    style={{ height: '250px', width: '250px', marginTop: '40px'}}/>


                <h4 style={{textAlign: "center",margin: "10px"}}>Если вы забудете пароль, вы сможете  изменить пароль с помощью нашего телеграм бота</h4>
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    marginTop: "15px"
                }}>
                    <BaseButton onClick={
                        () =>
                            window.open(`https://t.me/pgk63_bot?start=${telegramToken}`, "_blank")
                    }>Авторезироваться</BaseButton>
                </div>
            </div>
        </div>
    );
};

export default SettingsTelegram;