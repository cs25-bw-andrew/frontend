import React, { useState } from "react";
import axios from 'axios'
import { Link } from "react-router-dom";

function Register() {
    const[errorMessage,setErrorMessage]=useState('')
  const [form, setForm] = useState({
    username: "",
    password1: "",
    password2: ""
  });
  const changeHandler = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const submitForm = e => {
    e.preventDefault();
    axios
      .post(`https://cs-adv.herokuapp.com/api/registration/`, form)
      .then(res => {
        console.log(res.data);
        localStorage.setItem("token", res.data.key);
      })
      .catch(err => {
        //   if (err.response.data.password1[0]) {
        //       setErrorMessage(err.response.data.password1[0]);
        //   } else if (err.response.data.password2[0]) {
        //       setErrorMessage(err.response.data.password2[0]);
        //     } else if (err.response.data.username[0]) {
        //       setErrorMessage(err.response.data.username[0]);
        //     } else if (err.response.data.non_field_errors[0]) {
        //       setErrorMessage(err.response.data.non_field_errors[0]);
        //     }
        console.log(err.response.data);
      });
      setForm({ username: "", password1: "", password2: "" });
      setErrorMessage("")
  };
  return (
    <div className="Register">
      <form onSubmit={submitForm}>
        <label>
          username:
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={changeHandler}
          />
        </label>
        <label>
          password:
          <input
            type="password"
            name="password1"
            value={form.password1}
            onChange={changeHandler}
          />
        </label>
        <label>
          confirm password:
          <input
            type="password"
            name="password2"
            value={form.password2}
            onChange={changeHandler}
          />
        </label>
        <button type="submit">Register</button>
      </form>
      <div>{errorMessage}</div>
      <div>
        Have an account? <Link to="./">Login</Link>
      </div>
    </div>
  );
}

export default Register;
