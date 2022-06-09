import React, { useState } from 'react'
import { motion, useDispatch, useSelector, bindActionCreators } from './../../../imports'
import { position, show } from './../../../Animations/variants';
import { actionCreators, State } from '../../../state';
import { MdOutlinePersonAdd, MdOutlinePersonRemove } from 'react-icons/md'

import './Person.scss'

interface props {
  lastPersonId:number,
  id:number
}

export const Worker: React.FC<props>= ({ lastPersonId, id }) => { 
  const person = useSelector((state: State)=> state.person)
  console.log(person)
  const dispatch = useDispatch();
  
  const { addPerson, setPerson, deletePerson } = bindActionCreators(actionCreators, dispatch)

  const [email, setEmaill] = useState(person[id]?person[id].email:"")
  const [nickname, setNickname] = useState<string>(person[id]?person[id].nickname:"")

  return (
      <motion.div className='Person flex' 
          variants={position}
          initial="outsideTop"
          animate="goodPosition"
          whileHover={id===lastPersonId?"hoverWorker":"noHoverWorker"}>
          {id===lastPersonId?<motion.div style={{backgroundColor:"rgb(25, 24, 24)"}} className='flex person_content' onClick={()=> (addPerson({id: id+1,email:"", nickname:""}))}>
              <h5>Click to add new person </h5> 
              <MdOutlinePersonAdd size={25} color='grey'/>

          </motion.div>:
            <motion.div className='person_content'>
              <motion.div className='person_content'  variants={show} initial="hidden" animate="visible"  whileHover="hover">
              <text style={{color:"white", width:"40px", textAlign:"center"}}>{id+1}</text>
              <text className='text__value'><text>email:</text>
                <input type="text" placeholder='' value={email} onChange={(x) => (setEmaill(x.target.value), setPerson({id:id,email:email,nickname:nickname}))}/>
              </text>
              <text className='text__value'><text>nickname:</text>
                <input type="text" placeholder='' value={nickname} onChange={(x)=>(setNickname(x.target.value),setPerson({id:id, email:email, nickname:nickname}))}/> 
              </text>
              
              <MdOutlinePersonRemove className='delete-person' size={25} onClick={()=>deletePerson({id:id,email:"",nickname:""})}/>
            </motion.div>
          </motion.div>}
      </motion.div>
  )
}
