import { motion, HiOutlineChevronDoubleLeft, useNavigate, Admin, Worker } from './../../imports'
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators, State } from '../../state';
import { useEffect, useState } from 'react'

import './CreateSchedule.scss'

export const CreateSchedule = () => {
  const navigate = useNavigate(); 
  
  const persons = useSelector((state: State)=> state.count)
  const dispatch = useDispatch();
  const { person }:any = persons;

  const { addPerson } = bindActionCreators(actionCreators, dispatch)


  return (
    <motion.div className='CreateSchedule '>
      <HiOutlineChevronDoubleLeft className='icon-exit'  onClick={()=>navigate("/")}/>
      <div className='Content flex'>
        <motion.div
        initial={{opacity:0}}
        animate={{opacity:1}}
        transition={{duration:2.5}}
        > 
          <h3>Create <br />Your Schedule</h3>
          <div className='inputs'>
            <input type="text" className='name_Schedule-input button' placeholder="Name group"/>   
            <div className='Create_Schedule-button button'>Create</div>   
          </div>  
          <hr style={{width:"100%",height:"1px",color:"rgba(57, 58, 59,.9)",border:"0px",backgroundColor:"rgba(57, 58, 59,.9)"}}/>                  
        </motion.div>   
      
        <div className='Persons flex'>
          <hr style={{position:"absolute",top:"-12px",width:"100%",height:"1px",color:"rgba(57, 58, 59,.9)",border:"0px",backgroundColor:"rgba(57, 58, 59,.9)"}}/>                  
          <Admin/>
          {person.map((worker:any)=> {
            return <Worker personsCount={person.length} key={worker.id} id={worker.id}/>
          })}
           <hr style={{position:"absolute",bottom:"-12px",width:"100%",height:"1px",color:"rgba(57, 58, 59,.9)",border:"0px",backgroundColor:"rgba(57, 58, 59,.9)"}}/>
        </div>  
      </div>
    </motion.div>
  )
}
