import { motion } from '../../../Helpers/imports'
import { useState } from 'react'

import './Person.scss'  

interface adminProps {
  setEmailAdmin:(value:string) => void,
  setNicknameAdmin:(value:string) => void
}

export const Admin:React.FC<adminProps> = ({ setNicknameAdmin, setEmailAdmin }) => {
  const [nickname, setNickname] = useState<string>(); 
  
  return (
    <motion.div className='Person'>
        <div className='person_content'>
          <div className='person__data admin' style={{marginTop:"40px"}}>
            <div className='div__value margin'><input type="div" placeholder='Set your nickname..' autoComplete='off' onChange={(x)=>setNicknameAdmin(x.target.value)}/></div>
            <div className='div__value margin'><input type="email" placeholder='Type your email..' autoComplete='off' onChange={(x)=>setEmailAdmin(x.target.value)}/> </div>
            <div className='div__value margin'> <input type="password" placeholder='Set password..' autoComplete='off'/> </div>
            <div className='help-div margin'>click <span style={{color:"#FF00FF"}}>Create</span> button at the top to create your shedule</div>
          </div>       
        </div>
    </motion.div>
  )
}
