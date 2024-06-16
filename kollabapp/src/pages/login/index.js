import React, { useState } from "react";
import UserService from "../../services/UserService";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { NavLink, useNavigate } from "react-router-dom";

const userService = new UserService();
const defaultTheme = createTheme();

const Login = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({ email: false, userPassword: false });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const userPassword = formData.get("userPassword");

    const newErrors = {
      email: !email,
      userPassword: !userPassword,
    };

    setErrors(newErrors);

    if (!email || !userPassword) {
      // Se os campos não forem preenchidos, não prossegue
      return;
    }

    try {
      const payload = {
        email,
        userPassword,
      };
      const loginSuccessful = await userService.login(payload);
      console.log(loginSuccessful);

      if (loginSuccessful) navigate("/home");
    } catch (error) {
      alert("Erro");
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
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="E-mail"
              name="email"
              autoComplete="email"
              autoFocus
              error={errors.email}
              helperText={errors.email ? "Campo obrigatório" : ""}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="userPassword"
              label="Senha"
              type="password"
              id="userPassword"
              autoComplete="current-password"
              error={errors.userPassword}
              helperText={errors.userPassword ? "Campo obrigatório" : ""}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Esqueceu a senha?
                </Link>
              </Grid>
              <Grid item>
                <NavLink
                  to="/register"
                  style={{
                    fontSize: 13.5,
                  }}
                >
                  {"Não tem uma conta? Crie uma"}
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;