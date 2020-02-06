import React from "react";

import { Route } from "react-router-dom";
import styled from "styled-components";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import GamePage from "./components/game/GamePage";

const AppContainer = styled.div`

`;

function App(){
  return ( <div className="App">
    <h1 style={ { color: "yellow", margin: "20px 20px" } }>Adventure
      Game </h1>
    
    <Route exact path="/" component={ Login }/>
    <Route exact path="/register" component={ Register }
    />
    <Route exact path="/game" component={ GamePage }/>
  </div> );
}

export default App;
