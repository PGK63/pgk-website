import React, {useEffect, useState} from 'react';
import { useTable } from 'react-table';
import MainHeader from "../../components/mainHeader/MainHeader";
import {Style} from "./JournalTablePage.css";
import JournalService from "../../api/journal/JournalService";
import {useLocation, useParams} from "react-router-dom";
import StudentService from "../../api/student/StudentService";
import UserService from "../../api/user/UserService";
import {correctionDate} from "../../utils/DateExtensions";

const JournalTablePage = () => {

    const location = useLocation()
    const journalId = useParams().journalId
    const groupId = new URLSearchParams(location.search).get('groupId')
    const journalSubjectId = useParams().subjectId
    const [journalRows, setJournalRows] = useState([])
    const [journalColumn, setJournalColumn] = useState([])
    const [journalDates, setJournalDates] = useState([])
    const [students, setStudents] = useState([])

    useEffect(() => {
        JournalService.getRowAll(journalSubjectId).then(r => {
            setJournalRows(r.results)
        })
    }, [journalSubjectId])

    useEffect(() => {
        setJournalColumn(journalRows.map((row) => row.columns).flat(1))
    }, [journalRows])

    useEffect(() => {
        const dates = journalColumn.map(column => column.date).sort(date => date)

        setJournalDates([...new Set(dates.map(item => item))])
    }, [journalColumn])

    useEffect(() => {
        StudentService.getAll(1,100, groupId).then((r) => {
            setStudents(r.results)
        })
    }, [])

    const data = React.useMemo(() => {
        return [
            ...students.map((student) => {
                
                const row = journalRows.filter((r) => r.student.id === student.id)[0]

                try {
                    const item = {"student": UserService.getFIOShort(student)};

                    row.columns.forEach(col => {
                        const dateId = `date_${col.date}`
                        item[dateId] = JournalService.EvaluationCorrection(col.evaluation)
                    })

                    return item
                }catch (e) {
                    return {
                        "student": UserService.getFIOShort(student)
                    }
                }
            })
        ]
    }, [journalRows, students]);

    const columns = React.useMemo(
        () => [
            {
                Header: "Студент",
                accessor: "student",
            },
            ...journalDates.map((r) => {
                return {
                    Header: correctionDate(r),
                    accessor: "date_" + r,
                }
            })
        ],
        [journalDates]
    );

    useEffect(() => {
        console.log(columns)
        console.log(data)
    }, columns, data)

    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = useTable({ columns, data })

    return (
        <div>
            <MainHeader/>
            <div className="content">
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
                                    <td {...cell.getCellProps()}> {cell.render("Cell")} </td>
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