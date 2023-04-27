import BaseConstants from "../../utils/BaseConstants";
import axios from "axios";
import AuthService from "../auth/AuthService";

export default class RaportichkaService {

    static async getAll(
        pageNumber = 1,
        confirmation = null,
        onlyDate = null,
        startDate = null,
        endDate = null,
        raportichkaId = null,
        groupIds = null,
        subjectIds = null,
        classroomTeacherIds = null,
        numberLessons = null,
        teacherIds = null,
        studentIds = null,
        pageSize = BaseConstants.PAGE_SIZE
    ) {
        const response = await axios.get("https://api.cfif31.ru/pgk63/api/Raportichka", {
            params: {
                "pageSize": pageSize,
                "pageNumber": pageNumber,
                "confirmation": confirmation,
                "onlyDate": onlyDate,
                "startDate": startDate,
                "endDate": endDate,
                "raportichkaId": raportichkaId,
                "groupIds": groupIds,
                "subjectIds": subjectIds,
                "classroomTeacherIds": classroomTeacherIds,
                "numberLessons": numberLessons,
                "teacherIds": teacherIds,
                "studentIds": studentIds,
            },
            headers: {
                "Authorization": "Bearer " + await AuthService.getToken()
            }
        })
        return response.data
    }

    static async getRowAll(id) {
        const response = await axios.get(`https://api.cfif31.ru/pgk63/api/Raportichka/${id}/Rows`, {
            params: {
                "pageSize": 2**15,
                "pageNumber": 1
            },
            headers: {
                "Authorization": "Bearer " + await AuthService.getToken()
            }
        })

        return response.data
    }

    static async deleteRow(id) {
        const response = await axios.delete(`https://api.cfif31.ru/pgk63/api/Raportichka/Row/${id}`, {
            headers: {
                "Authorization": "Bearer " + await AuthService.getToken()
            }
        })

        return response.data
    }

    static async updateConfirmation(id) {
        const response = await axios.patch(`https://api.cfif31.ru/pgk63/api/Raportichka/Row/${id}/Confirmation`,null, {
            headers: {
                "Authorization": "Bearer " + await AuthService.getToken()
            }
        })

        return response.data
    }

    static async addRow(
        raportichkaId,
        numberLesson,
        hours,
        subjectId,
        studentId,
        teacherId
    ) {

        const data = JSON.stringify({
            numberLesson: Number(numberLesson),
            hours: Number(hours),
            subjectId: Number(subjectId),
            studentId: Number(studentId),
            teacherId: Number(teacherId),
        })

        const response = await axios.post(`https://api.cfif31.ru/pgk63/api/Raportichka/${raportichkaId}/Row`,data, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + await AuthService.getToken()
            }
        })

        return response.data
    }
}