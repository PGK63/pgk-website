import React, {useState} from 'react';
import "./RegistrationPage.css";
import {Player} from "@lottiefiles/react-lottie-player";
import MainHeader from "../../components/mainHeader/MainHeader";
import {useNavigate, useParams} from "react-router-dom";

function RegistrationPage() {

    const navigate = useNavigate()
    const role = useParams().role
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [middleName, setMiddleName] = useState("")
    const [password, setPassword] = useState("")
    const [errorText, setErrorText] = useState("")

    return (
        <div>
            <MainHeader/>

            <div style={{
                marginLeft: "auto",
                marginRight: "auto",
                width: "28%"
            }}>
                <Player
                    autoplay={true}
                    src="https://assets1.lottiefiles.com/packages/lf20_jcikwtux.json"
                    style={{ height: '360px', width: '360px'}}/>

                <h1 style={{
                    width: "100%",
                    textAlign: "center"
                }}>Регистрация</h1>

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
                        type="text"
                        className="form-control"
                        id="middleName"
                        placeholder="Отчество"
                        value={middleName}
                        onChange={event => setMiddleName(event.target.value)}
                    />
                    <label htmlFor="lastName">Отчество</label>
                </div>

                <button style={{
                    backgroundColor: "#205798",
                    border: "none",
                    padding: "10px 130px",
                    color: "#ffffff",
                    fontSize: "1.05rem",
                    marginTop: "15px",
                    borderRadius: "15px",
                    cursor: "pointer",
                    textDecoration:" none"
                }}>Зарегистрировать</button>

            </div>
        </div>
    );
}
export default RegistrationPage;