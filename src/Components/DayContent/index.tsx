import './DayContentStyle.scss'
import { showDay } from '../../Animations/variantsOnSmallScreen';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators, State } from '../../state';
import { days } from '../../Helpers/constants'

import { IPerson } from './../../Helpers/interfaces';


export const DayContent:React.FC<{ persons: Array<IPerson> }> = ( {persons} ) => {
  const selectedDay = useSelector((state: State)=> state.select)
  const loginPerson = useSelector((state: State)=> state.login)
  const schedule = useSelector((state: State)=> state.schedule)
  const foundDay = schedule.find((day)=>day.id===selectedDay)
  const dispatch = useDispatch();
  const { setPersonInDay } = bindActionCreators(actionCreators, dispatch)

  const myDate = new Date(`2022-06-${schedule[selectedDay].id}`)
  const [ startWork, setStartWork ] = useState(persons[0]?.startWork? persons[0].startWork : "00:00");
  const [ endWork, setEndWork ] = useState("00:00");
  const [ selectColor, setSelectColor ] = useState<boolean>();

  const setPersons = (operation:boolean) : void => {
    if(!operation){
      setPersonInDay({id:selectedDay, persons:[...persons.filter(person=> person.name!==loginPerson[0].nickname)]} )
    }
    else {
     
      setPersonInDay({id:selectedDay, persons:[...persons.filter((person)=>person.name!==loginPerson[0].nickname),
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
    <motion.div className='DayContent flex'
      variants={showDay}
      initial="hidden"
      animate="visible"
    > 
      <motion.nav>
          <motion.span>{foundDay?.id&&foundDay.id+1} </motion.span>
          <text>{days[myDate.getDay()]}</text>     
      </motion.nav>
         
            <div className='day__workerlist'>  
              {persons?persons.map(({ name, startWork, endWork })=>{
                return <div key={name} className={loginPerson[0].nickname===name?"person login-person":"person"}>{name} {startWork}-{endWork}</div>
              }):<>xd</>}
            </div>
            {/* <div className='day__chooseHours-choose flex'>
              <div className={`chooseHours flex ${selectColor?"select":"no-select"}`} onClick={()=>setPersons(true)}>
                <input className='hours' value={startWork} type="time" onChange={(x)=>(setStartWork(x.target.value),setPersons(true))}/>
                  To  
                <input className='hours' value={endWork} onChange={(x)=>(setEndWork(x.target.value),setPersons(true))} type="time"/>
              </div>  
                
                <input type="button" className={ selectColor?"no-select":"select" } value="Free" onClick={()=>setPersons(false)}/>
            </div>   */}
    </motion.div>
  )
}