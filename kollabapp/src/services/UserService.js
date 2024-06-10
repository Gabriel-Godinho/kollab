import axios from "axios";

export default class UserService {
  constructor() {
    this.axios = axios.create({
      baseURL: process.env.REACT_APP_API_LOGIN + '/api/1.0/users'
    })
  }

  async login(dados) {
    const {data} = await this.axios.post("/login", dados)

    if (data) {
      localStorage.setItem("nome", data.user.nome)
      localStorage.setItem("email", data.user.email)
      localStorage.setItem("token", data.token.token)

      return true
    }

    return false
  }

  async register(dados) {
    return this.axios.post("/singup", dados)
  }

  authenticatedUser () {
    return localStorage.getItem("token") != undefined
  }

  async logout() {
    localStorage.removeItem("token")
    localStorage.removeItem("nome")
    localStorage.removeItem("email")
  }
  
}