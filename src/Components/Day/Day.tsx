import React, { useState, useEffect } from 'react'
import { CgCloseR, motion} from '../../imports'
import { days } from '../../Helpers/constants'
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators, State } from '../../state';
import { showDay } from '../../Animations/variants';

import './Day.scss'
import { AnimatePresence } from 'framer-motion';
interface IPerson {
      name: string;
      startWork: string;
      endWork: string;
}

export const Day: React.FC<{ id:number, date: Date,   persons: Array<IPerson> }> = ({ id, date, persons }) => {
  const loginPerson = useSelector((state: State)=> state.login)
  const [ chooseHours, setChooseHours ] = useState<boolean>(false)
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

      <div className='day' onClick={()=> setChooseHours(true)}>
          <nav >
            <span>{id}</span>
            <text>{days[date.getDay()]}</text>      
          </nav>
          <div className='day__workerlist'>  
            {persons?persons.map(({ name, startWork, endWork })=>{
              return <div key={name} className={loginPerson[0].nickname===name?"person login-person":"person"}>{name} {startWork}-{endWork}</div>
            }):<>xd</>}
          </div>
      </div>
    </AnimatePresence>
  )
}
