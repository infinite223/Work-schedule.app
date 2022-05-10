import { StartPage } from './StartPage/StartPage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CreateSchedule } from './Components/CreateSheudle/CreateSchedule';
import { RiCalendarTodoLine } from 'react-icons/ri'
import { motion } from 'framer-motion'
import './App.scss'

function App() {
  return (
    <div className='App flex'>
      <div className='square-conteiner'>
        <div className='square-1 flex'><text>1<span>May</span></text></div>
        <div className='square-2 flex'><text>2<span>May</span></text></div>
        <div className='square-3 flex'><text>3<span>May</span></text></div>
        <div className='square-4 flex'><text>4<span>May</span></text></div>
      </div>
      
      <Router>  
        <Routes>      
          <Route path="/" element={<StartPage/>} />   
          <Route path="/Create" element={<CreateSchedule/>} />           
        </Routes>     
      </Router>
      <RiCalendarTodoLine className='calendar-icon' size={35}/>
      <text className='version-text'>Work schedule v0.2</text>
    </div>
  );
}

export default App;
