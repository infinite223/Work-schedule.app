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


export const ChoseHoursModal: React.FC<{ id:number, date: Date, persons: Array<IPerson>, chooseHours:boolean,setChooseHours: (value:boolean) => void  }> = ({ id, date, persons, chooseHours, setChooseHours}) => {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' })
    const loginPerson = useSelector((state: State)=> state.login)
 
    const [ startWork, setStartWork ] = useState(persons[0]?.startWork? persons[0].startWork : "00:00");
    const [ endWork, setEndWork ] = useState("00:00");

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
            
            <div className='nav'>
                <span>{id}</span>
                <text>{days[date.getDay()]}</text>     
                <CgCloseR className='exit-icon' size={25} onClick={()=> setChooseHours(false)}/>
            </div>
            <div className='day__chooseHours-choose flex'>
                <div className={`chooseHours flex ${selectColor?"select":"no-select"}`} onClick={()=>setPersons(true)}>
                    <input className='hours' value={startWork} type="time" onChange={(x)=>(setStartWork(x.target.value),setPersons(true))}/>
                        To  
                    <input className='hours' value={endWork} onChange={(x)=>(setEndWork(x.target.value),setPersons(true))} type="time"/>
                </div>  
                
                <input type="button" className={ selectColor?"no-select":"select" } value="Free" onClick={()=>setPersons(false)}/>
            </div>  
        </motion.div>}
    </AnimatePresence>
  )
}
