import BaseConstants from "../../utils/BaseConstants";
import axios from "axios";
import AuthService from "../auth/AuthService";

export default class SubjectsService {

    static async getAll(
        pageNumber = 1,
        teacherIds = null,
        pageSize = BaseConstants.PAGE_SIZE,
        search = null
    ) {
        const response = await axios.get("https://api.cfif31.ru/pgk63/api/Subject", {
            params: {
                "pageNumber": pageNumber,
                "pageSize": pageSize,
                "teacherIds": teacherIds,
                "search": search
            },
            headers: {
                "Authorization": "Bearer " + await AuthService.getToken()
            }
        })

        return response.data
    }

    static async getById(id) {
        const response = await axios.get(`https://api.cfif31.ru/pgk63/api/Subject/${id}`, {
            headers: {
                "Authorization": "Bearer " + await AuthService.getToken()
            }
        })

        return response.data
    }

    static async create(subjectTitle) {

        const data = JSON.stringify({
            subjectTitle: subjectTitle
        })

        const response = await axios.post(`https://api.cfif31.ru/pgk63/api/Subject`, data, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + await AuthService.getToken()
            }
        })

        return response.data
    }
}