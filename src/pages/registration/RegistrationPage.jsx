import React from 'react';
import "./RegistrationPage.css";
import {Player} from "@lottiefiles/react-lottie-player";

function RegistrationPage() {
    return (
        <div>
        <Player
            autoplay={true}
            src="https://assets1.lottiefiles.com/packages/lf20_jcikwtux.json"
            style={{ height: '600px', width: '500px',padding :"5px"}}/>
        <div className="Cflex"><p style={{padding: "50px"}}>

            <h1>Регистрация</h1>

            <div style={{padding: "10px"}}> <input
                type="text"
                className="form-control"
                id="Имя"
                placeholder="Имя"
                style={{borderColor: 'darkgrey', width: "300px", }}
            /></div>
            <div style={{padding: "10px"}}>  <input
                type="text"
                className="form-control"
                id="Фамилия"
                placeholder="Фамилия"
                style={{borderColor: 'darkgrey', width: "300px"  }}
            /></div>
            <div style={{padding: "10px"}}>  <input

                type="text"
                className="form-control"
                id="Отчество"
                placeholder="Отчество"
                style={{borderColor: 'darkgrey', width: "300px" }}
            /></div>
            <div >
                <button className="Registr_button"> Регистрация</button>
            </div>
        </p>
        </div>
        </div>

    );
}
export default RegistrationPage;