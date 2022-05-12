import { StartPage } from './StartPage/StartPage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CreateSchedule } from './Components/CreateSheudle/CreateSchedule';
import { RiCalendarTodoLine } from 'react-icons/ri'
import { DayOnBackground } from './Components/DayOnBackground';
import './App.scss'

function App() {
  const days = [1,2,3,4]; 
  return (
    <div className='App flex'>
      <div className='square-conteiner'>
        {days.map((day)=>{
          return (
            <>
              <DayOnBackground day={day} className={"flex square-"+day}/>
            </>
          )
        }
        )}     
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
