import React, { useState } from 'react';
import Sidebar from '../../components/sidebar';
import ProjectCard from '../../components/ProjectCard';
import FormDialog from '../../components/FormDialog';
import { Container, Box, Typography } from '@mui/material';
import ProjectService from '../../services/ProjectService';

const projectService = new ProjectService;

const Home = () => {
  const username = localStorage.getItem("username")
  const [projectsList, setProjectsList ] = useState([])

  const fetchProjects = async () => {
    try {
      const response = await projectService.getUserProjects()
      setProjectsList(response);
    } catch (error) {
      console.error("Erro ao buscar projetos:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <Container maxWidth="md">
      <Box sx={{ marginBottom: 5, marginTop: 10 }}>
        <Typography variant="h2">
          Bem-vindo(a)
          <Box sx={{ fontWeight: 'bold', display: 'inline', marginLeft: 1 }}>{username}!</Box>
        </Typography>
      </Box>
      <Sidebar/>
      <Typography variant="h4">Seus projetos ({projectsList.length})</Typography>
      <Box sx={{ marginBottom: 4, marginTop: 2 }}>
        {projectsList.map((project) => (
          <ProjectCard key={project.id} title={project.projectName} text={project.projectDescription}/>
        ))}
      </Box>
      <FormDialog/>
    </Container>
  );
}

export default Home;