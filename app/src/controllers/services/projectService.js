import axios from 'axios';
import { API_URL } from '../../../env';

export class projectService {
    constructor(){}

    getProject(params) {
        let url = `${API_URL}/project/get`;
        return axios.get(url, {
            params: params
        }).then(response => response.data)
    }

    postProject(data) {
        let url = `${API_URL}/project/create`;
        return axios.post(url, data).then(response => response.data)
    }

    putProject(id, data) {
        let url = `${API_URL}/project/edit/${id}`;
        return axios.put(url, data).then(response => response.data)
    }

    deleteProject(id) {
        let url = `${API_URL}/project/delete/${id}`;
        return axios.delete(url).then(response => response.data)
    }


}