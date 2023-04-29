import React, {useEffect, useState} from 'react';
import "./PasswordReset.css";
import { Player } from '@lottiefiles/react-lottie-player';
import UserService from "../../api/user/UserService";

const PasswordReset = () => {

    const [email, setEmail] = useState("")
    const [isSuccessSendEmail, setIsSuccessSendEmail] = useState(false)
    const [isSendEmailLoading, setIsSendEmailLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [timerSeconds, setTimerSeconds] = useState(30)

    function sendEmailPasswordReset() {

        if(!isSuccessSendEmail && !isSendEmailLoading) {
            console.log("11")
            setIsSendEmailLoading(true)
            setIsSuccessSendEmail(false)
            setErrorMessage("")

            if(email !== ""){
                UserService.sendEmailPasswordReset(email)
                    .then((response) => {
                        setIsSuccessSendEmail(true)
                        setIsSendEmailLoading(false)
                    })
                    .catch(() => {
                        setErrorMessage("Пользователь не найден")
                        setIsSendEmailLoading(false)
                    })
            }else {
                setErrorMessage("Видите электронную почту")
                setIsSendEmailLoading(false)
            }
        }
    }

    useEffect(
        () => {
            if(isSuccessSendEmail){
                if (timerSeconds <= 0) {
                    setIsSuccessSendEmail(false)
                    setTimerSeconds(30)
                    return;
                }
                const id = setInterval(() => setTimerSeconds(timerSeconds-1), 1000);
                return () => clearInterval(id);
            }
        },
        [timerSeconds, isSuccessSendEmail]
    );

    return (
        <div>
            <div className="split left">
                <div className="centered">
                    <Player
                        autoplay={true}
                        src="https://assets10.lottiefiles.com/packages/lf20_kdx6cani.json"
                        style={{ height: '400px', width: '400px'}}/>

                    <h4 style={{margin: "5px"}}>Восстановление пароля по почте</h4>
                    <h5 style={{margin: "15px"}}>Вам на Email придёт ссылка, перейдя по ней вы увидите свой пароль</h5>

                    {errorMessage &&
                        <h5 style={{color: "red"}}>{errorMessage}</h5>
                    }

                    {isSuccessSendEmail
                        ? <div>
                            <h5>Письмо отправлено</h5>
                            <h5>Отправить повторно через {timerSeconds}</h5>
                        </div>
                        : <div>
                            <div className="form-floating"  style={{margin: "15px"}}>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={event => setEmail(event.target.value)}
                                />
                                <label htmlFor="email">Электронная почта</label>
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
                                textDecoration:" none",
                            }} onClick={sendEmailPasswordReset}>Отправить письмо на почту</button>
                        </div>
                    }
                </div>
            </div>

            <div className="split right">
                <div className="centered">
                    <img style={{  width: "400px" }} src="https://api.cfif31.ru/pgk63/api/Image/telegram_bot_qrcode.png" alt="Avatar man"/>
                    <p style={{color:"white"}}> <h4 >Восстановление через телеграм</h4></p>
                    <p style={{color:"white"}}> <h5>1. Осканируйте Qr code</h5></p>
                    <p style={{color:"white"}}> <h5>2. Отправьте в чат с ботом сообщение /password_reset</h5></p>
                </div>
            </div>
        </div>
    );
};

export default PasswordReset;