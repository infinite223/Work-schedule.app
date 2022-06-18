import React, { useState } from 'react'
import { motion, useDispatch, useSelector, bindActionCreators, MdOutlinePersonRemove } from '../../../Helpers/imports'
import { show } from './../../../Animations/variants';
import { actionCreators, State } from '../../../state';

import './Person.scss'

interface props {
  id:number
}

export const Worker: React.FC<props>= ({ id }) => { 
  const person = useSelector((state: State)=> state.person)
  const dispatch = useDispatch();
  
  const { setPerson, deletePerson } = bindActionCreators(actionCreators, dispatch)

  const [email, setEmaill] = useState(person[id]?person[id].email:"")
  const [nickname, setNickname] = useState<string>(person[id]?person[id].nickname:"")

  return (
    <div className='Person'>
          <motion.div className='person_content'  variants={show} initial="hidden" animate="visible"  whileHover="hover">
              <text style={{color:"white", width:"20px", margin:"0 20px"}}>{id}</text>
              
              <div className='person__data'>
                <text className='text__value'><text className='label'>email:</text>
                  <input type="text" autoComplete='off' placeholder='email' value={email} onChange={(x) => (setEmaill(x.target.value), setPerson({id:id,email:email,nickname:nickname}))}/>
                </text>
                <text className='text__value'><text className='label'>nickname:</text>
                  <input type="text" placeholder='nickname' value={nickname} onChange={(x)=>(setNickname(x.target.value),setPerson({id:id, email:email, nickname:nickname}))}/>
                </text>    
              </div>            
              <MdOutlinePersonRemove className='delete-person' size={25} onClick={()=>deletePerson({id:id,email:"",nickname:""})}/>
          </motion.div>
    
    </div>

  )
}
