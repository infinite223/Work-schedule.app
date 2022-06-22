import React, { useState, useEffect } from 'react'
import { CgCloseR, motion} from '../../Helpers/imports'
import { days } from '../../Helpers/constants'
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators, State } from '../../state';
import { showDay, showWorkers } from '../../Animations/variants';
import { useMediaQuery } from 'react-responsive'
import { Dispatch, SetStateAction } from "react";

import './Day.scss'
import { AnimatePresence } from 'framer-motion';
import { BsDot } from 'react-icons/bs'
import { IPerson } from './../../Helpers/interfaces';

export const Day: React.FC<{ id:number, date: Date, persons: Array<IPerson> }> = ({ id, date, persons }) => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' })

  const loginPerson = useSelector((state: State)=> state.login)
 
  const [ chooseHours, setChooseHours ] = useState<boolean>(false)
  const [ startWork, setStartWork ] = useState(persons[0]?.startWork? persons[0].startWork : "00:00");
  const [ endWork, setEndWork ] = useState("00:00");
  const todayDate = new Date();

  const dispatch = useDispatch();
  const { setPersonInDay, setSelectedDay } = bindActionCreators(actionCreators, dispatch)
  const [ selectColor, setSelectColor ] = useState<boolean>();


  const setPersons = (operation:boolean) : void => {
    if(!operation){
      setPersonInDay({id:id, persons:[...persons.filter(person=> person.name!==loginPerson[0].nickname)]} )
    }
    else {   
      setPersonInDay({id:id, persons:[...persons.filter((person)=>person.name!==loginPerson[0].nickname),
         {name:loginPerson[0].nickname, startWork:startWork, endWork:endWork}]})
    }
  }

  useEffect(()=>{
    if(persons && loginPerson){
      const foundPerson = persons.find((person)=> person.name===loginPerson[0].nickname)
      setSelectColor(foundPerson?true:false)
    }
  },[ setPersonInDay ])

  return (
    <AnimatePresence>
        {chooseHours&&<motion.div className='day__chooseHours' drag 
          key="box"
          variants={showDay}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
              <nav>
                <span>{id}</span>
                <text>{days[date.getDay()]}</text>     
                <CgCloseR className='exit-icon' size={25} onClick={()=> setChooseHours(false)}/>
              </nav>
              <div className='day__chooseHours-choose flex'>
                <div className={`chooseHours flex ${selectColor?"select":"no-select"}`} onClick={()=>setPersons(true)}>
                  <input className='hours' value={startWork} type="time" onChange={(x)=>(setStartWork(x.target.value),setPersons(true))}/>
                    To  
                  <input className='hours' value={endWork} onChange={(x)=>(setEndWork(x.target.value),setPersons(true))} type="time"/>
                </div>  
                
                <input type="button" className={ selectColor?"no-select":"select" } value="Free" onClick={()=>setPersons(false)}/>
              </div>  
        </motion.div>}
    {!isTabletOrMobile?
      <motion.div className={todayDate.getDate()-1<id?`enable-day day`:'day disable-day'} onClick={()=> setChooseHours(todayDate.getDate()-1<id&&true)}
        variants={showWorkers}
        initial="start"
        whileHover={todayDate.getDate()-1<id?"hover":""}
      >
          <nav>
            <span className={todayDate.getDate()===id?"magenta-text":""}>{id}</span>
            <text>{days[date.getDay()]}</text>      
          </nav>
          <div className='day__workerlist'>  
            {persons?persons.map(({ name, startWork, endWork })=>{
              return <div key={name} className={loginPerson[0].nickname===name?"person login-person":"person"}>{name} {startWork}-{endWork}</div>
            }):<>no data</>}
          </div>
      </motion.div>:
      <div className={todayDate.getDate()-1>=id?`disable-day day__smallscreen flex`:`day__smallscreen flex`} onClick={()=> setSelectedDay(id)}>
        <span className={todayDate.getDate()===id?"magenta-text":""}>{id}</span>
        <div className='dots'>
          {persons?persons.map(({ name })=>{
                return  <BsDot size={20} className={loginPerson[0].nickname===name?"dot magenta-text":"dot"}/>
          }):<></>}
        </div>
      </div>}
    </AnimatePresence>
  )
}
