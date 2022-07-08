import React, { useState } from 'react'
import { motion} from '../../Helpers/imports'
import { days } from '../../Helpers/constants'
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators, State } from '../../state';
import { showWorkers } from '../../Animations/variants';
import { useMediaQuery } from 'react-responsive'

import { ChoseHoursModal } from '../ChoseHoursModal';

import './Day.scss'
import { BsDot } from 'react-icons/bs'
import { IPerson } from './../../Helpers/interfaces';

export const Day: React.FC<{ id:number, persons: Array<IPerson> }> = ({ id, persons }) => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' })
  const loginPerson = useSelector((state: State)=> state.login)
  const todayDate = new Date();
  const dayDate = new Date(todayDate.getFullYear(), todayDate.getMonth(),id);

  const dispatch = useDispatch();
  const { setSelectedDay } = bindActionCreators(actionCreators, dispatch)
  const [ chooseHours, setChooseHours ] = useState<boolean>(false)


  return (
    <>
      <ChoseHoursModal id={id} date={todayDate} persons={persons} chooseHours={chooseHours} setChooseHours={(x)=>setChooseHours(x)}/>      
      {!isTabletOrMobile?
        <motion.div className={todayDate.getDate()-1<id?`enable-day day`:'day disable-day'} onClick={()=> setChooseHours(todayDate.getDate()-1<id&&true)}
        variants={showWorkers}
        initial="start"
        whileHover={todayDate.getDate()-1<id&&persons.length>=3?"hover":""}
      >
          <nav>
            <span className={todayDate.getDate()===id?"magenta-text":""}>{id}</span>
            <div>{days[dayDate.getDay()]}</div>      
          </nav>
          <div className='day__workerlist'>  
            {persons?persons?.map(({ name, startWork, endWork }, person)=>{
              return <div key={person} className={loginPerson===name?"person login-person":"person"}>{name} {startWork}-{endWork}</div>
            }):<>no data</>}
          </div>
      </motion.div>:
      <div className={todayDate.getDate()-1>=id?`disable-day day__smallscreen flex`:`day__smallscreen flex`} onClick={()=> setSelectedDay(id)}>
        <span className={todayDate.getDate()===id?"today":""}>{id}</span>
        <div className='dots'>
          {persons?persons?.map(({ name }, person)=>{
                return <BsDot key={person} size={20} className={loginPerson===name?"dot magenta-text":"dot"}/>
          }):<></>}
        </div>
      </div>}
    </>
  )
}
