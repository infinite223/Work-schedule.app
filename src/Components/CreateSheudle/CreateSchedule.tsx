import { motion } from 'framer-motion'
import { position } from '../../Animations/variants'
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
    <motion.div className='CreateSchedule flex'>
      <HiOutlineChevronDoubleLeft className='icon-exit'  onClick={()=>navigate("/")}/>

      <motion.div
       variants={position}
       initial="outsideTop"
       animate="goodPosition"
      > 
        <h3>Create <br />Your Schedule</h3>
        <input type="text" className='name_Schedule-input' placeholder="Name group"/>
      </motion.div>

     
     <div className='Persons flex'>
       <Admin/>
       {workers.map((worker)=> {
         return <Worker key={worker.id} setWorker={setWorker} newWorker={newWorker} id={worker.id}/>
       })}
     </div>
    </motion.div>
  )
}
