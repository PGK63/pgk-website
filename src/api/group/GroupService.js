import axios from "axios";
import AuthService from "../auth/AuthService";
import BaseConstants from "../../utils/BaseConstants";

export default class GroupService {
    static async getAll(pageNumber = 1, pageSize = BaseConstants.PAGE_SIZE, search = null) {
        const response = await axios.get("https://api.cfif31.ru/pgk63/api/Group", {
            params: {
                "pageSize": pageSize,
                "pageNumber": pageNumber,
                "search": search
            },
            headers: {
                "Authorization": "Bearer " + await AuthService.getToken()
            }
        })
        return response.data
    }

    static async getById(id) {
        const response = await axios.get("https://api.cfif31.ru/pgk63/api/Group/" + id, {
            headers: {
                "Authorization": "Bearer " + await AuthService.getToken()
            }
        })

        return response.data
    }

    static async createRaportichka(groupId) {
        const response = await axios.post(`https://api.cfif31.ru/pgk63/api/Group/${groupId}/Raportichka`, null, {
            headers: {
                "Authorization": "Bearer " + await AuthService.getToken()
            }
        })

        return response.data
    }

    static async create(course, number, specialityId, departmentId, classroomTeacherId) {
        const data = JSON.stringify({
            course: Number(course),
            number: Number(number),
            specialityId: Number(specialityId),
            departmentId: Number(departmentId),
            classroomTeacherId: Number(classroomTeacherId),
        })

        const response = await axios.post(`https://api.cfif31.ru/pgk63/api/Group`, data, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + await AuthService.getToken()
            }
        })

        return response.data
    }

    static async updateCourse(groupId, course) {
        return await axios.patch(`https://api.cfif31.ru/pgk63/api/Group/${groupId}/Course`, null, {
            params: {
                course: course
            }
        })
    }

    static getName(group) {
        return group.speciality.nameAbbreviation + "-" + group.course + group.number
    }
}