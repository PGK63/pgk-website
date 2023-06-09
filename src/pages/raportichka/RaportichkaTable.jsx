import React, {useEffect, useState} from 'react';
import MainHeader from "../../components/mainHeader/MainHeader";
import RaportichkaService from "../../api/raportichka/RaportichkaService";
import {useNavigate, useParams} from "react-router-dom";
import UserService from "../../api/user/UserService";
import GroupService from "../../api/group/GroupService";
import {useTable} from "react-table";
import Modal from "../../components/modal/Modal";
import RedButton from "../../components/RedButton";
import BaseButton from "../../components/BaseButton";

const RaportichkaTable = () => {

    const navigate = useNavigate()
    const raportichkaId = useParams().id
    const [raportichkaRows, setRaportichkaRows] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [rowItemId, setRowItemId] = useState(null)
    const [groupId, setGroupId] = useState(0)
    const [deleteModal, setDeleteModal] = useState(false)


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

            try {
                setGroupId(rows[0].student.group.id)
            }catch (e){}

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

            rows.push({
                id: 0,
                numberLesson: "+",
                student: "+",
                subject: "+",
                hours: "+",
                confirmation: "+"
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

            <Modal show={deleteModal} handleClose={() => setDeleteModal(false)} >
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",}}>
                    <div style={{textAlign:"center"}}>
                        <h1 style={{marginTop: "35px", marginBottom: "20px"}}>Вы уверены?</h1>

                        <h4>Отменить действие будет нельзя</h4>
                        <h4>Действие удалит также все оценки и поля в рапортичках где присутствует этот предмет</h4>

                        <div style={{marginTop: "10px"}}>
                            <button  style={{
                                backgroundColor: "#b81414",
                                border: "none",
                                padding: "10px 130px",
                                color: "#ffffff",
                                fontSize: "1.05rem",
                                margin: "10px",
                                borderRadius: "15px",
                                cursor: "pointer",
                                textDecoration: "none"
                            }}>Удалить</button>
                        </div>
                    </div>
                </div>
            </Modal>


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
                                            const id = row.original.id

                                            if(id === 0)
                                                navigate(`/raportichka/${raportichkaId}/table/row/add?groupId=${groupId}`)
                                            else
                                                setRowItemId(id)
                                        }
                                    }> {cell.render("Cell")} </td>
                                ))}
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
                <button style={{  backgroundColor: "#205798",
                    border: "none",
                    padding: "10px 130px",
                    color: "#ffffff",
                    fontSize: "1.05rem",
                    margin: "10px",
                    borderRadius: "15px",
                    cursor: "pointer",
                    textDecoration: "none",
                    display:"flex",
                    marginLeft:"70%",
                    marginTop:"-5%"
                }} onClick={() => setDeleteModal(true)}>Создать ведомость</button>
            </div>
        </div>
    );
};

export default RaportichkaTable;