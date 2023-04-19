import React, {Component} from 'react';
import "./PasswordReset.css";
import { Player } from '@lottiefiles/react-lottie-player';
class PasswordReset extends Component {
    render() {
        return (
            // <div>
            //     <h1 style={{ textAlign: "center"}}> Восстановление через телеграм</h1>
            //     <p style={{textAlign: "center"}}> <img  style={{ width: "300px", height: "300px"}} src={"https://api.cfif31.ru/pgk63/api/Image/telegram_bot_qrcode.png"}/> </p>
            //     <h3 style={{textAlign: "center"}}> Отсканируйте qr код с помощью вашего телефона и выполните дальнейшие инструкции</h3>
            //      <h1 style={{padding: "20px", textAlign: "center"}}>Ввостановление через электронную почту</h1>
            //     <h3 style={{padding: "20px", textAlign: "center"}}>1. Введите вашу почту</h3>
            //      <h3 style={{padding: "20px", textAlign: "center"}}>2. Нажмите кнопку "отправить код"</h3>
            //        <h3 style={{padding: "20px", textAlign: "center"}}>3. Следуйте дальнейшим указаниям</h3>
            //     <p style={{padding: "20px", textAlign: "center"}}><input  type="text"
            //                                                               className="form-control"
            //                                                               placeholder="Email" style={{width:"300px",margin: "auto",
            //         display: "block"}} /></p>|
            //     <button className="password-reset-button" style={{margin: "auto",
            //         display: "block"}} > отправить писмо на почту</button>
            // </div>
            <body >
            <div>
                <div className="split left">
                    <div className="centered">
                        <Player
                            autoplay={true}
                            src="https://assets10.lottiefiles.com/packages/lf20_kdx6cani.json"
                            style={{ height: '500px', width: '500px',padding :"50px" }}/>
                            <h2>Ввостановление пароля по почте</h2>
                            <h3>Вам на Email придёт ссылка, перейдя по ней вы увидете свой пароль</h3>
                        <input
                            type="text"
                            className="form-control"
                            id="email"
                            placeholder="Email"
                            style={{borderColor: 'darkgrey', }}
                        />
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
                        }}>Отправить письмо на почту</button>

                    </div>
                </div>

                <div className="split right">
                    <div className="centered">
                        <img style={{  width: "400px",
                            padding :"100px"}} src="https://api.cfif31.ru/pgk63/api/Image/telegram_bot_qrcode.png" alt="Avatar man"/>
                           <p style={{color:"white"}}> <h2 >Ввостановление через телеграм</h2></p>
                           <p style={{color:"white"}}> <h3 >1. Осканируйте Qr code</h3></p>
                           <p style={{color:"white"}}> <h3 >2. Отправьте в чат с ботом сообщение /password_reset</h3></p>


                    </div>
                </div>
                </div></body>
        );
    }
}

export default PasswordReset;