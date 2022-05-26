import { StartPage, SchedulePage, Router, Routes, Route, CreateSchedule, RiCalendarTodoLine, DayOnBackground, LoginPage, days } from './imports';

import './App.scss'

function App() {

  return (
    <>
      <div className='App flex'>
        <div className='square-conteiner'>
          {days.map((day)=>{
            return (       
                <DayOnBackground day={day} className={"flex square-1"}/>       
            )}       
          )}     
        </div>

        <Router>  
          <Routes>      
            <Route path="/" element={<StartPage/>} />   
            <Route path="/Create" element={<CreateSchedule/>} />
            <Route path='/Login' element={<LoginPage/>}/> 
            <Route path='/Schedule' element={<SchedulePage/>}/>              
          </Routes>     
        </Router>
        
        <RiCalendarTodoLine className='calendar-icon' size={35}/>
        <text className='version-text'>Work schedule v0.3</text>
      </div>
    </>
  );
}

export default App;
