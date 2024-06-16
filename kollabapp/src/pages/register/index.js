import React, { useState } from "react";
import UserService from "../../services/UserService";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { NavLink, useNavigate } from "react-router-dom";

const userService = new UserService();
const defaultTheme = createTheme();

const Register = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    username: false,
    email: false,
    userPassword: false,
    confirmPassword: false,
    passwordMismatch: false,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const username = formData.get("username");
    const email = formData.get("email");
    const userPassword = formData.get("userPassword");
    const confirmPassword = formData.get("confirmPassword");

    const newErrors = {
      username: !username,
      email: !email,
      userPassword: !userPassword,
      confirmPassword: !confirmPassword,
      passwordMismatch: userPassword !== confirmPassword,
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      // Se houver erros, não prossegue
      return;
    }

    try {
      const payload = {
        username,
        email,
        userPassword,
      };
      const data = await userService.register(payload);
      console.log(data);

      if (data) {
        await userService.login(payload);
        navigate("/home");
      }
    } catch (error) {
      alert("Erro ao criar nova conta");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="Nome de usuário"
                  autoFocus
                  error={errors.username}
                  helperText={errors.username ? "Campo obrigatório" : ""}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="E-mail"
                  name="email"
                  autoComplete="email"
                  error={errors.email}
                  helperText={errors.email ? "Campo obrigatório" : ""}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="userPassword"
                  label="Senha"
                  type="password"
                  id="userPassword"
                  autoComplete="new-password"
                  error={errors.userPassword || errors.passwordMismatch}
                  helperText={errors.userPassword ? "Campo obrigatório" : ""}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirme sua senha"
                  type="password"
                  id="confirmPassword"
                  autoComplete="new-password"
                  error={errors.confirmPassword || errors.passwordMismatch}
                  helperText={
                    errors.confirmPassword
                      ? "Campo obrigatório"
                      : errors.passwordMismatch
                      ? "As senhas não batem"
                      : ""
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="Desejo receber atualizações via e-mail."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Criar conta
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <NavLink
                  to="/login"
                  style={{
                    fontSize: 14,
                  }}
                >
                  Já tem uma conta? Faça login!
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Register;