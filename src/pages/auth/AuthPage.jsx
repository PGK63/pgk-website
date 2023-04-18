import React, {useState} from 'react';
import "./AuthPage.css";
import { useNavigate } from "react-router-dom";
import AuthService from "../../api/auth/AuthService";
// import logo from 'src/resources/icons/pgk_icon.png';

const AuthPage = () => {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [password, setPassword] = useState("")
    const [errorText, setErrorText] = useState("")
    const [spinnerBorderVisibility, setSpinnerBorderVisibility] = useState("hidden")

    async function auth() {
        setErrorText("")

        if(firstName === "" || lastName === "" || password === "") {
            setErrorText("Заполните все поля")
        }else {
            setSpinnerBorderVisibility("visible")

            await AuthService.auth(firstName, lastName, password).then(data => {
                setSpinnerBorderVisibility("hidden")

                if(data.data.errorMessage === null){
                    navigate("/")
                }else {
                    setErrorText(data.data.errorMessage)
                }
            }).catch(err => {
                setSpinnerBorderVisibility("hidden")
                setErrorText(err)
            })
        }
    }

    function openImagePopupPasswordReset(width, height) {
        const left = window.screen.width / 2 - width / 2
        const top = window.screen.height / 2 - height / 2

        const imageWindow = window.open('', '', `width=${"600px"}, height=${"600px"}, left=${left}, top=${top}`);
        imageWindow.document.write(`
        <body>
        <p style="text-align: center">
            <img src="https://api.cfif31.ru/pgk63/api/Image/telegram_bot_qrcode.png" width="400px"/>
            <div style="display: flex; justify-content: center; align-items: center">
        </p> 
        <button style="background-color: gainsboro;
        border: none;
        padding: 10px 80px;
        color: #525252;
        font-size: 1.05rem;
        opacity: .7;
        margin-top: 15px;
        border-radius: 15px;
        cursor: pointer;
        text-decoration: none;
        width: 320px;
        display: flex; justify-content: center; align-items: center;">Востановление пароля по почте</button> 
        </body>`)

        imageWindow.document.close()
    }

    return (
        <div className="main">
            <div className="main-block">
                <img src={require("../../resources/icons/pgk_icon.png")} style={{width: "90px", height: "90px"}}/>
                <div className="block-info">
                    <div className="button-block">
                        <div className="block-text">
                            <h1>Доброе утро</h1>
                            <p className="p-text-one">Вход в личный кабинет</p>
                            <p className="p-text-error">{errorText}</p>
                            <div className="spinner-border" role="status" style={{visibility: spinnerBorderVisibility}}>
                                <span className="visually-hidden">Loading...</span>
                            </div>

                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Имя"
                                    value={firstName}
                                    onChange={event => setFirstName(event.target.value)}
                                />
                                <label htmlFor="firstName">Имя</label>
                            </div>

                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="lastName"
                                    placeholder="Фамилия"
                                    value={lastName}
                                    onChange={event => setLastName(event.target.value)}
                                />
                                <label htmlFor="lastName">Фамилия</label>
                            </div>

                            <div className="form-floating">
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    placeholder="Пароль"
                                    value={password}
                                    onChange={event => setPassword(event.target.value)}
                                />
                                <label htmlFor="password">Пароль</label>
                            </div>
                            <button id="auth_button" className="a-link" onClick={auth}>Войти</button>
                            <button className="password-reset-button" onClick={openImagePopupPasswordReset}>Забыл пароль</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;