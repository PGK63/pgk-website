import React from 'react';
import MainHeader from "../../components/mainHeader/MainHeader";

const SettingsTelegram = () => {
    return (
        <div>
            <MainHeader/>
            <div className="content">
            <h1 style={{textAlign: "center",margin: "100px"}}>Телеграм</h1>
                {/*СЮДА АНИМАЦИЮ БЛЯТЬ ВПИХНИ*/}
                <h4 style={{textAlign: "center",margin: "100px"}}>Если вы забудете пароль, вы сможете  изменить пароль с помощью нашего телеграм бота</h4>
                <h4 style={{textAlign: "center",margin: "100px"}}>ссылка</h4>



            </div>
        </div>
    );
};

export default SettingsTelegram;