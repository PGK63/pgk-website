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

    static EvaluationCorrection(evaluation) {
        return evaluation.replace("HAS_", "")
    }
}