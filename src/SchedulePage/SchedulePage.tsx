import { useNavigate, HiOutlineChevronDoubleLeft, motion } from './../imports';
import { showPage } from '../Animations/variants';
import { useSelector } from 'react-redux';
import { State } from '../state';

import './SchedulePage.scss'
import { Day } from '../Components/Day/Day';
import { days, month, today } from '../Helpers/constants';
import { CountHours } from '../Helpers/functions/functions';

export const SchedulePage = () => {

    const navigate = useNavigate(); 

    const schedule = useSelector((state: State)=> state.schedule)

  return (
    <>
        <HiOutlineChevronDoubleLeft className='icon-exit'  onClick={()=>navigate("/")}/>
        <motion.div className='SchedulePage' variants={showPage} initial="hidden" animate="visible">
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
                    <div className='worker-list'>                     
                        <div className='worker flex'>
                            <text className='worker-name'>Dawid</text>
                            <text className='worker-hours'>{CountHours("Dawid")}h</text>
                        </div>
                        <div className='worker flex'>
                            <text className='worker-name'>Nikola</text>
                            <text className='worker-hours'>{CountHours("Nikola")}h</text>
                        </div>
                        <div className='worker flex'>
                            <text className='worker-name'>Natalia</text>
                            <text className='worker-hours'>0h</text>
                        </div>
                    </div>
                </div>
            </div>

            <div className='SchedulePage__content flex'>
               {schedule.map((day)=>{
                   return (
                    <Day key={day.id} id={day.id} date={new Date(`2022-06-${day.id}`)} persons={day.persons}/>
                   )
               })}
            </div>
            
        </motion.div>
    </>                                                                                          
  )
}
