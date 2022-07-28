import './DayContentStyle.scss'
import { showDay } from '../../Animations/variantsOnSmallScreen';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators, State } from '../../state';
import { days, today } from '../../Helpers/constants'

import { ChoseHoursModal } from '../ChoseHoursModal';
import { IGroupType } from '../../Helpers/interfaces';

interface DayContentProps {
  chooseHours:boolean,
  setChooseHours: (value:boolean) => void,
  theme:Array<number>
}

export const DayContent:React.FC<DayContentProps> = ({chooseHours, setChooseHours, theme}) => {
  const selectedDay = useSelector((state: State)=> state.select)
  const loginPerson = useSelector((state: State)=> state.login)
  const schedule = useSelector((state: State)=> state.schedule)
  const group:IGroupType = useSelector((state: State)=> state.group)
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
                {schedule&&schedule[selectedDay-1].persons.length<1&&<div className='person'>No one works on this day yet</div>}
                {schedule?schedule[selectedDay-1].persons?.map(({ name, startWork, endWork },x)=>{
                    const foundWorker = group.workers?.find((worker)=> worker.name === name)
                  return <div key={x} className={loginPerson===name?"person login-person":"person"}>
                        <div className='person__data'>
                          <span style={{color:"rgb("+theme+")"}}>{name} </span>
                          <span>{foundWorker?.group}</span>
                        </div>
                       <div className='interval'>{startWork}-{endWork}</div>
                    </div>
                }):<>no data</>}
              </div>
              <ChoseHoursModal theme={theme} id={selectedDay} date={today} persons={persons} chooseHours={chooseHours} setChooseHours={(x)=>setChooseHours(x)}/>                                     
      </motion.div>
    </AnimatePresence>
  )
}
