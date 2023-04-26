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

        return response.data
    }

    static async createJournal(groupId, course, semester) {
        const data = JSON.stringify({
            groupId: Number(groupId),
            course: Number(course),
            semester: Number(semester)
        })

        const response = await axios.post(`https://api.cfif31.ru/pgk63/api/Journal`,data, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + await AuthService.getToken()
            }
        })

        return response.data
    }

    static async createTopic(journalSubjectId, title, hours, homeWork, date) {
        const data = JSON.stringify({
            title: title,
            hours: Number(hours),
            homeWork: homeWork,
            date: date
        })

        const response = await axios.post(`https://api.cfif31.ru/pgk63/api/Journal/Subject/${journalSubjectId}/Topic`,data, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + await AuthService.getToken()
            }
        })

        return response.data
    }

    static async topicDeleteRow(topicId) {
        const response = await axios.delete(`https://api.cfif31.ru/pgk63/api/Journal/Subject/Topic/${topicId}`, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + await AuthService.getToken()
            }
        })

        return response.data
    }

    static async createSubject(journalId, maxHours, subjectId) {

        const data = JSON.stringify({
            hours: Number(maxHours),
            subjectId: Number(subjectId)
        })

        const response = await axios.post(`https://api.cfif31.ru/pgk63/api/Journal/${journalId}/Subject`, data, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + await AuthService.getToken()
            }
        })

        return response.data
    }

    static EvaluationCorrection(evaluation) {
        return evaluation.replace("HAS_", "")
    }
}