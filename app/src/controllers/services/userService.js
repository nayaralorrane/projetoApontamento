import axios from "axios"
//rota responsável por listar os usuários e fazer edição deles
export class userService {
    constructor() {}

    getUser() {
        let url = 'https://apontamento-api.herokuapp.com/user/get'
        return axios.get(url, { 
            Accept: 'application/json',
        }).then(response => response.data)
    }

    editUser(data) {
        let url = 'https://apontamento-api.herokuapp.com/user/edit'
        return axios.put(url, data).then(response => response.data)
    }
}