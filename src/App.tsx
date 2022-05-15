import { StartPage } from './StartPage/StartPage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CreateSchedule } from './Components/CreateSheudle/CreateSchedule';
import { RiCalendarTodoLine } from 'react-icons/ri'
import { DayOnBackground } from './Components/DayOnBackground';
import { LoginPage } from './LoginPage/LoginPage';
import './App.scss'

function App() {
  let days:number[] = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,
    1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,
    1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,
    1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30, 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]; 
  return (
    <div className='App flex'>
      <div className='square-conteiner'>
        {days.map((day)=>{
          return (
            <>
              <DayOnBackground day={day} className={"flex square-1"}/>
            </>
          )
        }
        )}     
      </div>
      <Router>  
        <Routes>      
          <Route path="/" element={<StartPage/>} />   
          <Route path="/Create" element={<CreateSchedule/>} />
          <Route path='/Login' element={<LoginPage/>}/>           
        </Routes>     
      </Router>
      <RiCalendarTodoLine className='calendar-icon' size={35}/>
      <text className='version-text'>Work schedule v0.2</text>
    </div>
  );
}

export default App;
