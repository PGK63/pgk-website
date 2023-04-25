import React, {useEffect, useState} from 'react';
import { useTable } from 'react-table';
import MainHeader from "../../components/mainHeader/MainHeader";
import "./JournalTablePage.css";
import JournalService from "../../api/journal/JournalService";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import StudentService from "../../api/student/StudentService";
import UserService from "../../api/user/UserService";
import {correctionDate} from "../../utils/DateExtensions";
import BaseButton from "../../components/BaseButton";
import Modal from "../../components/modal/Modal";
import EvaluationItem from "./components/EvaluationItem";
import RedButton from "../../components/RedButton";

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
        const dates = journalColumn.map(column => column.date).sort((a,b) => a - b)

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

                    row.columns.forEach(col => {
                        const dateId = `date_${col.date}`
                        item[dateId] = JournalService.EvaluationCorrection(col.evaluation)
                        item[`${dateId}_id`] = col.id
                    })

                    item["+"] = "+"

                    return item
                }catch (e) {
                    return {
                        "studentFIO": UserService.getFIOShort(student)
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
        JournalService.deleteRow(rowId).then((r) => {
            setJournalRowItem(null)

            JournalService.getRowAll(journalSubjectId).then(r => {
                setJournalRows(r.results)
            })
        })
    }

    return (
        <div>
            <MainHeader/>

            <Modal show={modal} showButtonClose={false} handleClose={() => setJournalRowItem(null)}>
                { journalRowItem &&
                    <div style={{
                        justifyContent: "center",
                        display: "flex"
                    }}>
                        <div>
                            <h1 style={{
                                textAlign: "center",
                                width: "100%"
                            }}>{UserService.getFIOFull(journalRowItem.student)}</h1>
                            { journalRowItem.type !== "add_row_date" &&
                                <h1 style={{
                                    textAlign: "center",
                                    width: "100%"
                                }}>{correctionDate(journalRowItem.date)}</h1>
                            }
                            { journalRowItem.evaluation !== undefined &&
                                <div>
                                    <div style={{
                                        justifyContent: "center",
                                        display: "flex"
                                    }}>
                                        {["2","3","4","5","H"].map( item =>
                                            <EvaluationItem
                                                elevation={item}
                                                color={journalRowItem.evaluation === item ? "#205798" : "#919090"}
                                                onClick={() => {}}
                                            />
                                        )}
                                    </div>

                                    <BaseButton onClick={() => deleteRow(journalRowItem.rowId)}>
                                        Обновить оценку
                                    </BaseButton>

                                    <RedButton onClick={() => deleteRow(journalRowItem.rowId)}>
                                        Удалить оценку
                                    </RedButton>
                                </div>
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
                                                student: cell.row.original.student
                                            })
                                        }else if(cell.value === undefined) {
                                            setJournalRowItem({
                                                type: "add_evaluation",
                                                student: cell.row.original.student,
                                                date: cell.column.id.replace("date_", "")
                                            })
                                        }else if(cell.value.length === 1 || cell.value === "H"){
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