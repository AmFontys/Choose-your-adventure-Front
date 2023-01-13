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
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { v4 as uuidv4 } from 'uuid';
import MsgChat from './Components/websocket/msgChat';
import MsgSend from './Components/websocket/msgSend';
import MsgUser from './Components/websocket/msgUser';


function App() {

  const [user, setUser] = useLocalStorage("", "user");



  const isUserAllowed = (userRole, roleNeeded, secondAllowedRole) => {
    if( userRole === roleNeeded || userRole===secondAllowedRole)
      return true;
    return false;
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
          <ProtectedRoute isAllowed={isUserAllowed(user.Role, "User","Mod")}>
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
