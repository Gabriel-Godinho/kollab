import axios from "axios";

// TODO - UTILIZAR FUNÇÕES E NÃO UMA CLASSE
export default class ProjectService {
  constructor(loggedUser) {
    this.loggedUser = loggedUser;

    this.axios = axios.create({
      baseURL: process.env.REACT_APP_API_LOGIN + "/api/1.0/project",
    });
  }

  async getUserProjects() {
    const { data } = await this.axios.get(`/${this.loggedUser}`);

    return data;
  }

  async getProjectsWhereUserIsMember() {
    const { data } = await this.axios.get(`/member/${this.loggedUser}`);

    return data;
  }

  async createProject(newProject) {
    const { data } = await this.axios.post("/create", newProject);

    return data;
  }
}
