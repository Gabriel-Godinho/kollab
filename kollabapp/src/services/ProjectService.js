import axios from "axios";

export default class ProjectService {
  constructor() {
    this.axios = axios.create({
      baseURL: process.env.REACT_APP_API_LOGIN + '/api/1.0/project'
    })
  }

  async getUserProjects() {
    const loggedUser = localStorage.getItem("email")
    const { data } = await this.axios.get(`/${loggedUser}`);

    return data;
  }

  async createProject(newProject) {
    const { data } = await this.axios.post("/create", newProject);
    
    return data;
  }
}