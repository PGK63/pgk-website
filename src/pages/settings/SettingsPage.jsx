import React from 'react';
import {useNavigate} from "react-router-dom";
import RedButton from "../../components/RedButton";
import BaseButton from "../../components/BaseButton";

const SettingsPage = () => {

    const navigate = useNavigate()

    function signOut() {
        localStorage.setItem("user", null)
        navigate("/auth")
    }

    return (
        <div className="content">
            <div style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                textAlign: "center"
            }}>
                <div>
                    <h1 style={{
                        marginBottom: "40px",
                        marginTop: "50px"
                    }}>Настройки</h1>

                    <BaseButton onClick={() => navigate("/settings/email")}>Электронная почта</BaseButton>
                    <BaseButton onClick={() => navigate("/settings/telegram")}>Телеграм</BaseButton>
                    <RedButton onClick={signOut}>Выйти</RedButton>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;