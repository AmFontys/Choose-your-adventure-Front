import './App.css';
import Appbar from './Components/Appbar';
import Index from "./pages/index.js";
import SearchStory from "./pages/SearchStory.js";
import Login from "./pages/Login.js";
import Register from "./pages/Register";
import { Routes, Route } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import ReadStory from './pages/ReadStory';
import ProtectedRoute from './Components/protectedRoute';
import React from 'react';
import useLocalStorage from './Components/useLocalStorage';
import { useEffect, useState } from 'react';
// import SockJS from 'sockjs-client';
// import Stomp from 'stompjs';
// Set the backend location
const ENDPOINT = "http://localhost:8080/ws";


function App() {

  const [user, setUser] = useLocalStorage("", "user");
  const [stompClient, setStompClient] = useState();
  const [messagesReceived, setMessagesReceived] = useState([]);

  useEffect(() => {
    // // use SockJS as the websocket client
    // const socket = SockJS(ENDPOINT);
    // // Set stomp to use websockets
    // const stompClient = Stomp.over(socket);
    // // connect to the backend
    // stompClient.connect({}, () => {
    //   // subscribe to the backend
    //   stompClient.subscribe('/topic/publicmessages', (data) => {
    //     console.log(data);
    //     onMessageReceived(data);
    //   });
    // });
    // // maintain the client for sending and receiving
    // setStompClient(stompClient);
  }, []);

  // display the received data
  const onMessageReceived = (data) => {
    const message = JSON.parse(data.body);
    setMessagesReceived(messagesReceived => [...messagesReceived, message]);
  };


  const isUserAllowed = (userRole, roleNeeded) => {
    return userRole === roleNeeded;
  }

  return (
    <div className="App">
      <Appbar />
      <Routes>
        <Route exact path='/' element={<Index />} />
        <Route exact path='Home' element={<Index />} />
        <Route exact path='Search' element={<SearchStory />} />
        <Route element={<Index />} />
        <Route exact path='DashBoard' element={
          <ProtectedRoute isAllowed={isUserAllowed(user.Role, "User")}>
            <Dashboard />
          </ProtectedRoute>
        }
        />
        <Route exact path='Login' element={<Login />} />
        <Route exact path='Register' element={<Register />} />
        <Route exact path="ReadStory/:id" element={<ReadStory />} />
      </Routes>
    </div>
  );
}

export default App;
