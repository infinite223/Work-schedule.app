import './ChoseHoursModalStyle.scss'

import React, { useState, useEffect } from 'react'
import { CgCloseR, motion} from '../../Helpers/imports'
import { days } from '../../Helpers/constants'
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators, State } from '../../state';
import { showDay } from '../../Animations/variants';
import { useMediaQuery } from 'react-responsive'
import { AnimatePresence } from 'framer-motion';
import { IPerson } from './../../Helpers/interfaces';
import { BsCheckLg } from 'react-icons/bs'


export const ChoseHoursModal: React.FC<{ id:number, date: Date, persons: Array<IPerson>, chooseHours:boolean,setChooseHours: (value:boolean) => void  }> = ({ id, date, persons, chooseHours, setChooseHours}) => {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' })
    const loginPerson = useSelector((state: State)=> state.login)
 
    const [ startWork, setStartWork ] = useState(persons[0]?.startWork? persons[0].startWork : "00:00");
    const [ endWork, setEndWork ] = useState("22:00");

    const dispatch = useDispatch();
    const { setPersonInDay } = bindActionCreators(actionCreators, dispatch)
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
          console.log(id,selectColor)
        }
      },[ setPersons ])

  return (
    <AnimatePresence>
        {chooseHours&& <div className='blur-page'/>}
        {chooseHours&&<motion.div className='day__chooseHours' drag 
            key="box"
            variants={showDay}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <div className='nav'>
                <span>{id}</span>
                <text>{days[date.getDay()]}</text>     
                {/* <CgCloseR className='exit-icon' size={25} onClick={()=> setChooseHours(false)}/> */}
            </div>
            <h4>Set your working hours</h4>
            <div className='day__chooseHours-choose flex'>
                    <div className='chooseHours flex'>
                      <div className='label'>Start work</div>
                      <input className='hours' value={startWork} type="time" onChange={(x)=>(setStartWork(x.target.value),setPersons(true))}/>
                    </div>
                    <div className='chooseHours flex'>
                      <div className='label'>End work</div>
                      <input className='hours' value={endWork} onChange={(x)=>(setEndWork(x.target.value),setPersons(true))} type="time"/>
                    </div>
                
                {/* <input type="button" className={selectColor?"no-select":"select" } value="Free" onClick={()=>setPersons(false)}/> */}
            </div> 
            <div className='options flex'>
              <div className='remove-button button flex' onClick={()=>(setPersons(false), setChooseHours(false))}>
                Free
              </div>
              <div className='save-button button flex' onClick={()=>(setPersons(true), setChooseHours(false))}>
                Set
                <BsCheckLg size={15} className='icon'/>
              </div>
            </div> 
        </motion.div>}
    </AnimatePresence>
  )
}
