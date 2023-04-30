import React from 'react';
import MainHeader from "../../components/mainHeader/MainHeader";
import {Player} from "@lottiefiles/react-lottie-player";
import {useNavigate} from "react-router-dom";



const SettingsTelegram = () => {
    return (
        <div>
            <div className="content">
            <h1 style={{textAlign: "center",padding: "100px"}}>Телеграм</h1>
                <Player
                    autoplay={true}
                    src="https://assets8.lottiefiles.com/packages/lf20_xhlbndhm.json"
                    style={{ height: '400px', width: '400px'}}/>
                <h4 style={{textAlign: "center",margin: "10px"}}>Если вы забудете пароль, вы сможете  изменить пароль с помощью нашего телеграм бота</h4>
                <h2 style={{textAlign: "center",margin: "30px", color: "#205798", textDecoration: "underline"}} onClick={() => window.open("https://t.me/pgk63_bot", "_blank")}>ссылка</h2>
            </div>
        </div>
    );
};

export default SettingsTelegram;