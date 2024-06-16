import React from 'react';
import Sidebar from '../../components/sidebar';
import ProjectCard from '../../components/ProjectCard';
import FormDialog from '../../components/FormDialog';
import { Container, Box, Typography } from '@mui/material';

const Home = () => {
  const username = localStorage.getItem("username")

  return (
    <Container maxWidth="md">
      <Box sx={{ marginBottom: 5, marginTop: 10 }}>
        <Typography variant="h2">
          Bem-vindo(a)
          <Box sx={{ fontWeight: 'bold', display: 'inline', marginLeft: 1 }}>{username}!</Box>
        </Typography>
      </Box>
      <Sidebar/>
      <Typography variant="h4">Seus projetos</Typography>
      <Box sx={{ marginBottom: 4, marginTop: 2 }}>
        <ProjectCard title={"Biologia"} text={"Texto descrição teste"}/>
      </Box>
      <FormDialog/>
    </Container>
  );
}

export default Home;