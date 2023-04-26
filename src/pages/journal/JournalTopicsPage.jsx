import React, {useEffect, useState} from 'react';
import MainHeader from "../../components/mainHeader/MainHeader";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import JournalService from "../../api/journal/JournalService";
import {correctionDate} from "../../utils/DateExtensions";
import {useTable} from "react-table";

const JournalTopicsPage = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const journalId = useParams().journalId
    const subjectId = useParams().subjectId
    const journalSubjectId = useParams().subjectId
    const maxHours = new URLSearchParams(location.search).get('maxHours')
    const [topics, setTopics] = useState([])

    useEffect(() => {
        JournalService.getTopicsAll(journalSubjectId).then(r => {
            let topics = r.results.sort((a,b) => a.hours - b.hours)

            topics = topics.map((topic) => {
                return {
                    id: topic.id,
                    title: topic.title,
                    homeWork: topic.homeWork,
                    hours: `${topic.hours}/${maxHours}`,
                    date: correctionDate(topic.date),
                }
            })

            topics.push({
                id: "+",
                title: "+",
                homeWork: "+",
                hours: "+",
                date: "+",
            })

            setTopics(topics)
        })
    }, [journalSubjectId, maxHours])

    const data = React.useMemo(() => topics, [topics]);

    const columns = React.useMemo(
        () => [
            {
                Header: "Тема",
                accessor: "title",
            },
            {
                Header: "Часы",
                accessor: "hours",
            },
            {
                Header: "Дата",
                accessor: "date",
            },
            {
                Header: "Задание на дом",
                accessor: "homeWork",
            }
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
                                    <td {...cell.getCellProps()} onClick={() => {
                                        if(cell.value === "+"){
                                            navigate(`/journals/${journalId}/subjects/${subjectId}/topics/create?maxHours=${maxHours}`)
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

export default JournalTopicsPage;