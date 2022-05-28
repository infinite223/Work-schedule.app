import { useNavigate, HiOutlineChevronDoubleLeft, motion } from './../imports';
import { daysInMonth, generateSheduleData } from './functions/functions'

import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators, State } from '../state';

import './SchedulePage.scss'

export const SchedulePage = () => {
    const navigate = useNavigate(); 

    const days = ["Monday", "Tuesday", "Wednesday ", "Thursday", "Friday", "Saturday ", "Sunday"]

    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    const today = new Date();

    const daysInMonthToday = daysInMonth(today.getMonth()+1,2022)
   // const schedule = generateSheduleData(daysInMonthToday)

    const schedule = useSelector((state: State)=> state.schedule)
    const dispatch = useDispatch();
    console.log(schedule)
  
    //const { addPerson } = bindActionCreators(actionCreators, dispatch)
 
  return (
    <>
        <HiOutlineChevronDoubleLeft className='icon-exit'  onClick={()=>navigate("/")}/>
        <div className='SchedulePage'>
            <div className='SchedulePage__navbar flex'>
                <div className='date'>
                    <div className='year'>{today.getFullYear()}</div>
                    <div className='flex'>
                        <div>{days[today.getDay()-1]}</div>
                        <div>{month[today.getMonth()]}</div>
                    </div>
               
                </div>
                <div className='SchedulePage__data flex'>
                    <div className='group-name'>Prato Verde</div>
                    <div className='worker-list flex'>
                        <p>
                            Workers in group
                        </p>
                        <div className='worker flex'>
                            <text className='worker-name'>Dawid</text>
                            <text className='worker-hours'>45h</text>
                        </div>
                        <div className='worker flex'>
                            <text className='worker-name'>Nikola</text>
                            <text className='worker-hours'>40h</text>
                        </div>
                        <div className='worker flex'>
                            <text className='worker-name'>Natalia</text>
                            <text className='worker-hours'>50h</text>
                        </div>
                    </div>
                </div>
            </div>

            <div className='SchedulePage__content flex'>
               {schedule.map((day)=>{
                   return (
                    <div className='SchedulePage__content__day'>
                        <span>{day.id}</span>
                        <text>{day.date.getDay()}</text>
                    </div>
                   )
               })}
            </div>
            
        </div>
    </>                                                                                          
  )
}
