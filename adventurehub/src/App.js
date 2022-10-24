import './App.css';
import Appbar from './Components/Appbar';
import Index from "./pages/index.js";
import SearchStory from "./pages/SearchStory.js";
import Login from "./pages/Login.js";
import { Routes, Route } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import ReadStory from './pages/ReadStory';

function App() {
  return (
  <div className="App">    
        <Appbar />
        <Routes>
          <Route path='/' element={<Index />} />
          <Route path='Home' element={<Index />} />
          <Route path='Search' element={<SearchStory />} />
          <Route path='' element={<Index />} />
          <Route path='DashBoard' element={<Dashboard />} />
          <Route path='Login' element={<Login />} />
          <Route path='ReadStory' element={<ReadStory />} />
        </Routes>
      </div>
  );
}

export default App;
