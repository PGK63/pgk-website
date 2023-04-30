import axios from "axios";
import AuthService from "../auth/AuthService";
import BaseConstants from "../../utils/BaseConstants";

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

    static async getTelegramToken() {
        try {
            const response = await axios.get("https://api.cfif31.ru/pgk63/api/User/Telegram/Token", {
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

    static async updateEmail(email) {
        return (await axios.patch("https://api.cfif31.ru/pgk63/api/User/Email", null, {
            params: {
                newEmail: email
            },
            headers: {
                "Authorization": "Bearer " + await AuthService.getToken()
            }
        })).data
    }

    static async sendEmailVerification() {
        return (await axios.post("https://api.cfif31.ru/pgk63/api/User/Email/Verification", null, {
            headers: {
                "Authorization": "Bearer " + await AuthService.getToken()
            }
        }))
    }

    static async getHistory(
        page
    ) {
        const response = await axios.get("https://api.cfif31.ru/pgk63/api/User/History", {
            params: {
                pageNumber: page,
                pageSize: BaseConstants.PAGE_SIZE
            },
            headers: {
                "Authorization": "Bearer " + await AuthService.getToken()
            }
        })

        return response.data
    }

    static async postHistoryItem(
        contentId,
        title,
        description,
        type
    ) {

        const data = JSON.stringify({
            contentId: Number(contentId),
            title: title,
            description: description,
            type: type
        })

        return await axios.post("https://api.cfif31.ru/pgk63/api/User/History", data, {
            headers: {
                "Authorization": "Bearer " + await AuthService.getToken(),
                'content-type': 'application/json'
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