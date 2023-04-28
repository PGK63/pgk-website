import axios from "axios";
import AuthService from "../auth/AuthService";
import BaseConstants from "../../utils/BaseConstants";

export default class SpecialityService {

    static async getAll(
        pageNumber = 1,
        pageSize = BaseConstants.PAGE_SIZE,
        search = null,
        departmentIds = null
    ) {
        const response = await axios.get("https://api.cfif31.ru/pgk63/api/Speciality", {
            params: {
                "pageSize": pageSize,
                "pageNumber": pageNumber,
                "search": search,
                "departmentIds": departmentIds
            },
            headers: {
                "Authorization": "Bearer " + await AuthService.getToken()
            }
        })
        return response.data
    }

    static async create(number, name, nameAbbreviation, qualification, departmentId){
        const data = JSON.stringify({
            number: number,
            name: name,
            nameAbbreviation: nameAbbreviation,
            qualification: qualification,
            departmentId: Number(departmentId),
        })

        const response = await axios.post(`https://api.cfif31.ru/pgk63/api/Speciality`, data, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + await AuthService.getToken()
            }
        })

        return response.data
    }
}