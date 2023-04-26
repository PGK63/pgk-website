import React, {useEffect, useState} from 'react';
import { useTable } from 'react-table';
import MainHeader from "../../components/mainHeader/MainHeader";
import "./JournalTablePage.css";
import JournalService from "../../api/journal/JournalService";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import StudentService from "../../api/student/StudentService";
import UserService from "../../api/user/UserService";
import {correctionDate, networkDateFormat} from "../../utils/DateExtensions";
import BaseButton from "../../components/BaseButton";
import Modal from "../../components/modal/Modal";
import EvaluationItem from "./components/EvaluationItem";
import RedButton from "../../components/RedButton";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const JournalTablePage = () => {

    const navigate = useNavigate();
    const location = useLocation()
    const journalId = useParams().journalId
    const groupId = new URLSearchParams(location.search).get('groupId')
    const subjectTitle = new URLSearchParams(location.search).get('subjectTitle')
    const maxHours = new URLSearchParams(location.search).get('maxHours')
    const journalSubjectId = useParams().subjectId
    const [journalRows, setJournalRows] = useState([])
    const [journalColumn, setJournalColumn] = useState([])
    const [journalDates, setJournalDates] = useState([])
    const [students, setStudents] = useState([])
    const [modal, setModal] = useState(false)
    const [journalRowItem, setJournalRowItem] = useState(null)
    const [date, onDateChange] = useState(new Date());
    const [evaluation, setEvaluation] = useState("")

    useEffect(() => {
        if(journalRowItem === null){
            setModal(false)
        }else {
            setModal(true)
        }
    }, [journalRowItem])

    useEffect(() => {
        JournalService.getRowAll(journalSubjectId).then(r => {
            setJournalRows(r.results)
        })
    }, [journalSubjectId])

    useEffect(() => {
        setJournalColumn(journalRows.map((row) => row.columns).flat(1))
    }, [journalRows])

    useEffect(() => {
        const dates = journalColumn.map(column => column.date).sort()

        dates.unshift("+")

        setJournalDates([...new Set(dates.map(item => item))])
    }, [journalColumn])

    useEffect(() => {
        StudentService.getAll(1,100, groupId).then((r) => {
            setStudents(r.results)
        })
    }, [groupId])

    const data = React.useMemo(() => {
        return [
            ...students.map((student) => {
                
                const row = journalRows.filter((r) => r.student.id === student.id)[0]

                try {
                    const item = {
                        "studentFIO": UserService.getFIOShort(student),
                        "student": student
                    }

                    if(row !== undefined){
                        item["rowId"] = row.id
                    }

                    row.columns.forEach(col => {
                        const dateId = `date_${col.date}`
                        item[dateId] = JournalService.EvaluationCorrection(col.evaluation)
                        item[`${dateId}_id`] = col.id
                    })

                    item["+"] = "+"

                    return item
                }catch (e) {
                    return {
                        "studentFIO": UserService.getFIOShort(student),
                        "student": student,
                        "+": "+"
                    }
                }
            })
        ]
    }, [journalRows, students]);

    const columns = React.useMemo(
        () => [
            {
                Header: "Студент",
                accessor: "studentFIO",
            },
            ...journalDates.map((r) => {

                if(r === "+"){
                    return {
                        Header: "Добавить",
                        accessor: "+",
                    }
                }else {
                    return {
                        Header: correctionDate(r),
                        accessor: "date_" + r,
                    }
                }
            })
        ],
        [journalDates]
    );

    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = useTable({ columns, data })

    function deleteRow(rowId) {
        JournalService.deleteRow(rowId).then(() => {
            setJournalRowItem(null)

            JournalService.getRowAll(journalSubjectId).then(r => {
                setJournalRows(r.results)
            })
        })
    }

    function updateEvaluation(columnId, evaluation) {
        JournalService.updateEvaluation(columnId, evaluation).then(() => {
            setJournalRowItem(null)

            JournalService.getRowAll(journalSubjectId).then(r => {
                setJournalRows(r.results)
            })
        })
    }

    function addColumn(studentId, columnDate, rowId) {

        JournalService.addColumn(
            studentId,
            journalSubjectId,
            evaluation,
            columnDate,
            rowId
        ).then(() => {
            setJournalRowItem(null)

            JournalService.getRowAll(journalSubjectId).then(r => {
                setJournalRows(r.results)
            }).catch((e) => console.log(e))
        })
    }

    return (
        <div>
            <MainHeader/>

            <Modal show={modal} showButtonClose={false} handleClose={() => setJournalRowItem(null)}>
                { journalRowItem &&
                    <div style={{
                        justifyContent: "center",
                        display: "flex",
                        textAlign: "center"
                    }}>
                        <div>
                            <h1 style={{
                                textAlign: "center",
                                width: "100%"
                            }}>{UserService.getFIOFull(journalRowItem.student)}</h1>

                            { journalRowItem.type === "add_row_date" &&
                                <div>
                                    <div className="Sample__container">
                                        <main className="Sample__container__content">
                                            <Calendar className= "calendar" onChange={onDateChange} value={date} />
                                        </main>
                                    </div>
                                </div>
                            }

                            { journalRowItem.type !== "add_row_date" &&
                                <h1 style={{
                                    textAlign: "center",
                                    width: "100%"
                                }}>{correctionDate(journalRowItem.date)}</h1>
                            }
                            { (
                                journalRowItem.type === "add_evaluation"
                                    || journalRowItem.type === "update_evaluation"
                                    || journalRowItem.type === "add_row_date"
                                ) &&
                                <div>
                                    <div style={{
                                        justifyContent: "center",
                                        display: "flex"
                                    }}>
                                        {["2","3","4","5","H"].map( item =>
                                            <EvaluationItem
                                                elevation={item}
                                                color={evaluation === item ? "#205798" : "#919090"}
                                                onClick={() => {setEvaluation(item)}}
                                            />
                                        )}
                                    </div>

                                    <BaseButton onClick={() => {
                                        if(journalRowItem.rowId !== undefined && journalRowItem.evaluation !== "0") {
                                            updateEvaluation(journalRowItem.rowId, evaluation)
                                        }else {
                                            addColumn(
                                                journalRowItem.student.id,
                                                journalRowItem.date === undefined ? networkDateFormat(date) : journalRowItem.date,
                                                journalRowItem.columnId
                                            )
                                        }
                                    }}>
                                        {journalRowItem.evaluation !== "0" ? "Обновить оценку" : "Добавить оценку"}
                                    </BaseButton>
                                </div>
                            }

                            { journalRowItem.evaluation !== "0" &&
                                <RedButton onClick={() => deleteRow(journalRowItem.rowId)}>
                                    Удалить оценку
                                </RedButton>
                            }
                        </div>
                    </div>
                }
            </Modal>

            <div className="content">
                <div style={{margin: "50px", alignItems: "center", display: "flex", justifyContent: "space-around"}}>
                    <h1 style={{fontWeight: "bold"}}>{subjectTitle}</h1>
                    <BaseButton
                        onClick={() => navigate(`/journals/${journalId}/subjects/${journalSubjectId}/topics?maxHours=${maxHours}`)}
                    >Темы</BaseButton>
                </div>

                <table {...getTableProps()}>
                    <thead>
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th {...column.getHeaderProps()}>
                                        {column.render("Header")}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => (
                                    <td {...cell.getCellProps()} onClick={() => {
                                        if(cell.column.Header === "Добавить"){
                                            setJournalRowItem({
                                                type: "add_row_date",
                                                student: cell.row.original.student,
                                                evaluation: "0"
                                            })
                                        }else if(cell.value === undefined) {
                                            setEvaluation("0")
                                            setJournalRowItem({
                                                type: "add_evaluation",
                                                student: cell.row.original.student,
                                                date: cell.column.id.replace("date_", ""),
                                                evaluation: "0",
                                                columnId: cell.row.original.rowId
                                            })
                                        }else if(cell.value.length === 1 || cell.value === "H"){
                                            setEvaluation(cell.value)
                                            setJournalRowItem({
                                                type: "update_evaluation",
                                                student: cell.row.original.student,
                                                evaluation: cell.value,
                                                rowId: cell.row.original[`${cell.column.id}_id`],
                                                date: cell.column.id.replace("date_", "")
                                            })
                                        }

                                    }}> {cell.render("Cell")} </td>
                                ))}
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default JournalTablePage;