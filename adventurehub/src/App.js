import './App.css';
import Appbar from './Components/Appbar';
import Story from './Components/story';
import Index from "./pages/index.js";
import SearchStory from "./pages/SearchStory.js";
import AddStory from "./pages/AddStory.js";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
  <div className="App">    
        <Appbar />
        <Routes>
          <Route path='/' element={<Index />} />
          <Route path='Home' element={<Index />} />
          <Route path='Search' element={<SearchStory />} />
          <Route path='MakeStory' element={<AddStory />} />
          <Route path='' element={<Index />} />
        </Routes>
      </div>
  );
}

export default App;
