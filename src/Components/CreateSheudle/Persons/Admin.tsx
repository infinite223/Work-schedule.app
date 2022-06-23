import { motion } from '../../../Helpers/imports'
import { useState } from 'react'

import './Person.scss'  

export const Admin = () => {
  const [nickname, setNickname] = useState<string>();
  
  return (
    <motion.div className='Person flex'>
        <div className='person_content'>
          <div className='person__data admin'>
            <div className='div__value margin'><input type="div" placeholder='Set your nickname..' autoComplete='off'/></div>
            <div className='div__value margin'><input type="div" placeholder='Type youremail..' autoComplete='off'/> </div>
            <div className='div__value margin'> <input type="password" placeholder='Set password..' autoComplete='off'/> </div>
            <div className='help-div margin'>click <span style={{color:"#FF00FF"}}>Create</span> button at the top to create your shedule</div>
          </div>
        
        </div>
    </motion.div>
  )
}
