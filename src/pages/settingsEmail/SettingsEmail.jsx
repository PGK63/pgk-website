import React, {useEffect, useState} from 'react';
import {EmailState, getEmailState} from "../../api/user/model/EmailState";
import UserService from "../../api/user/UserService";
import BaseButton from "../../components/BaseButton";

const SettingsEmail = () => {
    const [emailState, setEmailState] = useState(EmailState.INSECURITY)
    const [email, setEmail] = useState()
    const [user, setUser] = useState({email: ""})
    const [message, setMessage] = useState("")
    const [timerSeconds, setTimerSeconds] = useState(30)
    const [isSuccessSendEmail, setIsSuccessSendEmail] = useState(false)
    const [isSendEmailLoading, setIsSendEmailLoading] = useState(false)

    useState(() => {
        getUser()
    }, [])

    function getUser() {
        UserService.get().then((response) => {
            setEmailState(getEmailState(response.email, response.emailVerification))
            setUser(response)
            if(response.email !== null){
                setEmail(response.email)
            }
        })
    }

    function updateEmail() {
        if(!isSuccessSendEmail && !isSendEmailLoading){
            setMessage("")
            setIsSendEmailLoading(true)
            setIsSuccessSendEmail(false)

            UserService.updateEmail(email).then((r) => {
                if(r.message !== null && r.message !== "Почта сохранена, мы отправили письмо для подтверждения почты"){
                    setMessage(r.message)
                }else {
                    setIsSuccessSendEmail(true)
                    setIsSendEmailLoading(false)

                    getUser()
                }
            }).catch(() => {
                setMessage("Произошла ошибка")
                setIsSendEmailLoading(false)
            })
        }
    }

    function addEmail() {
        if(!isSuccessSendEmail && !isSendEmailLoading){
            setMessage("")
            setIsSendEmailLoading(true)
            setIsSuccessSendEmail(false)

            UserService.updateEmail(email).then((r) => {
                if(r.message !== null && r.message !== "Почта сохранена, мы отправили письмо для подтверждения почты"){
                    setMessage(r.message)
                }else {
                    setIsSuccessSendEmail(true)
                    setIsSendEmailLoading(false)

                    getUser()
                }
            }).catch(() => {
                setMessage("Произошла ошибка")
                setIsSendEmailLoading(false)
            })
        }
    }

    function emailVerification() {

        if(user.email !== email){
            updateEmail()
        }else {
            if(!isSuccessSendEmail && !isSendEmailLoading){
                setMessage("")
                setIsSendEmailLoading(true)
                setIsSuccessSendEmail(false)

                UserService.sendEmailVerification().then(() => {
                    setIsSuccessSendEmail(true)
                    setIsSendEmailLoading(false)

                    setMessage("Письмо отправлено")
                    getUser()
                }).catch(() => {
                    setMessage("Произошла ошибка")
                    setIsSendEmailLoading(false)
                })
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
        <div className="content">
            <div style={{
                justifyContent: "center",
                width: "100%",
                display: "flex",
                textAlign: "center"
            }}>
                <div>
                    <h1 style={{
                        marginTop: "40px",
                        marginBottom: "15px"
                    }}>Электронная почта</h1>

                    {message === "" &&
                        <h3 style={{
                            marginBottom: "30px"
                        }}>{
                            emailState === EmailState.SECURITY
                                ? "Электронная почта успешно добавлена"
                                : emailState === EmailState.INSECURITY
                                    ? "Добавте электронную почту"
                                    : "Вам на почту придет письмо для подверждения электронной почты"

                        }</h3>
                    }

                    {message !== "" &&
                        <h3  style={{
                            marginBottom: "30px"
                        }}>
                            {message}
                        </h3>
                    }

                    <div className="form-floating">
                        <input
                            type="text"
                            className="form-control"
                            id="email"
                            placeholder="Электронная почта"
                            value={email}
                            onChange={event => setEmail(event.target.value)}
                        />
                        <label htmlFor="email">Электронная почта</label>
                    </div>

                    {isSuccessSendEmail
                        ? <div>
                            <h5>Письмо отправлено</h5>
                            <h5>Отправить повторно через {timerSeconds}</h5>
                        </div>
                        :<div>
                            {(emailState === EmailState.SECURITY && user.email !== email) &&
                                <BaseButton onClick={updateEmail}>Обновить электронную почту</BaseButton>
                            }

                            {emailState === EmailState.INSECURITY && email !== "" &&
                                <BaseButton onClick={addEmail}>Добавить электронную почту</BaseButton>
                            }

                            {emailState === EmailState.EMAIL_VERIFICATION &&
                                <BaseButton onClick={emailVerification}>Отправить письмо</BaseButton>
                            }
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default SettingsEmail;