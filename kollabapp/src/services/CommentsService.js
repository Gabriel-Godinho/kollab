import axios from "axios";

// TODO - UTILIZAR FUNÇÕES E NÃO UMA CLASSE
export default class CommentsService {
  constructor() {
    this.axios = axios.create({
      baseURL: process.env.REACT_APP_API_LOGIN + "/api/1.0/comment",
    });
  }

  async saveComment(newComment) {
    const { data } = await this.axios.post("/save", newComment);
    return data;
  }

  async getAllCommentsFromProject(projectId) {
    const userEmail = localStorage.getItem("email");
    const { data } = await this.axios.get(`/all/${projectId}/${userEmail}`);

    return data;
  }
}