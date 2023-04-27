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
}