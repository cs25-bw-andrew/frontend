import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function GamePage() {
  const [mapList, setMapList] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem("token");
  };
  useEffect(() => {
    axios
      .get(`https://cs-adv.herokuapp.com/api/adv/init`, {
        headers: {
          authorization: `Token ${localStorage.getItem("token")}`
        }
      })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err.response.data);
      });

    axios
      .get(`https://cs-adv.herokuapp.com/api/adv/rooms`)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err.response.data);
      });
  }, []);
  const handleMove = movingDirection => {
    //console.log(movingDirection)
    axios
      .post(
        `https://cs-adv.herokuapp.com/api/adv/move`,
        { direction: movingDirection },
        {
          headers: {
            authorization: `Token ${localStorage.getItem("token")}`
          }
        }
      )
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err.response.data);
      });
  };

  return (
    <div className="GamePage">
      {localStorage.getItem("token") ? (
        <p onClick={handleLogout}>Log out</p>
      ) : null}
      <button onClick={() => handleMove("n")}>N</button>
      <button onClick={() => handleMove("s")}>S</button>
      <button onClick={() => handleMove("w")}>W</button>
      <button onClick={() => handleMove("e")}>E</button>
    </div>
  );
}

export default GamePage;
