import BaseConstants from "../../utils/BaseConstants";
import axios from "axios";
import AuthService from "../auth/AuthService";

export default class TeacherService {

    static async getAll(pageNumber = 1, pageSize = BaseConstants.PAGE_SIZE, search = null, subjectIds) {
        const response = await axios.get("https://api.cfif31.ru/pgk63/api/Teacher", {
            params: {
                "pageSize": pageSize,
                "pageNumber": pageNumber,
                "search": search,
                "subjectIds" :subjectIds
            },
            headers: {
                "Authorization": "Bearer " + await AuthService.getToken()
            }
        })
        return response.data
    }

    static async registration(firstName, lastName, middleName) {

        const data = JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            middleName: middleName
        })

        const response = await axios.post("https://api.cfif31.ru/pgk63/api/Teacher/Registration", data, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + await AuthService.getToken()
            }
        })

        return response.data
    }

    static async addSubject(teacherId, subjectId) {
        return await axios.post(`https://api.cfif31.ru/pgk63/api/Teacher/${teacherId}/Subject`, null, {
            params: {
                subjectId: Number(subjectId)
            },
            headers: {
                "Authorization": "Bearer " + await AuthService.getToken()
            }
        })
    }

    static getName(teacher) {
        const middleName = teacher.middleName

        if(middleName === null){
            return teacher.lastName + " " + teacher.firstName[0] + "."
        }else {
            return teacher.lastName + " " + teacher.firstName[0] + "." + middleName[0] + "."
        }
    }
}