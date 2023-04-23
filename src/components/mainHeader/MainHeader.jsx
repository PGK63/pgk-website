import React, {useEffect, useState} from 'react';
import "./MainHeader.css";
import UserService from "../../api/user/UserService";
import {useNavigate} from "react-router-dom";

const MainHeader = (preps) => {
    const navigate = useNavigate();
    const [user, setUser] = useState()
    const [userFirstName, setFirstName] = useState()
    const [userIcon, serUserIcon] = useState("")
    const [searchText, setSearchText] = useState("")

    useEffect(() => {
        getUser()
    }, [])

    useEffect(() => {
        setSearchText(preps.searchText)
    }, [preps.searchText])

    async function getUser() {
        const response = await UserService.get()

        if(response != null){
            setUser(response)
            setFirstName(response.firstName)

            if(response.photoUrl === null){
                serUserIcon(require("../../resources/icons/profile_photo.png"))
            }else {
                serUserIcon(response.photoUrl)
            }
        }
    }

    return (
        <div>
            <header className="topnav">
                <div className="header-container">
                    <img
                        src={require("../../resources/icons/pgk_icon.png")}
                        className="pgk-icon"
                        style={{cursor: "pointer"}}
                        onClick={() => navigate("/")}/>

                    <div className="input-group mb-3">
                        <input
                            type="text"
                            id="search-input"
                            className="form-control"
                            placeholder="Ввод"
                            aria-label="Recipient's username"
                            aria-describedby="button-search"
                            value={searchText}
                            onChange={event => setSearchText(event.target.value)}
                            onKeyDown={ele => {
                                if(ele.code === "Enter") navigate("/search?searchText=" + searchText)
                            } }
                        />
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            id="button-search"
                            onClick={() => navigate("/search?searchText=" + searchText)}
                        >Поиск</button>
                    </div>

                    <div className="topnav-item-right" style={{margin: "10px"}}>
                        <b className="topnav-a">Доброе утро {userFirstName}</b>
                        <b className="topnav-a" id="date-text">Ср</b>
                        <b className="topnav-a" id="time-text">9:00</b>
                        <b className="topnav-a" id="weatcher-text">-15</b>
                        <b className="topnav-a">ИСП-239</b>
                    </div>
                </div>
            </header>
            <nav>
                <ul className="nav-ul">
                    <li className="nav-li">
                        <a href={`/profile`} className="profile-info">
                            <img src={userIcon}/>
                            <span className="nav-item">{UserService.getFIOShort(user)}</span>
                        </a>
                    </li>
                    <li className="nav-li"><a href={`/`}>
                        <img className="nav-item-icon" src={require("../../resources/icons/home.png")}/>
                        <span className="nav-item">Главная</span>
                    </a></li>
                    <li className="nav-li"><a href={`/journals`}>
                        <img className="nav-item-icon" src={require("../../resources/icons/journal.png")}/>
                        <span className="nav-item">Журнал</span>
                    </a></li>
                    <li className="nav-li"><a href={`/raportichka/list`}>
                        <img className="nav-item-icon" src={require("../../resources/icons/raportichka.png")}/>
                        <span className="nav-item">Рапортичка</span>
                    </a></li>
                    <li className="nav-li"><a href={`/groups`}>
                        <img className="nav-item-icon" src={require("../../resources/icons/groups.png")}/>
                        <span className="nav-item">Группы</span>
                    </a></li>
                    <li className="nav-li"><a href={`/students`}>
                        <img className="nav-item-icon" src={require("../../resources/icons/student.png")}/>
                        <span className="nav-item">Студенты</span>
                    </a></li>
                    <li className="nav-li"><a href={'/Guide'}>
                        <img className="nav-item-icon" src={require("../../resources/icons/guide.png")}/>
                        <span className="nav-item">Руководство</span>
                    </a></li>
                    <li className="nav-li"><a href={`/departments`}>
                        <img className="nav-item-icon" src={require("../../resources/icons/departmen.png")}/>
                        <span className="nav-item">Отделении</span>
                    </a></li>
                    <li className="nav-li"><a href={`/specialties`}>
                        <img className="nav-item-icon" src={require("../../resources/icons/specialization.png")}/>
                        <span className="nav-item">Срециальности</span>
                    </a></li>
                    <li className="nav-li"><a href={`/subjects`}>
                        <img className="nav-item-icon" src={require("../../resources/icons/subject.png")}/>
                        <span className="nav-item">Предмет</span>
                    </a></li>
                    <li className="nav-li"><a href="#">
                        <img className="nav-item-icon" src={require("../../resources/icons/settings.png")}/>
                        <span className="nav-item">Настройки</span>
                    </a></li>
                    <li className="nav-li"><a href="#">
                        <img className="nav-item-icon" src={require("../../resources/icons/help.png")}/>
                        <span className="nav-item">Помощь</span>
                    </a></li>
                </ul>
            </nav>
        </div>
    );
};

export default MainHeader;