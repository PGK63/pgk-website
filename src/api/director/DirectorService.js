import axios from "axios";
import AuthService from "../auth/AuthService";
import BaseConstants from "../../utils/BaseConstants";

export default class DirectorService {
    static async getAll(pageNumber = 1, pageSize = BaseConstants.PAGE_SIZE) {
        const response = await axios.get("https://api.cfif31.ru/pgk63/api/Director", {
            params: {
                "pageSize": pageSize,
                "pageNumber": pageNumber,
                "current": true
            },
            headers: {
                "Authorization": "Bearer " + await AuthService.getToken()
            }
        })
        return response.data
    }
}