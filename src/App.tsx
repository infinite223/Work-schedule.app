import { StartPage } from './StartPage/StartPage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CreateSchedule } from './Components/CreateSheudle/CreateSchedule';

import './App.scss'

function App() {
  return (
    <div className='App flex'>
      <Router>  
        <Routes>      
          <Route path="/" element={<StartPage/>} />   
          <Route path="/Create" element={<CreateSchedule/>} />           
        </Routes>     
      </Router>
      <text className='version-text'>Work schedule v0.2</text>
    </div>
  );
}

export default App;
