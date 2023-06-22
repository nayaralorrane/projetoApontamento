import axios from "axios";
//essa rota é responsável por fazer login, cadastro de usuário, gera token de login, 
export class signService {
    constructor(){}

    singIn(data) {
        let url = 'https://apontamento-api.herokuapp.com/api/sign-in'
        return axios.post(url, data).then(response => response.data)
    }

    singUp(data) {
        let url = 'https://apontamento-api.herokuapp.com/api/sign-up'
        return axios.post(url, data).then(response => response.data)
    }

    validateToken() {
        let url = 'https://apontamento-api.herokuapp.com/api/valid-token'
        return axios.get(url).then(response => response.data)
    }
//O QUE É
    ssoSign(data) {
        let url = 'https://apontamento-api.herokuapp.com/sso/sign-up';
        return axios.post(url, data).then(response => response.data)
    }
}