import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Divider,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Paper,
  Avatar,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CommentIcon from "@mui/icons-material/Comment";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import Sidebar from "../../components/Sidebar";
import { useDropzone } from "react-dropzone";
import SpeedDialTooltipOpen from "../../components/SpeedDialTooltipOpen";

const Project = () => {
  const location = useLocation();
  const projectDetails = location.state;
  const [newComment, setNewComment] = useState("");
  const [commentsList, setCommentsList] = useState([]);
  const [files, setFiles] = useState([]);

  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      setCommentsList([
        ...commentsList,
        {
          id: commentsList.length + 1,
          user: "Você",
          text: newComment,
          avatar: "../../assets/avatar.png",
        },
      ]);
      setNewComment("");
    }
  };

  const onDrop = (acceptedFiles) => {
    setFiles((prevFiles) => [
      ...prevFiles,
      ...acceptedFiles.map((file, index) => ({
        id: prevFiles.length + index + 1,
        name: file.name,
        size: file.size,
      })),
    ]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

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
        <Box sx={{ mb: 5, mt: 5 }}>
          <Typography variant="h2">
            <span style={{ fontWeight: "bold" }}>
              {projectDetails.projectName}
            </span>
          </Typography>
          <Typography variant="h4">
            {projectDetails.projectDescription}
          </Typography>
        </Box>
        <Divider />
        <Box sx={{ mb: 4, mt: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <InsertDriveFileIcon fontSize="large" sx={{ mr: 1 }} />
            <Typography variant="h4">Arquivos e documentos</Typography>
          </Box>
          <Paper sx={{ p: 3, mt: 2 }}>
            <Box
              {...getRootProps()}
              sx={{
                border: "2px dashed #ccc",
                padding: 3,
                textAlign: "center",
                cursor: "pointer",
                backgroundColor: isDragActive ? "#f0f0f0" : "#fafafa",
              }}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <Typography>Solte os arquivos aqui...</Typography>
              ) : (
                <Typography>
                  Arraste e solte alguns arquivos aqui ou clique para selecionar
                  arquivos
                </Typography>
              )}
            </Box>
            <List sx={{ mt: 3 }}>
              {files.map((file) => (
                <ListItem key={file.id}>
                  <ListItemText
                    primary={file.name}
                    secondary={`${(file.size / 1024).toFixed(2)} KB`}
                  />
                </ListItem>
              ))}
              {files.length === 0 && (
                <Typography variant="body2" sx={{ mt: 2 }}>
                  Nenhum arquivo carregado ainda.
                </Typography>
              )}
            </List>
          </Paper>
        </Box>
        <Divider />
        <Box sx={{ mb: 4, mt: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <CommentIcon fontSize="large" sx={{ mr: 1 }} />
            <Typography variant="h4">Comentários</Typography>
          </Box>
          {/* Área de Comentários */}
          <Paper sx={{ p: 3, mt: 2 }}>
            <TextField
              label="Adicionar comentário"
              variant="outlined"
              multiline
              rows={3}
              fullWidth
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              startIcon={<SendIcon />}
              onClick={handleAddComment}
            >
              Enviar
            </Button>
            <List sx={{ mt: 3 }}>
              {commentsList.map((comment) => (
                <ListItem key={comment.id} alignItems="flex-start">
                  <Avatar
                    src={comment.avatar}
                    alt={comment.user}
                    sx={{ mr: 2 }}
                  />
                  <ListItemText
                    primary={
                      <Typography variant="subtitle2">
                        {comment.user}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body2">{comment.text}</Typography>
                    }
                  />
                </ListItem>
              ))}
              {commentsList.length === 0 && (
                <Typography variant="body2" sx={{ mt: 2 }}>
                  Nenhum comentário ainda.
                </Typography>
              )}
            </List>
          </Paper>
        </Box>
        <SpeedDialTooltipOpen />
      </Container>
    </Box>
  );
};

export default Project;
