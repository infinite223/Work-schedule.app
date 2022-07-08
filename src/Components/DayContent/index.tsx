import './DayContentStyle.scss'
import { showDay } from '../../Animations/variantsOnSmallScreen';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators, State } from '../../state';
import { days, today } from '../../Helpers/constants'

import { ChoseHoursModal } from '../ChoseHoursModal';

export const DayContent:React.FC<{chooseHours:boolean, setChooseHours: (value:boolean) => void }> = ({chooseHours, setChooseHours}) => {
  const selectedDay = useSelector((state: State)=> state.select)
  const loginPerson = useSelector((state: State)=> state.login)
  const schedule = useSelector((state: State)=> state.schedule)
  const persons = schedule[selectedDay-1]?.persons;
  const controls = useAnimation()
  const dispatch = useDispatch();
  const { setPersonInDay } = bindActionCreators(actionCreators, dispatch)

  const todayDate = new Date();
  const dayDate = new Date(todayDate.getFullYear(), todayDate.getMonth(),selectedDay);


  const removePerson = (operation:boolean) : void => {
    if(!operation){
      setPersonInDay({id:selectedDay, persons:[...persons.filter(person=> person.name!==loginPerson)]} )
    }
  }

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
            <span>{days[dayDate.getDay()]}</span>     
        </motion.nav>
              <div className='day__workerlist'>  
                {schedule?schedule[selectedDay-1].persons?.map(({ name, startWork, endWork },x)=>{
                  return <div key={x} className={loginPerson===name?"person login-person":"person"}>{name} <div className='interval'>{startWork}-{endWork}</div></div>
                }):<>no data</>}
              </div>
              <ChoseHoursModal id={selectedDay} date={today} persons={persons} chooseHours={chooseHours} setChooseHours={(x)=>setChooseHours(x)}/>
                                     
      </motion.div>
    </AnimatePresence>
  )
}
