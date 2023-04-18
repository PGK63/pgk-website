import axios from "axios"
import AuthService from "../auth/AuthService"
import BaseConstants from "../../utils/BaseConstants";

export default class StudentServide {

    static async getAll(pageNumber = 1, pageSize = BaseConstants.PAGE_SIZE, groupIds = null) {
        const response = await axios.get("https://api.cfif31.ru/pgk63/api/Student", {
            params: {
                "pageNumber": pageNumber,
                "pageSize": pageSize,
                "groupIds": groupIds
            },
            headers: {
                "Authorization": "Bearer " + await AuthService.getToken()
            }
        })
        return response.data
    }
}