import BaseConstants from "../../utils/BaseConstants";
import axios from "axios";
import AuthService from "../auth/AuthService";

export default class SubjectsService {

    static async getAll(
        pageNumber = 1,
        teacherIds = null,
        pageSize = BaseConstants.PAGE_SIZE
    ) {
        const response = await axios.get("https://api.cfif31.ru/pgk63/api/Subject", {
            params: {
                "pageNumber": pageNumber,
                "pageSize": pageSize,
                "teacherIds": teacherIds
            },
            headers: {
                "Authorization": "Bearer " + await AuthService.getToken()
            }
        })

        console.log(response)

        return response.data
    }
}