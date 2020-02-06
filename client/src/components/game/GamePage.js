import React, { useState, useEffect } from "react";
import axios from "axios";
import World from "./World";
import styled from "styled-components";

function GamePage(props) {
  const [mapList, setMapList] = useState([]);
  //const [player,setPlayer] = useState([])
  const handleLogout = () => {
    localStorage.removeItem("token");
    props.history.push("./")
  };
  useEffect( () => {
    axios
      .get(`https://cs-adv.herokuapp.com/api/adv/rooms`)
      .then(res => {
        //console.log(res.data);

        setMapList(res.data);
      })
      .catch(err => {
        console.log(err.response.data);
      });
  }, [] );
  
  return ( <div className="GamePage">
      { localStorage.getItem( "token" ) ?
        ( <LogOut onClick={ handleLogout }>Log out</LogOut> ) : null }
      
      <World mapList={ mapList }/>
    </div> );
}

export default GamePage;

const LogOut = styled.p`
  width: 200px;
  margin: 5px 30px 5px auto;
  cursor: pointer;
  &:hover {
    color: yellow;
  }
`;
