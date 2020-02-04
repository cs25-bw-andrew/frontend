import React, { useState, useEffect } from "react";
import styled from "styled-components";

const MainContainer = styled.div`
  position: relative;

  width: 500px;
  border: 5px solid #202020;
  height: 500px;
  background: #4a4a4a;
`;

function World() {
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);
  let items = [];
  useEffect(() => {}, [top, left]);
  let playerStyles = {
    position: "absolute",
    width: "20px",
    height: "20px",
    backgroundColor: `blue`,
    z_index: "99",
    top: `${top * 23}px`,
    left: `${left * 23}px`
  };
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 15; j++) {
      items.push([j, i]);
    }
  }

  const handleMove = movingDirection => {
    if (movingDirection == "n") {
      setTop(top - 1);
    } else if (movingDirection == "s") {
      setTop(top + 1);
    } else if (movingDirection == "w") {
      setLeft(left - 1);
    } else if (movingDirection == "e") {
      setLeft(left + 1);
    }
  };

  return (
    <div className="World">
      <div>
        <MainContainer>
          {items.map(item => {
            return (
              <div
                style={{
                  position: "absolute",
                  width: "20px",
                  height: "20px",
                  top: `${item[0] * 23}px`,
                  left: `${item[1] * 23}px`,
                  background: "red"
                }}
              />
            );
          })}{" "}
          <div style={playerStyles} />
        </MainContainer>
        <button onClick={() => handleMove("n")}>N</button>
        <button onClick={() => handleMove("s")}>S</button>
        <button onClick={() => handleMove("w")}>W</button>
        <button onClick={() => handleMove("e")}>E</button>
      </div>
    </div>
  );
}

export default World;
