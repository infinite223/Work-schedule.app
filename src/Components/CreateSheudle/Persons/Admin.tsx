import { motion } from './../../../imports'
import { useState } from 'react'

import './Person.scss'  

export const Admin = () => {
  const [nickname, setNickname] = useState<string>();
  
  return (
    <motion.div className='Person flex' style={{border:"1px solid #FF00FF"}}>
        <div className='person_content'>
            <text style={{color:"whiteF"}}>Admin</text>
            <text className='text__value'><text>email:</text> <input type="text" placeholder='...'/></text>
            <text className='text__value'><text>nickname:</text> <input type="text" placeholder='...'/> </text>
            <text className='text__value'><text>password:</text> <input type="password" placeholder='...'/> </text>
        </div>
    </motion.div>
  )
}
