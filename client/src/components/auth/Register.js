import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";

function Register( props ){
  const [ errorMessage, setErrorMessage ] = useState( "" );
  const [ form, setForm ] = useState( {
    username: "", password1: "", password2: ""
  } );
  const changeHandler = e => {
    setForm( { ...form, [ e.target.name ]: e.target.value } );
  };
  const submitForm = e => {
    debugger;
    e.preventDefault();
    axios
      .post( `http://127.0.0.1:8000/api/registration/`, form )
      .then( res => {
        debugger;
        console.log( res.data );
        localStorage.setItem( "token", res.data.key );
        
        props.history.push( "/game" );
        setForm( { username: "", password1: "", password2: "" } );
      } )
      .catch( err => {
        console.log( err );
      } );
    
    setErrorMessage( "" );
  };
  return ( <>
    <RegisterContainer>
      <FormContainer onSubmit={ submitForm }>
        <Label>username:</Label>
        <Input
          type="text"
          name="username"
          value={ form.username }
          onChange={ changeHandler }
        />
        
        <Label>password: </Label>
        <Input
          type="password"
          name="password1"
          value={ form.password1 }
          onChange={ changeHandler }
        />
        
        <Label>confirm password:</Label>
        <Input
          type="password"
          name="password2"
          value={ form.password2 }
          onChange={ changeHandler }
        />
        
        <Button type="submit">Register</Button>
      </FormContainer>
    </RegisterContainer>
    <div style={ { textAlign: "center", margin: "0 auto 50px auto" } }>
      Have an account? <Link to="./">Login</Link>
    </div>
  </> );
}

export default Register;

const RegisterContainer = styled.div`
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
  font-family: "Press Start 2P", cursive;
  padding: 10px 20px;
  border: 3px solid #202020;
  font-size: 1.5rem;
  cursor: pointer;
  &:hover {
    color: #8b0000;
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