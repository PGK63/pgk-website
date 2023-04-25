import React, {useEffect, useState} from 'react';
import MainHeader from "../../components/mainHeader/MainHeader";
import RaportichkaService from "../../api/raportichka/RaportichkaService";
import {useParams} from "react-router-dom";
import UserService from "../../api/user/UserService";
import GroupService from "../../api/group/GroupService";
import {useTable} from "react-table";
import Modal from "../../components/modal/Modal";
import RedButton from "../../components/RedButton";
import BaseButton from "../../components/BaseButton";

const RaportichkaTable = () => {

    const raportichkaId = useParams().id
    const [raportichkaRows, setRaportichkaRows] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [rowItemId, setRowItemId] = useState(null)

    useEffect(() => {
        if(rowItemId !== null){
            setShowModal(true)
        }else {
            setShowModal(false)
        }
    }, [rowItemId])
    
    useEffect(() => {
        getRaportichka()
    }, [raportichkaId])

    function getRaportichka() {
        RaportichkaService.getRowAll(raportichkaId).then((r) => {
            let rows = r.results

            rows = rows.map((row) => {
                return {
                    id: row.id,
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
    }

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

    function deleteRowItem() {
        if(rowItemId != null) {
            RaportichkaService.deleteRow(rowItemId).then(() => {
                setRowItemId(null)
                getRaportichka()
            })
        }
    }

    function updateConfirmation() {
        if(rowItemId != null) {
            RaportichkaService.updateConfirmation(rowItemId).then(() => {
                setRowItemId(null)
                getRaportichka()
            }).catch((e) => console.log(e))
        }
    }

    return (
        <div>
            <MainHeader/>

            <Modal show={showModal} handleClose={() => setRowItemId(null)} showButtonClose={false}>
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%"
                }}>
                    <BaseButton onClick={updateConfirmation}>
                        Добавить/Убрать подпись
                    </BaseButton>

                    <RedButton onClick={deleteRowItem}>
                        Удалить поле
                    </RedButton>
                </div>
            </Modal>

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
                                    <td {...cell.getCellProps()}
                                        onClick={() => {
                                            setRowItemId(row.original.id)
                                        }
                                    }> {cell.render("Cell")} </td>
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