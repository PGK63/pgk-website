import axios from "axios";
import AuthService from "../auth/AuthService";

export default class UserService {

    static async get() {
        try {
            const response = await axios.get("https://api.cfif31.ru/pgk63/api/User", {
                headers: {
                    "Authorization": "Bearer " + await AuthService.getToken()
                }
            })

            return response.data
        }catch (e){
            console.log(e)
        }
    }

    static async updatePhoto(photo) {

        const formData = new FormData();
        formData.append('photo',photo)

        return await axios.post("https://api.cfif31.ru/pgk63/api/User/Photo", formData, {
            headers: {
                "Authorization": "Bearer " + await AuthService.getToken(),
                'content-type': 'multipart/form-data'
            }
        })
    }

    static async sendEmailPasswordReset(email) {

        const formData = new FormData();

        return await axios.post(
            "https://api.cfif31.ru/pgk63/api/User/Email/Pasword/Reset",
            formData,
            {
                params: {
                    "email": email
                },
                headers: {
                    "Authorization": "Bearer " + await AuthService.getToken(),
                    'content-type': 'multipart/form-data'
                }
            })
    }

    static getLocalUser() {
        return JSON.parse(localStorage.getItem("user"))
    }

    static getFIOShort(user) {
        try {
            const middleName = user.middleName

            if(middleName === null){
                return user.lastName + " " + user.firstName[0] + "."
            }else {
                return user.lastName + " " + user.firstName[0] + "." + middleName[0] + "."
            }
        }catch (e){
            console.log(e)
        }
    }
    static getFIOFull(user) {
        try {
            const middleName = user.middleName

            if(middleName === null){
                return user.lastName + " " + user.firstName
            }else {
                return user.lastName + " " + user.firstName + " " + middleName
            }
        }catch (e){
            console.log(e)
        }
    }
}