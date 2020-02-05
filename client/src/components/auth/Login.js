import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";


function Login(props) {
  const [form, setForm] = useState({
    username: "",
    password: ""
  });
  const changeHandler = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
    const submitForm = e => {
      e.preventDefault();
      axios
        .post(`https://cs-adv.herokuapp.com/api/login/`, form)
        .then(res => {
          console.log(res.data);
          localStorage.setItem("token", res.data.key);
          props.history.push("/game");
        })
        .catch(err => {
          console.log(err.response.data);
        });

      setForm({ username: "", password: "" });
    };
  return (
    <>
      <LoginContainer>
        <FormContainer onSubmit={submitForm}>
          <Label>username:</Label>
          <Input
            type="text"
            name="username"
            value={form.username}
            onChange={changeHandler}
          />

          <Label>password:</Label>

          <Input
            type="password"
            name="password"
            value={form.password}
            onChange={changeHandler}
          />

          <Button type="submit">Login</Button>
        </FormContainer>
      </LoginContainer>
      <div style={{ textAlign: "center", margin: "0 auto 50px auto" }}>
        need to <Link to="./register">register</Link>?
      </div>
    </>
  );
}

export default Login;


const LoginContainer = styled.div`
  margin: 10vh auto 30px auto;
  width: 40%;
  border: 5px solid black;
  padding: 30px;
`;
const FormContainer = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const Button = styled.button`
  margin: 40px auto;

  padding: 10px 20px;
  border: 3px solid #202020;
  font-size: 1.5rem;
  font-family: "Press Start 2P", cursive;
  cursor: pointer;
  &:hover {
    color: yellow;
  }
`;
const Input = styled.input`
  font-size: 1.5rem;
  margin: 20px 10px;
  font-family: "Press Start 2P", cursive;
`;
const Label = styled.label`
  font-size: 1.5rem;
  margin: 10px atuo 5px 10px;
`;