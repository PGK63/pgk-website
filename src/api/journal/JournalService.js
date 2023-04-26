import BaseConstants from "../../utils/BaseConstants";
import axios from "axios";
import AuthService from "../auth/AuthService";

export default class JournalService {

    static async getAll(pageNumber = 1, pageSize = BaseConstants.PAGE_SIZE) {
        const response = await axios.get("https://api.cfif31.ru/pgk63/api/Journal", {
            params: {
                "pageSize": pageSize,
                "pageNumber": pageNumber
            },
            headers: {
                "Authorization": "Bearer " + await AuthService.getToken()
            }
        })
        return response.data
    }

    static async getSubjectAll(journalId, pageNumber = 1, pageSize = BaseConstants.PAGE_SIZE) {
        const response = await axios.get("https://api.cfif31.ru/pgk63/api/Journal/Subject", {
            params: {
                "pageSize": pageSize,
                "pageNumber": pageNumber,
                "journalId": journalId
            },
            headers: {
                "Authorization": "Bearer " + await AuthService.getToken()
            }
        })
        return response.data
    }

    static async getRowAll(journalSubjectId) {
        const response = await axios.get("https://api.cfif31.ru/pgk63/api/Journal/Subject/Row", {
            params: {
                "pageSize": 2**15,
                "pageNumber": 1,
                "journalSubjectId": journalSubjectId
            },
            headers: {
                "Authorization": "Bearer " + await AuthService.getToken()
            }
        })

        return response.data
    }

    static async getTopicsAll(journalSubjectId) {
        const response = await axios.get("https://api.cfif31.ru/pgk63/api/Journal/Subject/Topic", {
            params: {
                "pageSize": 2**15,
                "pageNumber": 1,
                "journalSubjectId": journalSubjectId
            },
            headers: {
                "Authorization": "Bearer " + await AuthService.getToken()
            }
        })

        return response.data
    }

    static async deleteRow(id) {
        const response = await axios.delete(`https://api.cfif31.ru/pgk63/api/Journal/Subject/Row/Column/${id}`, {
            headers: {
                "Authorization": "Bearer " + await AuthService.getToken()
            }
        })

        return response.data
    }

    static async updateEvaluation(columnId, evaluation) {
        const response = await axios.patch(`https://api.cfif31.ru/pgk63/api/Journal/Subject/Row/Column/${columnId}/Evaluation`,null, {
            params: {
                "evaluation": `HAS_${evaluation}`
            },
            headers: {
                "Authorization": "Bearer " + await AuthService.getToken()
            }
        })

        return response.data
    }

    static async addColumn(studentId, journalSubjectId, evaluation, date, rowId) {

        const data = JSON.stringify({
            studentId: Number(studentId),
            journalSubjectId: Number(journalSubjectId),
            journalSubjectRowId: Number(rowId),
            evaluation: `HAS_${evaluation}`,
            date: date
        })

        const response = await axios.post(`https://api.cfif31.ru/pgk63/api/Journal/Subject/Row/Column`,data, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + await AuthService.getToken()
            }
        })

        console.log(rowId)
        console.log(Number(rowId))
        console.log(response)
        console.log(response.data)

        return response.data
    }

    static EvaluationCorrection(evaluation) {
        return evaluation.replace("HAS_", "")
    }
}