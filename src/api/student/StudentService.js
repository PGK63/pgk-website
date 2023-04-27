import axios from "axios"
import AuthService from "../auth/AuthService"
import BaseConstants from "../../utils/BaseConstants";

export default class StudentService {

    static async getAll(
        pageNumber = 1,
        pageSize = BaseConstants.PAGE_SIZE,
        groupIds = null,
        search = null
    ) {
        const response = await axios.get("https://api.cfif31.ru/pgk63/api/Student", {
            params: {
                "pageNumber": pageNumber,
                "pageSize": pageSize,
                "groupIds": groupIds,
                "search": search
            },
            headers: {
                "Authorization": "Bearer " + await AuthService.getToken()
            }
        })
        return response.data
    }

    static async registration(firstName, lastName, middleName, groupId) {

        const data = JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            middleName: middleName,
            groupId: Number(groupId)
        })

        const response = await axios.post("https://api.cfif31.ru/pgk63/api/Student/Registration", data, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + await AuthService.getToken()
            }
        })

        return response.data
    }
}