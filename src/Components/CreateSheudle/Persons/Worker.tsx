import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import './Person.scss'
import { position } from './../../../Animations/variants';

interface props {
  newWorker: (login:string, nickname:string) => void,
  setWorker: (id:number, login:string, nickname:string) => void,
  id:number
}

export const Worker: React.FC<props>= ({ newWorker, setWorker, id }) => {
  const [showForm, setShowForm] = useState<boolean>(false);  
  const [nickname, setNickname] = useState<string>("")

  return (
    <motion.div className='Person flex'
        variants={position}
        initial="outsideRight"
        animate="goodPosition"
        whileHover="hoverWorker">
         {!showForm?<motion.div className='flex person_content'  onClick={()=> (setShowForm(true), newWorker("",""))}>
            <h5>Click to add new person</h5>
            <div className='button new_person-button flex'>+</div>
         </motion.div>:
          <motion.div className='flex person_content'>
            <motion.div className='flex person_content'>
            {nickname?<h4>{nickname.length>7?nickname.substring(0, 6)+"...":nickname}</h4>:<h4>New worker</h4>}
            <form className='flex '>
                <label>
                  <input type="text" placeholder='login'/>
                  <input type="text" placeholder='nickname' onChange={(x)=>setNickname(x.target.value)}/>
                </label>
            </form>
            <button onClick={()=>setWorker(id,"Dawid", "Szmigiel")}>click</button>      
           </motion.div>
        </motion.div>}
    </motion.div>
  )
}
