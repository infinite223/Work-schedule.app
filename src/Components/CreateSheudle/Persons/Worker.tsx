import React, { useState, useRef } from 'react'
import { motion } from './../../../imports'
import { position, show } from './../../../Animations/variants';
import { bindActionCreators } from 'redux';
import { actionCreators, State } from '../../../state';
import { useDispatch, useSelector } from 'react-redux';

import './Person.scss'

interface props {
  personsCount:number,
  id:number
}

export const Worker: React.FC<props>= ({ personsCount, id }) => { 
  const [email, setEmaill] = useState("")
  const [nickname, setNickname] = useState<string>("")

  const person = useSelector((state: State)=> state.person)
  const dispatch = useDispatch();
  
  const { addPerson, setPerson, setEmail } = bindActionCreators(actionCreators, dispatch)

  return (
    <motion.div className='Person flex' 
        variants={position}
        initial="outsideRight"
        animate="goodPosition"
        whileHover={id==personsCount?"hoverWorker":"noHoverWorker"}>
         {id==personsCount?<motion.div className='flex person_content' onClick={()=> (addPerson({id: id+1,email:"", nickname:""}))}>
            <h5>Click to add new person</h5>
            <div className='button new_person-button flex'>+</div>
         </motion.div>:
          <motion.div className='flex person_content'>
            <motion.div className='flex person_content'  variants={show} initial="hidden" animate="visible"  whileHover="hover">
            {nickname?<h4>{nickname.length>7?nickname.substring(0, 6)+"...":nickname}</h4>:<h4>New worker</h4>}
            <form className='flex ' >
                <label>
                  <input type="text" placeholder='e-mail' onChange={(x) => (setEmaill(x.target.value), setEmail({id:id,email:x.target.value,nickname:nickname}))}/>
                  <input type="text" placeholder='nickname' onChange={(x)=>(setNickname(x.target.value),setEmail({id:id, email:email, nickname:nickname}))}/>
                </label>
            </form>
           </motion.div>
        </motion.div>}
    </motion.div>
  )
}
