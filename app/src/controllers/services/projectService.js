import axios from 'axios';
//rota responsável por fazer listagem,cadatsro... dos projetos da empresa
export class projectService {
    constructor(){}

    getProject(params) {
        let url = 'https://apontamento-api.herokuapp.com/project/get'
        return axios.get(url, {
            params: params
        }).then(response => response.data)
    }

    postProject(data) {
        let url = 'https://apontamento-api.herokuapp.com/project/create'
        return axios.post(url, data).then(response => response.data)
    }

    putProject(id, data) {
        let url = `https://apontamento-api.herokuapp.com/project/edit/${id}`
        return axios.put(url, data).then(response => response.data)
    }

    deleteProject(id) {
        let url = `https://apontamento-api.herokuapp.com/project/delete/${id}`
        return axios.delete(url).then(response => response.data)
    }


}