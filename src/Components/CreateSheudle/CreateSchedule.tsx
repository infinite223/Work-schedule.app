import { motion } from 'framer-motion'
import { HiOutlineChevronDoubleLeft } from 'react-icons/hi'
import { useNavigate } from "react-router-dom";
import { useState } from 'react'

import './CreateSchedule.scss'
import { Admin } from './Persons/Admin'
import { Worker } from './Persons/Worker';

export const CreateSchedule = () => {
  const navigate = useNavigate(); 

  const [workers, setWorkers] = useState([{id:0,login:"", nickname:""}])

  const newWorker= (login:string, nickname:string ) => {
    setWorkers([...workers, {id:workers.length, login:login, nickname:nickname}])
  }

  const setWorker= (id:number, login:string, nickname:string ) => {
    let newWorker = [...workers]; 
    newWorker[id] ={id:id, login:login, nickname:nickname}; 
    setWorkers(newWorker);
  }
  

  return (
    <motion.div className='CreateSchedule '>
      <HiOutlineChevronDoubleLeft className='icon-exit'  onClick={()=>navigate("/")}/>
      <div className='Content flex'>
        <motion.div
        initial={{opacity:0}}
        animate={{opacity:1}}
        transition={{duration:2.5}}
        > 
          <h3>Create <br />Your Schedule</h3>
          <div className='inputs'>
            <input type="text" className='name_Schedule-input button' placeholder="Name group"/>   
            <div className='Create_Schedule-button button'>Create</div>   
          </div>  
          <hr style={{width:"100%",height:"1px",color:"rgba(57, 58, 59,.9)",border:"0px",backgroundColor:"rgba(57, 58, 59,.9)"}}/>                  
        </motion.div>   
      
        <div className='Persons flex'>
          <hr style={{position:"absolute",top:"-12px",width:"100%",height:"1px",color:"rgba(57, 58, 59,.9)",border:"0px",backgroundColor:"rgba(57, 58, 59,.9)"}}/>                  
          <Admin/>
          {workers.map((worker)=> {
            return <Worker key={worker.id} setWorker={setWorker} newWorker={newWorker} id={worker.id}/>
          })}
           <hr style={{position:"absolute",bottom:"-12px",width:"100%",height:"1px",color:"rgba(57, 58, 59,.9)",border:"0px",backgroundColor:"rgba(57, 58, 59,.9)"}}/>
        </div>  
      </div>
    </motion.div>
  )
}
