import { useNavigate, HiOutlineChevronDoubleLeft, motion } from './../imports';
import { daysInMonth, generateSheduleData } from './functions/functions'

import './SchedulePage.scss'

export const SchedulePage = () => {
    const navigate = useNavigate(); 

    const days = ["Monday", "Tuesday", "Wednesday ", "Thursday", "Friday", "Saturday ", "Sunday"]

    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    const today = new Date();

    const daysInMonthToday = daysInMonth(today.getMonth()+1,2022)
    const schedule = generateSheduleData(daysInMonthToday)
 
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
                    <div className='worker-list'>
                        <p>
                            Workers 
                        </p>
                        Dawid<br />
                        Nikola<br />
                        Norbi<br />
                        xD<br />
                    </div>
                </div>
            </div>

            <div className='SchedulePage__content flex'>
               {schedule.map((day)=>{
                   return (
                    <div className='SchedulePage__content__day'>
                        <span>{day.id}</span>
                       
                    </div>
                   )
               })}
            </div>
            
        </div>
    </>                                                                                          
  )
}
