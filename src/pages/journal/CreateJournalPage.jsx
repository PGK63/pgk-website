import React, {useState} from 'react';
import MainHeader from "../../components/mainHeader/MainHeader";
import {useNavigate, useParams} from "react-router-dom";
import BaseButton from "../../components/BaseButton";
import JournalService from "../../api/journal/JournalService";

const CreateJournalPage = () => {

    const navigate = useNavigate()
    const params = useParams()
    const groupId = params.id
    const [course, setCourse] = useState("")
    const [semester, setSemester] = useState("")

    function createJournal() {
        JournalService.createJournal(groupId, course, semester).then((r) => {
            navigate(`/journals/${r.id}/subjects`)
        })
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
                    <div style={{
                        paddingTop: "60px"
                    }}>
                        <h1 style={{
                            margin: "40px"
                        }}>Добавить журнал</h1>

                        <div className="form-floating">
                            <input
                                type="text"
                                className="form-control"
                                id="course"
                                placeholder="Курс"
                                value={course}
                                onChange={event => setCourse(event.target.value)}
                            />
                            <label htmlFor="course">Курс</label>
                        </div>

                        <div className="form-floating">
                            <input
                                type="text"
                                className="form-control"
                                id="semester"
                                placeholder="Семестр"
                                value={semester}
                                onChange={event => setSemester(event.target.value)}
                            />
                            <label htmlFor="semester">Семестр</label>
                        </div>

                        <div style={{
                            justifyContent: "center",
                            width: "100%",
                            display: "flex"
                        }}>
                            <BaseButton onClick={createJournal}>Добавить</BaseButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateJournalPage;