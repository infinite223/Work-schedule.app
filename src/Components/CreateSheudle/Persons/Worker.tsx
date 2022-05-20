import React, { useState, useRef } from 'react'
import { motion } from './../../../imports'
import { position, show } from './../../../Animations/variants';
import { bindActionCreators } from 'redux';
import { actionCreators, State } from '../../../state';
import { useDispatch, useSelector } from 'react-redux';


import './Person.scss'

interface props {
  id:number
}

export const Worker: React.FC<props>= ({ id }) => {
  const [showForm, setShowForm] = useState<boolean>(false); 
  
  const [email, setEmail] = useState("")
  const [nickname, setNickname] = useState<string>("")

  const person = useSelector((state: State)=> state.count)
  const dispatch = useDispatch();
  
  const { addPerson, setPerson, deletePerson } = bindActionCreators(actionCreators, dispatch)

  return (
    <motion.div className='Person flex' 
        variants={position}
        initial="outsideRight"
        animate="goodPosition"
        whileHover={!showForm?"hoverWorker":"noHoverWorker"}>
         {!showForm?<motion.div className='flex person_content' onClick={()=> (addPerson({id: id+1,email:"", nickname:""}),setShowForm(true))}>
            <h5>Click to add new person</h5>
            <div className='button new_person-button flex'>+</div>
         </motion.div>:
          <motion.div className='flex person_content'>
            <motion.div className='flex person_content'  variants={show} initial="hidden" animate="visible"  whileHover="hover">
            {nickname?<h4>{nickname.length>7?nickname.substring(0, 6)+"...":nickname}</h4>:<h4>New worker</h4>}
            <form className='flex ' >
                <label>
                  <input type="text" placeholder='e-mail' onChange={(x)=>(setEmail(x.target.value),setPerson({id:id, email:email, nickname:nickname}))}/>
                  <input type="text" placeholder='nickname' onChange={(x)=>(setNickname(x.target.value),setPerson({id:id, email:email, nickname:nickname}))}/>
                </label>
            </form>
           </motion.div>
        </motion.div>}
    </motion.div>
  )
}
