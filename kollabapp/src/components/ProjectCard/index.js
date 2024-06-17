import * as React from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import BackgroundImage from "../../assets/Artboard-1.jpg";

const ProjectCard = ({ projectDetails }) => {
  const navigate = useNavigate();

  const handleEnterProject = () => {
    navigate("/project", { state: projectDetails });
  };

  return (
    <Card sx={{ maxWidth: 345, boxShadow: 3 }}>
      <CardMedia
        component="img"
        sx={{ height: 200 }}
        image={BackgroundImage}
        title={`Projeto: ${projectDetails.projectName}`}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {projectDetails.projectName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {projectDetails.projectDescription}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color="success"
          onClick={handleEnterProject}
        >
          Entrar
        </Button>
        <Button variant="contained" color="error">
          Encerrar projeto
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProjectCard;
