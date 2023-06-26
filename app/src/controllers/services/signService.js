import axios from "axios";
import { API_URL } from "../../../env";

export class signService {
    constructor(){}

    singIn(data) {
        let url = `${API_URL}/api/sign-in`;
        return axios.post(url, data).then(response => response.data)
    }

    singUp(data) {
        let url = `${API_URL}/api/sign-up`;
        return axios.post(url, data).then(response => response.data)
    }

    validateToken() {
        let url = `${API_URL}/api/valid-token`;
        return axios.get(url).then(response => response.data)
    }

    ssoSign(data) {
        let url = `${API_URL}/sso/sign-up`;
        return axios.post(url, data).then(response => response.data)
    }
}