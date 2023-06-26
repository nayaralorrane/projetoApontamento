import axios from "axios";
import { API_URL } from "../../../env";

export class pointService {
    constructor() {}

    getPoint(params) {
        let url = `${API_URL}/point/get`;
        return axios.get(url, {
            params: params
        }).then(response => response.data)
    }

    postPoint(data) {
        let url = `${API_URL}/point/create`;
        return axios.post(url, data).then(response => response.data)
    }

    putPoint(id, data) {
        let url = `${API_URL}/point/edit/${id}`;
        return axios.put(url, data).then(response => response.data)
    }

    deletePoint(id) {
        let url = `${API_URL}/point/delete/${id}`;
        return axios.delete(url).then(response => response.data)
    }
}