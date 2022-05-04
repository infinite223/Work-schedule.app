import { StartPage } from './StartPage/StartPage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CreateSheudle } from './Components/CreateSheudle/CreateSheudle';

import './App.scss'

function App() {
  return (
    <div className='App flex'>
      <Router>  
        <Routes>      
          <Route path="/" element={<StartPage/>} />   
          <Route path="/Create" element={<CreateSheudle/>} />           
        </Routes>     
      </Router>
      <text className='version-text'>Work schedule v0.2</text>
    </div>
  );
}

export default App;
