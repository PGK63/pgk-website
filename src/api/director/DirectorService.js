import axios from "axios";
import AuthService from "../auth/AuthService";
import BaseConstants from "../../utils/BaseConstants";

export default class DirectorService {
    static async getAll(
        pageNumber = 1,
        search = null,
        pageSize = BaseConstants.PAGE_SIZE
    ) {
        const response = await axios.get("https://api.cfif31.ru/pgk63/api/Director", {
            params: {
                "pageSize": pageSize,
                "pageNumber": pageNumber,
                "current": true,
                "search": search
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

        const response = await axios.post("https://api.cfif31.ru/pgk63/api/Director/Registration", data, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + await AuthService.getToken()
            }
        })

        return response.data
    }
}