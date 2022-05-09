import { StartPage } from './StartPage/StartPage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CreateSchedule } from './Components/CreateSheudle/CreateSchedule';
import { RiCalendarTodoLine } from 'react-icons/ri'
import './App.scss'

function App() {
  return (
    <div className='App flex'>
      <div className='square-0'/>
      <div className='square-1'/>
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
