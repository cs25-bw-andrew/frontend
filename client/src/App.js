import React from "react";
import "./App.css";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import GamePage from "./components/game/GamePage";
import { Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <h1>Adventure Game </h1>

      <Route exact path="/" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/game" component={GamePage} />
    </div>
  );
}

export default App;
