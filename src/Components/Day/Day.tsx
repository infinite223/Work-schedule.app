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

export const Day: React.FC<{ id:number, date: Date, persons: Array<IPerson> }> = ({ id, date, persons }) => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' })
  const loginPerson = useSelector((state: State)=> state.login)
  const todayDate = new Date();
  const dispatch = useDispatch();
  const { setSelectedDay } = bindActionCreators(actionCreators, dispatch)
  const [ chooseHours, setChooseHours ] = useState<boolean>(false)


  return (
    <>
        <ChoseHoursModal id={id} date={date} persons={persons} chooseHours={chooseHours} setChooseHours={(x)=>setChooseHours(x)}/>      
    {!isTabletOrMobile?
      <motion.div className={todayDate.getDate()-1<id?`enable-day day`:'day disable-day'} onClick={()=> setChooseHours(todayDate.getDate()-1<id&&true)}
        variants={showWorkers}
        initial="start"
        whileHover={todayDate.getDate()-1<id&&persons.length>=3?"hover":""}
      >
          <nav>
            <span className={todayDate.getDate()===id?"magenta-text":""}>{id}</span>
            <div>{days[date.getDay()]}</div>      
          </nav>
          <div className='day__workerlist'>  
            {persons?persons.map(({ name, startWork, endWork }, person)=>{
              return <div key={person} className={loginPerson[0].nickname===name?"person login-person":"person"}>{name} {startWork}-{endWork}</div>
            }):<>no data</>}
          </div>
      </motion.div>:
      <div className={todayDate.getDate()-1>=id?`disable-day day__smallscreen flex`:`day__smallscreen flex`} onClick={()=> setSelectedDay(id)}>
        <span className={todayDate.getDate()===id?"magenta-text":""}>{id}</span>
        <div className='dots'>
          {persons?persons.map(({ name }, person)=>{
                return  <BsDot key={person} size={20} className={loginPerson[0].nickname===name?"dot magenta-text":"dot"}/>
          }):<></>}
        </div>
      </div>}
    </>
  )
}
