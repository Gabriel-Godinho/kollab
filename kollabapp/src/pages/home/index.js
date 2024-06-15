import React from 'react';
import Sidebar from '../../components/sidebar';
import ProjectCard from '../../components/ProjectCard';
import AddIcon from '@mui/icons-material/Add';
import { Container, Box, Typography, Fab } from '@mui/material';

const Home = () => {
  const username = localStorage.getItem("username")

  return (
    <Container maxWidth="md">
      <Box sx={{ marginBottom: 4, marginTop: 10, marginLeft: 1 }}>
        <Typography variant="h2">
          Bem-vindo(a)
          <Box sx={{ fontWeight: 'bold', display: 'inline', marginLeft: 1 }}>{username}!</Box>
        </Typography>
      </Box>
      <Sidebar/>
      <Box sx={{ marginBottom: 4, marginTop: 10, marginLeft: 1 }}>
        <ProjectCard title={"Biologia"} text={"TExto descrição texte"}/>
      </Box>
      <Fab color="primary" aria-label="add">
        <AddIcon />
      </Fab>
    </Container>
  );
}

export default Home;