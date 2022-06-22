import './DayContentStyle.scss'
import { showDay } from '../../Animations/variantsOnSmallScreen';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators, State } from '../../state';
import { days } from '../../Helpers/constants'

import { FiPlusSquare, FiMinusSquare } from 'react-icons/fi'
import { IPerson } from './../../Helpers/interfaces';
import { ChoseHoursModal } from '../ChoseHoursModal';


export const DayContent:React.FC = ( {} ) => {
  const selectedDay = useSelector((state: State)=> state.select)
  const loginPerson = useSelector((state: State)=> state.login)
  const schedule = useSelector((state: State)=> state.schedule)
  const persons = schedule[selectedDay].persons;
  const controls = useAnimation()
  const foundDay = schedule.find((day)=>day.id===selectedDay)
  const dispatch = useDispatch();
  const { setPersonInDay } = bindActionCreators(actionCreators, dispatch)

  const myDate = new Date(`2022-06-${schedule[selectedDay].id}`)
  const [ startWork, setStartWork ] = useState(persons[0]?.startWork? persons[0].startWork : "00:00");
  const [ endWork, setEndWork ] = useState("00:00");
  const [ selectColor, setSelectColor ] = useState<boolean>();
  const [ chooseHours, setChooseHours ] = useState<boolean>(false)

  const setPersons = (operation:boolean) : void => {
    if(!operation){
      setPersonInDay({id:selectedDay+1, persons:[...persons.filter(person=> person.name!==loginPerson[0].nickname)]} )
    }
    else {    
      setPersonInDay({id:selectedDay+1, persons:[...persons.filter((person)=>person.name!==loginPerson[0].nickname),
         {name:loginPerson[0].nickname, startWork:startWork, endWork:endWork}]})
    }
  }

  useEffect(()=>{
    if(persons && loginPerson){
      const foundPerson = persons.find((person)=> person.name===loginPerson[0].nickname)
      setSelectColor(foundPerson?true:false)
    }
  },[ setPersonInDay ])
console.log(schedule)
  useEffect(()=>{
    controls.start({
      opacity:[0,1],
      transition: { duration: 2 },
    })
  }, [selectedDay])

  return (
    <AnimatePresence>
      <motion.div className='DayContent flex'
        key="box"
        variants={showDay}
        initial="hidden"
        animate={controls}
      > 
        <motion.nav>
            <motion.span>{selectedDay} </motion.span>
            <text>{days[myDate.getDay()]}</text>     
        </motion.nav>

              <div className='day__workerlist'>  
                {schedule?schedule[selectedDay].persons.map(({ name, startWork, endWork })=>{
                  return <div key={name} className={loginPerson[0].nickname===name?"person login-person":"person"}>{name} <div className='interval'>{startWork}-{endWork}</div></div>
                }):<>no data</>}
              </div>
              <ChoseHoursModal id={selectedDay+1} date={myDate} persons={persons} chooseHours={chooseHours} setChooseHours={(x)=>setChooseHours(x)}/>
              <div style={{marginTop:"50px"}}>
                {!schedule[selectedDay].persons.find((person)=>person.name===loginPerson[0].nickname)
                ?<FiPlusSquare size={40} color="grey" onClick={()=>setChooseHours(true)}/>
                :<FiMinusSquare size={40} color="grey" onClick={()=>setPersons(false)}/>}    
              </div>                          
      </motion.div>
    </AnimatePresence>
  )
}
