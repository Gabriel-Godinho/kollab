import React, { useState } from "react";
import { Container, Form, SubContainerSign } from "./style";
import Input from "../../components/input";
import Button from "../../components/button";
import UserService from "../../services/UserService";
import { NavLink, useNavigate } from "react-router-dom";

const userService = new UserService();

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState([{ username: "", email: "", password: "", confirmPassword: "" }])
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true)

      if (form.password === form.confirmPassword) {
        const { data } = await userService.register(form)

        if (data) {
          const responseLogin = await userService.login(form)
          if (responseLogin) navigate("/home")
        }
      } else {
        alert("As senhas não batem! Verifique-as e tente novamente.")
      }
      
      setLoading(false)
    } catch (error) {
      alert("Erro ao criar nova conta")
    }
  }

  const handleChange = (event) => {
    setForm({...form, [event.target.name]: [event.target.value]});
  }

  return (
    <Container>
      <Form>
      <h1>Crie a sua conta</h1>
        <Input
          name="username"
          placeholder="Digite o seu nome de usuário"
          onChange={handleChange}
          type="email"
        />
        <Input
          name="email"
          placeholder="Digite o seu e-mail"
          onChange={handleChange}
          type="email"
        />
        <Input
          name="password"
          placeholder="Digite a sua senha"
          onChange={handleChange}
          type="password"
        />
        <Input
          name="confirmPassword"
          placeholder="Confirme a sua senha"
          onChange={handleChange}
          type="password"
        />
        <Button 
          type="submit"
          text="Criar conta"
          onClick={handleSubmit}
          disabled={loading}
        />
        <SubContainerSign>
          <p>Já possui conta? <NavLink to="/login">Entre!</NavLink></p>
        </SubContainerSign>
      </Form>
    </Container>
  );
};

export default Register;
