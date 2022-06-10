import { motion } from './../../../imports'
import { useState } from 'react'

import './Person.scss'  

export const Admin = () => {
  const [nickname, setNickname] = useState<string>();
  
  return (
    <motion.div className='Person flex' style={{border:"1px solid rgba(255, 0, 255,.3)"}}>
        <div className='person_content'>
            <text style={{color:"white"}}>Admin</text>
            <text className='text__value'><text>email:</text> <input type="text" autoComplete='off'/></text>
            <text className='text__value'><text>nickname:</text> <input type="text" autoComplete='off'/> </text>
            <text className='text__value'><text>password:</text> <input type="password" autoComplete='off'/> </text>
        </div>
    </motion.div>
  )
}
