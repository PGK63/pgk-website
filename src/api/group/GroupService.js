import axios from "axios";
import AuthService from "../auth/AuthService";
import BaseConstants from "../../utils/BaseConstants";

export default class GroupService {
    static async getAll(pageNumber = 1, pageSize = BaseConstants.PAGE_SIZE) {
        const response = await axios.get("https://api.cfif31.ru/pgk63/api/Group", {
            params: {
                "pageSize": pageSize,
                "pageNumber": pageNumber
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

    static getName(group) {
        return group.speciality.nameAbbreviation + "-" + group.course + group.number
    }
}