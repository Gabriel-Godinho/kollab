import React, { useState } from "react";
import Input from "../../components/input";
import Button from "../../components/button";
import UserService from "../../services/UserService";
import { Container, Form, SubContainerSign } from "./style";
import { NavLink, useNavigate } from "react-router-dom";

const userService = new UserService();

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState([{ email: "", password: "" }])
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // TODO - AJUSTAR OBJETO PARA FICAR IGUAL AO BACKEND
      const { data } = await userService.login(form)

      setLoading(true)

      if (data) navigate("/home")
      
      setLoading(false)
    } catch (error) {
      alert("Erro")
    }

    alert("Login!")
  }

  const handleChange = (event) => {
    setForm({...form, [event.target.name]: [event.target.value]});
  }

  return (
    <Container>
      <Form>
      <h1>Login</h1>
        <Input
          name="email"
          placeholder="Digite seu e-mail"
          onChange={handleChange}
          type="email"
        />
        <Input
          name="password"
          placeholder="Digite sua senha"
          onChange={handleChange}
          type="password"
        />
        <Button 
          type="submit"
          text="Entrar"
          onClick={handleSubmit}
          disabled={loading}
        />
        <SubContainerSign>
          <p>Não possui conta? <NavLink to="/cadastro">Crie uma!</NavLink></p>
        </SubContainerSign>
      </Form>
    </Container>
  );
};

export default Login;
