import axios from "axios";

// TODO - UTILIZAR FUNÇÕES E NÃO UMA CLASSE
export default class UserService {
  constructor() {
    this.axios = axios.create({
      baseURL: process.env.REACT_APP_API_LOGIN + "/api/1.0/users",
    });
  }

  async login(dados) {
    try {
      const { data } = await this.axios.post("/auth/login", dados);

      if (data?.username && data?.email && data?.token) {
        localStorage.setItem("username", data.username);
        localStorage.setItem("email", data.email);
        localStorage.setItem("token", data.token);

        return true;
      }

      return false;
    } catch (error) {
      console.error("Erro ao realizar login:", error);
      return false;
    }
  }

  async register(dados) {
    const { data } = await this.axios.post("/auth/singup", dados);
    return data;
  }

  authenticatedUser() {
    const userToken = localStorage.getItem("token");
    return userToken !== undefined && userToken.length > 0;
  }

  async logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
  }

  async getAllUsers() {
    const { data } = await this.axios.get("/all");
    console.log(data);

    return data;
  }
}
