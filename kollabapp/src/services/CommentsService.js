import axios from "axios";

// TODO - UTILIZAR FUNÇÕES E NÃO UMA CLASSE
export default class CommentsService {
  constructor() {
    this.axios = axios.create({
      baseURL: process.env.REACT_APP_API_LOGIN + "/api/1.0/comments",
    });
  }

  async saveComment(newComment) {
    this.axios.post("/save", newComment);
  }

  async getAllCommentsFromProject(projectId) {
    const { data } = this.axios.get(`/all/${projectId}`);

    return data;
  }
}