import React, { useState } from "react";
import { Container, Form, SubContainerSign } from "./style";
import Input from "../../components/input";
import Button from "../../components/button";
import UserService from "../../services/UserService";
import { NavLink, useNavigate } from "react-router-dom";

const userService = new UserService();

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState([{}])
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true)
      const response = await userService.login(form)

      if (response) navigate("/home")
      
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
