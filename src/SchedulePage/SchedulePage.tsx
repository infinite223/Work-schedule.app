import { useNavigate, HiOutlineChevronDoubleLeft } from './../imports';
import { useSelector } from 'react-redux';
import { State } from '../state';

import './SchedulePage.scss'
import { Day } from './SchedulePageComponents/Day/Day';
import { days, month, today } from './constants';

export const SchedulePage = () => {

    const navigate = useNavigate(); 

    const schedule = useSelector((state: State)=> state.schedule)

    const date = new Date();
    console.log(schedule) 
  return (
    <>
        <HiOutlineChevronDoubleLeft className='icon-exit'  onClick={()=>navigate("/")}/>
        <div className='SchedulePage'>
            <div className='SchedulePage__navbar flex'>
                <div className='date'>
                    <div className='year'>{today.getFullYear()}</div>
                    <div className='flex'>
                        <div>{days[today.getDay()]}</div>
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
                    <Day key={day.id} id={day.id} date={date} persons={day.persons}/>
                   )
               })}
            </div>
            
        </div>
    </>                                                                                          
  )
}
