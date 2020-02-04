import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
      .post(`https://cs-adv.herokuapp.com/api/login/`,form)
      .then(res => {
        console.log(res.data);
        localStorage.setItem("token", res.data.key)
        props.history.push("/game");
      })
      .catch(err => {
        console.log(err.response.data);
      });

    setForm({ username: "", password: "" });
  };
  return (
    <div className="Login">
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
            name="password"
            value={form.password}
            onChange={changeHandler}
          />
        </label>
        <button type="submit">Login</button>
      </form>
      <div>need to <Link to="./register">register</Link>?</div>
    </div>
  );
}

export default Login;
