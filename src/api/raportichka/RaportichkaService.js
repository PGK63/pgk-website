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
}