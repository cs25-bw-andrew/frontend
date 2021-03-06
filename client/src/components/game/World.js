import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Pusher from "pusher-js";

function World( { mapList } ){
  //console.log( "map ", mapList );
  //console.log("player", player.position)
  const [ top, setTop ] = useState( 0 );
  const [ left, setLeft ] = useState( 0 );
  const [ warning, setWarning ] = useState( "" );
  const [ player, setPlayer ] = useState( {
    title: "", description: "", players: []
  } );
  const [ uuid, setUuid ] = useState( "" );
  const [ pusher, setPusher ] = useState( "" );
  const [ channel, setChannel ] = useState( "" );
  const [ channelChat, setChannelChat ] = useState( "" );
  const [ messages, setMessages ] = useState( [] );
  const [ form, setForm ] = useState( {
    chat: ""
  } );
  const changeHandler = e => {
    setForm( { ...form, [ e.target.name ]: e.target.value } );
  };
  useEffect( () => {
    
    if( uuid !== "" ){
      setPusher( new Pusher( "f7cd454f2fd72664163b", {
        cluster: "us3"
      } ) );
      
    }
    
  }, [ uuid ] );
  
  useEffect( () => {
    if( pusher !== "" ){
      setChannel( pusher.subscribe( "p-channel-" + uuid ) );
    }
  }, [ pusher ] );
  
  useEffect( () => {
    if( pusher !== "" ){
      setChannelChat( pusher.subscribe( "chat" ) );
    }
  }, [ pusher ] );
  
  useEffect( () => {
    if( channel !== "" ){
      channel.bind( "broadcast", ( data ) => {
        if( messages.length < 10 ){
          messages.push( data.message );
          setMessages( [ ...messages ] );
        }else{
          let newMessages = messages.splice( 0, 1 );
          newMessages.push( data.message );
          setMessages( [ ...newMessages ] );
        }
        console.log( data );
      } );
    }
  }, [ channel ] );
  
  useEffect( () => {
    if( channelChat !== "" ){
      channelChat.bind( "broadcast", ( data ) => {
        if( messages.length < 10 ){
          messages.push( data.message );
          setMessages( [ ...messages ] );
        }else{
          let newMessages = messages.splice( 0, 1 );
          newMessages.push( data.message );
          setMessages( [ ...newMessages ] );
        }
        console.log( data );
      } );
    }
  }, [ channelChat ] );
  
  //let items = [];
  useEffect( () => {
    axios
      .get(`https://cs-adv.herokuapp.com/api/adv/init`, {
        headers: {
          authorization: `Token ${localStorage.getItem("token")}`
        }
      })
      .then(res => {
        if (uuid !== res.data.uuid) {
          setUuid(res.data.uuid);
        }
        console.log(res.data);
        setTop(res.data.position[1]);
        setLeft(res.data.position[0]);
        setPlayer({
          title: res.data.title,
          description: res.data.description,
          players: res.data.players
        });
      })
      .catch(err => {
        console.log(err.response.data);
      });
  }, [] );
  
  useEffect( () => {
  }, [ top, left ] );
  let playerStyles = {
    position: "absolute",
    width: "20px",
    height: "20px",
    backgroundColor: `blue`,
    z_index: "99",
    top: `${ 480 - top * 23 }px`,
    left: `${ left * 23 }px`
  };
  
  const handleMove = movingDirection => {
    
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
        setWarning(res.data.error_msg);
        setPlayer({
          title: res.data.title,
          description: res.data.description,
          players: res.data.players
        });
        if (movingDirection == "n" && !res.data.error_msg) {
          setTop(top + 1);
        } else if (movingDirection == "s" && !res.data.error_msg) {
          setTop(top - 1);
        } else if (movingDirection == "w" && !res.data.error_msg) {
          setLeft(left - 1);
        } else if (movingDirection == "e" && !res.data.error_msg) {
          setLeft(left + 1);
        }
      })
      .catch(err => {
        console.log(err.response.data);
      });
  };
  
  const handleChat = ( e ) => {
    e.preventDefault();
    axios
      .post(
        `https://cs-adv.herokuapp.com/api/adv/say`,
        { message: form.chat },
        {
          headers: {
            authorization: `Token ${localStorage.getItem("token")}`
          }
        }
      )
      .then(res => {
        console.log(res.data);
        setForm({ chat: "" });
      })
      .catch(err => {
        console.log(err.response.data);
      });
  };
  
  const printPlayerList = ( players ) => {
    let playersStr = "";
    if( players ){
      
      players.map( ( player ) => {
        playersStr = `${ playersStr } ${ player }/ `;
      } );
    }
    return playersStr;
  };
  return ( <div className="World">
    <MainContainer>
      <GameContainer>
        { mapList.map( item => {
          return ( <div
            style={ {
              position: "absolute",
              width: "20px",
              height: "20px",
              top: `${ 480 - item.y * 23 }px`,
              left: `${ item.x * 23 }px`,
              background: "red"
            } }
          /> );
        } ) }{ " " }
        <div style={ playerStyles }/>
      </GameContainer>
      <ControlContainer>
        <DisplayContainer>
          <span>Room :{ player.title }</span>
          <p/>
          <span style={ { lineHeight: 1.6 } }>
              Description :{ player.description }
            </span>
          <p/>
          <span style={ { lineHeight: 1.6 } }>
              Players: { printPlayerList( player.players ) }
            </span>
        </DisplayContainer>
        <div style={ { display: "flex" } }>
          <ButtonContainer>
            <div style={ { textAlign: "center" } }>
              <Button onClick={ () => handleMove( "n" ) }>N</Button>
            </div>
            <div style={ { textAlign: "center" } }>
              <Button onClick={ () => handleMove( "w" ) }>W</Button>
              <Button onClick={ () => handleMove( "s" ) }>S</Button>
              <Button onClick={ () => handleMove( "e" ) }>E</Button>
              
              <p style={ { color: "#8b0000" } }>{ warning }</p>
            </div>
          </ButtonContainer>
          <ChatContainer>
            <div
              style={ {
                height: "260px", border: "2px solid yellow", background: "black"
              } }
            >
              { messages.length > 0 && messages.map( message => {
                return <p style={ { color: "white" } }>{ message }</p>;
              } ) }
            </div>
            <div style={ {} }>
              <Input
                type="text"
                name="chat"
                value={ form.chat }
                onChange={ changeHandler }
              />
              <button onClick={ handleChat }>send</button>
            </div>
          </ChatContainer>
        </div>
      </ControlContainer>
    </MainContainer>
  </div> );
}

export default World;

const MainContainer = styled.div`
  display: flex;
`;

const GameContainer = styled.div`
  margin: 100px 5vw;
  position: relative;

  width: 500px;
  border: 5px solid #202020;
  height: 500px;
  background: #4a4a4a;
`;
const ControlContainer = styled.div`
  margin: 100px 5vw 100px 5vw;
  width: 500px;
  height: 500px;
`;
const DisplayContainer = styled.div`
  padding: 10px;
  font-size: 0.6rem;
  background: black;
  width: 500px;
  height: 200px;
  color: lightgrey;
`;
const ButtonContainer = styled.div`
  width: 250px;
  height: 100px;
  margin: 180px 0 0 0;
  
`;
const ChatContainer = styled.div`
  width: 280px;
  height: 300px;
  font-size: 0.6rem;
  margin: 20px 0 0 0;
`;
const Button = styled.button`
  margin: 5px;
  width: 50px;
  padding: 5px;
  border: 3px solid #202020;
  font-size: 1.5rem;
  font-family: "Press Start 2P", cursive;
  cursor: pointer;
  &:hover {
    color: red;
  }
`;

const Input = styled.input`
  margin: 5px 5px 5px 0;
  width: 210px;
`;