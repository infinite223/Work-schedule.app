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

  const [workers, setWorkers] = useState([{login:"", nickname:""}])
  console.log(workers)

  const newWorker= (login:string, nickname:string ) => {
    setWorkers([...workers, {login:login, nickname:nickname}])
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
       {workers.map(()=> {
         return <Worker newWorker={newWorker}/>
       })}
     </div>
    </motion.div>
  )
}
