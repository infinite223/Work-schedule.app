import { motion } from './../../../imports'
import { useState } from 'react'

import './Person.scss'  

export const Admin = () => {
  const [nickname, setNickname] = useState<string>();
  
  return (
    <motion.div className='Person flex'>
        <div className='person_content'>
          <div className='person__data admin'>
            <text className='text__value'><input type="text" placeholder='Set your nickname..' autoComplete='off'/></text>
            <text className='text__value'><input type="text" placeholder='Type youremail..' autoComplete='off'/> </text>
            <text className='text__value'> <input type="password" placeholder='Set password..' autoComplete='off'/> </text>
          </div>
        
        </div>
    </motion.div>
  )
}
