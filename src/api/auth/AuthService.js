import axios from "axios";
import UserService from "../user/UserService";

export default class AuthService {

    static async auth(firstName, lastName, password) {
        const response =  await axios.post("https://api.cfif31.ru/pgk63/api/Auth/SignIn", {
            "firstName": firstName,
            "lastName": lastName,
            "password": password
        })

        return response
    }

    static async refreshToken(refreshToken) {
        const response = await axios.post("https://api.cfif31.ru/pgk63/api/Auth/Refresh", {}, {
            headers: {
                "refreshToken": refreshToken
            }
        })

        return response.data
    }

    static async getToken() {
        const response = UserService.getLocalUser()
        return (await AuthService.refreshToken(response.refreshToken)).accessToken
    }
}