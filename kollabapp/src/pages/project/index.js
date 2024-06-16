import React from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import SpeedDialTooltipOpen from "../../components/SpeedDialTooltipOpen";
import { Container, Box, Typography } from "@mui/material";

const Project = () => {
  const location = useLocation();
  const projectDetails = location.state;

  return (
    <Container maxWidth="md">
      <Box sx={{ marginBottom: 5, marginTop: 10 }}>
        <Typography variant="h2">
          {projectDetails.projectName}
        </Typography>
        <Typography variant="h4">
          {projectDetails.projectDescription}
        </Typography>
      </Box>
      <Sidebar />
      <Typography variant="h4">
        Arquivos
      </Typography>
      <Box sx={{ marginBottom: 4, marginTop: 2 }}></Box>
      <SpeedDialTooltipOpen/>
    </Container>
  );
};

export default Project;