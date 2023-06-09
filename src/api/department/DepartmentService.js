import axios from "axios";
import AuthService from "../auth/AuthService";
import BaseConstants from "../../utils/BaseConstants";

export default class DepartmentService {

    static async getAll(
        pageNumber = 1,
        pageSize = BaseConstants.PAGE_SIZE,
        search = null
    ) {
        const response = await axios.get("https://api.cfif31.ru/pgk63/api/Department", {
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

    static async create(name, departmentHeadId) {
        const data = JSON.stringify({
            name: name,
            departmentHeadId: Number(departmentHeadId),
        })

        const response = await axios.post(`https://api.cfif31.ru/pgk63/api/Department`, data, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + await AuthService.getToken()
            }
        })

        return response.data
    }
}