import { StartPage, Router, Routes, Route, CreateSchedule, RiCalendarTodoLine, DayOnBackground, LoginPage, days } from './imports';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators, State } from './state';

import './App.scss'

function App() {
  const count = useSelector((state: State)=> state.count)
  const dispatch = useDispatch();
  
  const { incrementCount, decrementCount } = bindActionCreators(actionCreators, dispatch)
  console.log(count)
  return (
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
        </Routes>     
      </Router>
      
      <RiCalendarTodoLine className='calendar-icon' size={35}/>
      <text className='version-text' onClick={()=>incrementCount(1)}>Work schedule v0.3</text>
    </div>
  );
}

export default App;
