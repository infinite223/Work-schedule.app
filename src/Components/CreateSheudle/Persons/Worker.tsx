import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { button } from '../../../Animations/variants' 
import './Person.scss'

export const Worker = () => {

  const [showForm, setShowForm] = useState(false);  
  return (
    <motion.div className='Person flex'
        onClick={()=>setShowForm(!showForm)}  
        variants={button}
        initial="hidden"
        animate="goodPosition"
        whileHover="hoverWorker">
         {!showForm?<motion.div className='flex person_content'>
            <h4>Add new person in your work shoudle</h4>
            <div className='button new_person-button flex'>+</div>
         </motion.div>:
          <motion.div className='flex person_content'>
            <h4>New worker</h4>
            <form>
                <label>
                <input type="text" placeholder='login'/>
                <input type="text" placeholder='nickname' />
                </label>
            </form>
        </motion.div>}
    </motion.div>
  )
}
