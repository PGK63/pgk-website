import axios from "axios";
import AuthService from "../auth/AuthService";

export default class HeadmanService {

    static async createRaportichka() {
        const response = await axios.post(`https://api.cfif31.ru/pgk63/api/Headman/Raportichka`, null, {
            headers: {
                "Authorization": "Bearer " + await AuthService.getToken()
            }
        })

        return response.data
    }

    static async registration(studentId) {

        const data = JSON.stringify({
            studentId: Number(studentId)
        })

        const response = await axios.post("https://api.cfif31.ru/pgk63/api/Headman/Registration", data, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + await AuthService.getToken()
            }
        })

        return response.data
    }

    static async registrationDeputy(studentId) {

        const data = JSON.stringify({
            studentId: Number(studentId)
        })

        const response = await axios.post("https://api.cfif31.ru/pgk63/api/Headman/Deputy/Registration", data, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + await AuthService.getToken()
            }
        })

        return response.data
    }
}