import axios from "axios"
import { API_URL } from "../../../env"

export class userService {
    constructor() {}

    getUser() {        
        let url = `${API_URL}/user/get`;
        return axios.get(url, { 
            Accept: 'application/json',
        }).then(response => response.data)
    }

    editUser(data) {
        let url = `${API_URL}/user/edit`;
        return axios.put(url, data).then(response => response.data)
    }
}