import React, {useState} from 'react';
import MainHeader from "../../components/mainHeader/MainHeader";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import BaseButton from "../../components/BaseButton";
import Calendar from "react-calendar";
import JournalService from "../../api/journal/JournalService";
import {networkDateFormat} from "../../utils/DateExtensions";

const JournalCreateTopicPage = () => {

    const location = useLocation()
    const navigate = useNavigate()
    const params = useParams()
    const journalId = params.journalId
    const journalSubjectId = params.subjectId
    const maxHours = new URLSearchParams(location.search).get('maxHours')
    const [title, setTitle] = useState("")
    const [hours, setHours] = useState("")
    const [homeWork, setHomeWork] = useState("")
    const [date, setDate] = useState(new Date())

    function createTopic() {
        JournalService.createTopic(
            journalSubjectId,
            title,
            hours,
            homeWork,
            networkDateFormat(date)
        ).then(() => {
            navigate(`/journals/${journalId}/subjects/${journalSubjectId}/topics?maxHours=${maxHours}`)
        }).catch((e) => console.log(e))
    }

    return (
        <div>
            <MainHeader/>
            <div className="content">
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%"
                }}>
                    <div style={{}}>

                        <h1 style={{
                            margin: "40px"
                        }}>Добавить тему</h1>

                        <h4 style={{
                            textAlign: "center"
                        }}>Выберите дату</h4>

                        <div style={{
                            display: "flex",
                            justifyContent: "center",
                            width: "100%"
                        }}>
                            <Calendar onChange={setDate} value={date}/>
                        </div>

                        <div style={{
                            margin: "20px"
                        }}>
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    placeholder="Тема"
                                    value={title}
                                    onChange={event => setTitle(event.target.value)}
                                />
                                <label htmlFor="title">Тема</label>
                            </div>

                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="horse"
                                    placeholder="Часы"
                                    value={hours}
                                    onChange={event => setHours(event.target.value)}
                                />
                                <label htmlFor="horse">Часы</label>
                            </div>

                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="homeWork"
                                    placeholder="Задание на дом"
                                    value={homeWork}
                                    onChange={event => setHomeWork(event.target.value)}
                                />
                                <label htmlFor="homeWork">Задание на дом</label>
                            </div>
                        </div>

                        <div style={{
                            display: "flex",
                            justifyContent: "center",
                            width: "100%"
                        }}>
                            <BaseButton onClick={createTopic}>Добавить</BaseButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JournalCreateTopicPage;