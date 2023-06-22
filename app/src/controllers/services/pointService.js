import axios from "axios";
//requisições que são feitas p/ back p/ apontamento
export class pointService {
    constructor() {}

    getPoint(params) {
        let url = 'https://apontamento-api.herokuapp.com/point/get'
        return axios.get(url, {
            params: params
        }).then(response => response.data)
    }

    postPoint(data) {
        let url = 'https://apontamento-api.herokuapp.com/point/create'
        return axios.post(url, data).then(response => response.data)
    }

    putPoint(id, data) {
        let url = `https://apontamento-api.herokuapp.com/point/edit/${id}`
        return axios.put(url, data).then(response => response.data)
    }

    deletePoint(id) {
        let url = `https://apontamento-api.herokuapp.com/point/delete/${id}`
        return axios.delete(url).then(response => response.data)
    }
}