
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';


import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { v4 as uuidv4 } from 'uuid';
import MsgChat from './websocket/msgChat';
import MsgSend from './websocket/msgSend';
import MsgUser from './websocket/msgUser';
import { useEffect, useState } from 'react';

//Set the backend location
const ENDPOINT = "http://localhost:8080/ws";

export default function ChatRoom() {
  //Stomp variables
  const [stompClient, setStompClient] = useState();
  const [messagesReceived, setMessagesReceived] = useState([]);
  const [username, setUsername] = useState();
  useEffect(() => {
    getUserName();

    console.log(username)
    // use SockJS as the websocket client
    const socket = SockJS(ENDPOINT);
    // Set stomp to use websockets
    const stompClient = Stomp.over(socket);
    // connect to the backend
    stompClient.connect({}, () => {
      // subscribe to the backend
      console.log("I'm connected")
      stompClient.subscribe('/topic/publicmessages', (data) => {
        console.log(data);
        onMessageReceived(data);
      });
    });
    // maintain the client for sending and receiving
    setStompClient(stompClient);
  }, []);

  //Get the users name
  function getUserName() {
    setUsername(JSON.parse(sessionStorage.getItem("user")).username);
  }

  // display the received data
  const onMessageReceived = (data) => {
    const message = JSON.parse(data.body);
    setMessagesReceived(messagesReceived => [...messagesReceived, message]);
  };

  const sendMessage = (newMessage) => {
    const payload = { 'id': uuidv4(), 'from': username, 'to': newMessage.to, 'text': newMessage.text };
    if (payload.to) {
      stompClient.send(`/user/${payload.to}/queue/inboxmessages`, {}, JSON.stringify(payload));
    } else {
      stompClient.send('/topic/publicmessages', {}, JSON.stringify(payload));
    }
  };

  const onUsernameInformed = (username) => {
    stompClient.subscribe(`/user/${username}/queue/inboxmessages`, (data) => {
      onMessageReceived(data);
    });
  }

  //Styles
  const chatSection = {
    width: '100%',
    height: '80vh'
  };

  return (
    <div className='ChatRoom-Box'>
      <MsgUser username={username} onUsernameInformed={onUsernameInformed} /><br></br>

      <Grid container>
        <Grid item xs={12} >
          <Typography variant="h5" className="header-message">Chat</Typography>
        </Grid>
      </Grid>
      <Grid container component={Paper} style={chatSection}>
        <MsgChat username={username} messagesReceived={messagesReceived} />
        <Divider />
        <MsgSend username={username} onMessageSend={sendMessage} /><br></br>
      </Grid>
    </div>
  )
}