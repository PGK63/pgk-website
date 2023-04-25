import axios from "axios";
import AuthService from "../auth/AuthService";

export default class EducationalSectorService {

    static async registration(firstName, lastName, middleName) {

        const data = JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            middleName: middleName
        })

        const response = await axios.post("https://api.cfif31.ru/pgk63/api/EducationalSector/Registration", data, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + await AuthService.getToken()
            }
        })

        return response.data
    }
}