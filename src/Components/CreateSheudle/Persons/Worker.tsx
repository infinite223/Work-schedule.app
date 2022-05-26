import React, { useState, useRef } from 'react'
import { motion, useDispatch, useSelector, bindActionCreators } from './../../../imports'
import { position, show } from './../../../Animations/variants';
import { actionCreators, State } from '../../../state';

import './Person.scss'

interface props {
  personsCount:number,
  id:number
}

export const Worker: React.FC<props>= ({ personsCount, id }) => { 
  const person = useSelector((state: State)=> state.person)
  const dispatch = useDispatch();
  console.log(person)
  
  const { addPerson, setPerson } = bindActionCreators(actionCreators, dispatch)

  const [email, setEmaill] = useState(person[id].email)
  const [nickname, setNickname] = useState<string>(person[id].nickname)

  return (
    <motion.div className='Person flex' 
        variants={position}
        initial="outsideRight"
        animate="goodPosition"
        whileHover={id==personsCount-1?"hoverWorker":"noHoverWorker"}>
         {id==personsCount-1?<motion.div className='flex person_content' onClick={()=> (addPerson({id: id+1,email:"", nickname:""}))}>
            <h5>Click to add new person</h5>
            <div className='button new_person-button flex'>+</div>
         </motion.div>:
          <motion.div className='flex person_content'>
            <motion.div className='flex person_content'  variants={show} initial="hidden" animate="visible"  whileHover="hover">
            {nickname?<h4>{nickname.length>7?nickname.substring(0, 6)+"...":nickname}</h4>:<h4>New worker</h4>}
            <form className='flex ' >
                <label>
                  <input type="text" placeholder='e-mail' value={email} onChange={(x) => (setEmaill(x.target.value), setPerson({id:id,email:email,nickname:nickname}))}/>
                  <input type="text" placeholder='nickname' value={nickname} onChange={(x)=>(setNickname(x.target.value),setPerson({id:id, email:email, nickname:nickname}))}/>
                </label>
            </form>
           </motion.div>
        </motion.div>}
    </motion.div>
  )
}
