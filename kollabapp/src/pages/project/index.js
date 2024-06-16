import React, { useState } from "react";
import Sidebar from "../../components/sidebar";
import FormDialog from "../../components/FormDialog";
import { Container, Box, Typography } from "@mui/material";
import ProjectService from "../../services/ProjectService";

const projectService = new ProjectService();

const Project = () => {
  const username = localStorage.getItem("username");
  const [projectsList, setProjectsList] = useState([]);

  const fetchProjects = async () => {
    try {
      const response = await projectService.getUserProjects();
      setProjectsList(response);
    } catch (error) {
      console.error("Erro ao buscar projetos:", error);
    }
  };

  fetchProjects();

  return (
    <Container maxWidth="md">
      <Box sx={{ marginBottom: 5, marginTop: 10 }}>
        <Typography variant="h2">
          Bem-vindo(a)
          <Box sx={{ fontWeight: "bold", display: "inline", marginLeft: 1 }}>
            {username}!
          </Box>
        </Typography>
      </Box>
      <Sidebar />
      <Typography variant="h4">
        Seus projetos ({projectsList.length})
      </Typography>
      <Box sx={{ marginBottom: 4, marginTop: 2 }}></Box>
      <FormDialog />
    </Container>
  );
};

export default Project;