import React, { useState, useEffect } from 'react'
import { motion, useDispatch, useSelector, bindActionCreators, MdOutlinePersonRemove } from '../../../Helpers/imports'
import { show } from './../../../Animations/variants';
import { actionCreators, State } from '../../../state';

import './Person.scss'



export const Worker: React.FC<{ id:number, setMessage:(value:{descripstion:string, status:boolean}) => void }>= ({ id, setMessage }) => { 
  const person = useSelector((state: State)=> state.person)
  const dispatch = useDispatch();
  
  const { setPerson, deletePerson } = bindActionCreators(actionCreators, dispatch)

  const [email, setEmaill] = useState(person[id]?person[id].email:"")
  const [nickname, setNickname] = useState<string>(person[id]?person[id].nickname:"")

  useEffect(()=>{
    if(email.length<3 || nickname.length<3){
      //setMessage({descripstion:"Email or nickname is too short", status:false})
    }
    else {
      setMessage({descripstion:"", status:true})
    }
  },[email, nickname])

  return (
    <div className='Person'>
          <motion.div className='person_content'  variants={show} initial="hidden" animate="visible"  whileHover="hover">
              <div style={{color:"white", width:"20px", margin:"0 20px"}}>{id}</div>
              
              <div className='person__data'>
                <div className='div__value'><div className='label'>Email:</div>
                  <input type="div" autoComplete='off' placeholder='Email' value={email} onChange={(x) => (setEmaill(x.target.value), setPerson({id:id,email:email,nickname:nickname}))}/>
                </div>
                <div className='div__value'><div className='label'>Nickname:</div>
                  <input type="div" placeholder='Nickname' value={nickname} onChange={(x)=>(setNickname(x.target.value),setPerson({id:id, email:email, nickname:nickname}))}/>
                </div>    
              </div>            
              <MdOutlinePersonRemove className='delete-person' size={25} onClick={()=>deletePerson({id:id,email:"",nickname:""})}/>
          </motion.div>
    
    </div>

  )
}
