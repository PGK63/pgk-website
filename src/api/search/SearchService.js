import axios from "axios";
import AuthService from "../auth/AuthService";
import BaseConstants from "../../utils/BaseConstants";

export default class SearchService{
    static async getSearchAll(search, pageNumber = 1, pageSize = BaseConstants.PAGE_SIZE) {
        const response = await axios.get("https://api.cfif31.ru/pgk63/api/Search", {
            params: {
                "pageSize": pageSize,
                "pageNumber": pageNumber,
                "search": search,
                "type": 'ALL'
            },
            headers: {
                "Authorization": "Bearer " + await AuthService.getToken()
            }
        })
        return response.data
    }
}
