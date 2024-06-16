import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import Autocomplete from "@mui/material/Autocomplete";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Chip from "@mui/material/Chip";
import ProjectService from "../../services/ProjectService";
import UserService from "../../services/UserService";
import { useNavigate } from "react-router-dom";

const projectService = new ProjectService();
const userService = new UserService();

const FormDialog = () => {
  const navigate = useNavigate();
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState({
    projectName: false,
    projectDescription: false,
  });

  const fetchUsers = async () => {
    try {
      const response = await userService.getAllUsers();

      setUsers(response);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  };

  const handleMembersChange = (event, value) => {
    setSelectedMembers(value); // `value` é um array de objetos usuário
  };

  const handleClickOpen = () => {
    fetchUsers();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const adminUser = localStorage.getItem("email");
    const projectName = formData.get("projectName");
    const projectDescription = formData.get("projectDescription");
    const newErrors = {
      projectName: !projectName,
      projectDescription: !projectDescription,
    };

    setErrors(newErrors);

    if (!projectName || !projectDescription) {
      // Se os campos não forem preenchidos, não prossegue
      return;
    }

    try {
      const projectDetails = {
        projectName: projectName,
        projectDescription: projectDescription,
        adminUser: adminUser,
        members: selectedMembers.map(member => member.email)
      };

      const createdSuccessful = await projectService.createProject(
        projectDetails
      );

      if (createdSuccessful) navigate("/project", { state: projectDetails });

      handleClose();
    } catch (error) {
      alert("Erro ao criar o projeto");
    }
  };

  return (
    <React.Fragment>
      <Tooltip title="Novo projeto">
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleClickOpen}
        >
          Novo Projeto
        </Button>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Novo projeto</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Preencha todos os campos para criar um novo projeto.
          </DialogContentText>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              autoFocus
              required
              margin="dense"
              id="projectName"
              name="projectName"
              label="Nome do projeto"
              type="text"
              fullWidth
              sx={{ marginTop: 3 }}
              error={errors.projectName}
              helperText={
                errors.projectName ? "O Nome do projeto é obrigatório" : ""
              }
            />
            <TextField
              required
              multiline
              margin="dense"
              id="projectDescription"
              name="projectDescription"
              label="Descrição do projeto"
              type="text"
              fullWidth
              sx={{ marginTop: 3 }}
              rows={4}
              error={errors.projectDescription}
              helperText={
                errors.projectDescription
                  ? "A Descrição do projeto é obrigatória"
                  : ""
              }
            />
            <Autocomplete
              multiple
              limitTags={2}
              id="members"
              options={users}
              onChange={handleMembersChange}
              value={selectedMembers} // Vincula o estado do Autocomplete ao estado local
              getOptionLabel={(option) => option.email}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    key={option.email}
                    variant="outlined"
                    label={option.email}
                    size="small"
                    {...getTagProps({ index })}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Participantes"
                  placeholder="Adicionar participantes"
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <>
                        <InputAdornment position="start">
                          <AccountCircleIcon />
                        </InputAdornment>
                        {params.InputProps.startAdornment}
                      </>
                    ),
                  }}
                />
              )}
              sx={{ marginTop: 3, width: "500px" }}
            />
            <DialogActions>
              <Button onClick={handleClose}>Fechar</Button>
              <Button type="submit">Criar</Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default FormDialog;
