import React, {useEffect, useState} from 'react';
import MainHeader from "../../components/mainHeader/MainHeader";
import RaportichkaService from "../../api/raportichka/RaportichkaService";
import {useParams} from "react-router-dom";
import UserService from "../../api/user/UserService";
import GroupService from "../../api/group/GroupService";
import {useTable} from "react-table";

const RaportichkaTable = () => {

    const raportichkaId = useParams().id
    const [raportichkaRows, setRaportichkaRows] = useState([])

    useEffect(() => {
        RaportichkaService.getRowAll(raportichkaId).then((r) => {
            let rows = r.results

            rows = rows.map((row) => {
                return {
                    numberLesson: row.numberLesson,
                    student: `${UserService.getFIOShort(row.student)}\n(${GroupService.getName(row.student.group)})`,
                    subject: `${row.subject.subjectTitle}\n(${UserService.getFIOShort(row.teacher)})`,
                    hours: row.hours,
                    confirmation: row.confirmation ? "✔️" : "❌"
                }
            })

            rows = rows.sort((a, b) => a.numberLesson - b.numberLesson)

            setRaportichkaRows(rows)
        })
    }, [raportichkaId])

    const data = React.useMemo(() => raportichkaRows, [raportichkaRows]);

    const columns = React.useMemo(
        () => [
            {
                Header: "Пара",
                accessor: "numberLesson",
            },
            {
                Header: "Студент",
                accessor: "student",
            },
            {
                Header: "Предмет",
                accessor: "subject",
            },
            {
                Header: "Часы",
                accessor: "hours",
            },
            {
                Header: "Подпись",
                accessor: "confirmation",
            },
        ],
        []
    );

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

export default RaportichkaTable;