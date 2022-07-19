import React, { useState, useEffect } from 'react'
import { motion, useDispatch, useSelector, bindActionCreators, MdOutlinePersonRemove } from '../../../Helpers/imports'
import { show } from './../../../Animations/variants';
import { actionCreators, State } from '../../../state';

import './Person.scss'

interface workerProps {
  id:number,
  setMessage:(value:{descripstion:string,
  status:boolean}) => void,
  setWorkers:(value:Array<{id:number, email:string, nickname:string}>)=> void,
  validateWorkers:boolean,
  createSchedule:()=>void
}

export const Worker: React.FC<workerProps>= ({ id, setMessage, validateWorkers, createSchedule }) => { 
  const person = useSelector((state: State)=> state.person)
  const dispatch = useDispatch();
  
  const { setPerson, deletePerson } = bindActionCreators(actionCreators, dispatch)

  const [email, setEmaill] = useState(person[id]?person[id].email:"")
  const [nickname, setNickname] = useState<string>(person[id]?person[id].nickname:"")
  console.log(email)

  useEffect(()=>{
    //if(validateWorkers){
      setPerson({id:id,email:email,nickname:nickname})
      if(email.length<3 || nickname.length<3){
        
      }
      else {
        setMessage({descripstion:"", status:true})
      }
    //}
  },[email, nickname])
  
  return (
    <div className='Person'>
          <motion.div className='person_content'  variants={show} initial="hidden" animate="visible"  whileHover="hover">
              <div style={{color:"white", width:"20px", margin:"0 20px"}}>{id}</div>
              
              <div className='person__data'>
                <div className='div__value'><div className='label'>Email:</div>
                  <input type="div" autoComplete='off' placeholder='Email' value={email} onChange={ (x) => setEmaill(x.target.value)}/>
                </div>
                <div className='div__value'><div className='label'>Nickname:</div>
                  <input type="div" placeholder='Nickname' value={nickname} onChange={(x)=> setNickname(x.target.value)}/>
                </div>    
              </div>            
              <MdOutlinePersonRemove className='delete-person' size={25} onClick={()=>deletePerson({id:id,email:"",nickname:""})}/>
          </motion.div>
    
    </div>

  )
}
