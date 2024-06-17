import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import ProjectCard from "../../components/ProjectCard";
import FormDialog from "../../components/FormDialog";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import GroupIcon from "@mui/icons-material/Group";
import EngineeringIcon from "@mui/icons-material/Engineering";
import { Container, Box, Typography } from "@mui/material";
import ProjectService from "../../services/ProjectService";

const loggedUser = localStorage.getItem("email");
const projectService = new ProjectService(loggedUser);

const Home = () => {
  const username = localStorage.getItem("username");
  const [projectsList, setProjectsList] = useState([]);
  const [memberProjectsList, setMemberProjectsList] = useState([]);

  const fetchProjects = async () => {
    try {
      const userProjects = await projectService.getUserProjects();
      setProjectsList(userProjects);

      const projectsWhereUserIsMemberList =
        await projectService.getProjectsWhereUserIsMember();
      setMemberProjectsList(projectsWhereUserIsMemberList);
    } catch (error) {
      console.error("Erro ao buscar projetos:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Container
        maxWidth="lg"
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 5,
          pt: 10,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h3"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            Bem-vindo(a),{" "}
            <span style={{ fontWeight: "bold" }}>{username}!</span> 😃
          </Typography>
          <FormDialog />
        </Box>
        <Box sx={{ mt: 4, display: "flex", alignItems: "center" }}>
          <EngineeringIcon fontSize="large" sx={{ mr: 1 }} />
          <Typography variant="h4">
            Seus projetos ({projectsList.length})
          </Typography>
        </Box>
        {projectsList.length > 0 ? (
          <Grid container spacing={3}>
            {projectsList.map((project) => (
              <Grid item key={project.id} xs={12} sm={6} md={4}>
                <ProjectCard projectDetails={project} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Paper
            elevation={3}
            sx={{
              mb: 3,
              padding: 3,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 100,
            }}
          >
            <Typography variant="h6">Sem projetos</Typography>
          </Paper>
        )}
        <Divider />
        <Box sx={{ mt: 4, display: "flex", alignItems: "center" }}>
          <GroupIcon fontSize="large" sx={{ mr: 1 }} />
          <Typography variant="h4">
            Projetos em que você é membro ({projectsList.length})
          </Typography>
        </Box>
        {memberProjectsList.length > 0 ? (
          <Grid container spacing={3}>
            {memberProjectsList.map((project) => (
              <Grid item key={project.id} xs={12} sm={6} md={4}>
                <ProjectCard projectDetails={project} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Paper
            elevation={3}
            sx={{
              mb: 3,
              padding: 3,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 100,
            }}
          >
            <Typography variant="h6">Sem projetos</Typography>
          </Paper>
        )}
      </Container>
    </Box>
  );
};

export default Home;
