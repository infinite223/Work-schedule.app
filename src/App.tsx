import { StartPage, SchedulePage, Router, Routes, Route, DayOnBackground, LoginPage, days } from './Helpers/imports';

import './App.scss'
import { CreateAdmin } from './Components/CreateSheudle/SubPages/CreateAdmin';
import { CreateGroups } from './Components/CreateSheudle/SubPages/CreateGroups';
import { RegisterPage } from './Pages/RegisterPage/index';

function App() {

  return (
    <>
      <div className='App flex'>
        <div className='square-conteiner'>
          {days.map((day, i)=>{
            return (       
                <DayOnBackground key={i} day={day} className={"flex square-1"}/>       
            )}       
          )}     
        </div>

        <Router>  
          <Routes>      
            <Route path="/" element={<StartPage/>} />   
            <Route path="/CreateAdmin" element={<CreateAdmin/>} />
            <Route path="/CreateGroups" element={<CreateGroups/>} />
            <Route path='/Login' element={<LoginPage/>}/> 
            <Route path='/Register' element={<RegisterPage/>}/> 
            <Route path='/Schedule' element={<SchedulePage/>}/>              
          </Routes>     
        </Router>
        
         <div className='version-text'>Work schedule v2.6</div> 
      </div>
    </>
  );
}

export default App;
