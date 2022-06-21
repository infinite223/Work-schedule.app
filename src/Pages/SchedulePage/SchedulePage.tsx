import { useNavigate, HiOutlineChevronDoubleLeft, motion } from '../../Helpers/imports';
import { showPage } from '../../Animations/variants';
import { showMobilePage } from '../../Animations/variantsOnSmallScreen';
import { useSelector } from 'react-redux';
import { State } from '../../state';

import './SchedulePage.scss'
import { useState } from 'react';
import { Day } from '../../Components/Day/Day';
import { DayContent } from '../../Components/DayContent';
import { days, month, today } from '../../Helpers/constants';
import { useMediaQuery } from 'react-responsive'
import { WorkerList } from '../../Components/WorkerList';


export const SchedulePage = () => {

    const navigate = useNavigate(); 
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' })
    const schedule = useSelector((state: State)=> state.schedule)

    const [selectDay, setSelectDay] = useState<number>(0)

  return (
    <>
        <HiOutlineChevronDoubleLeft className='icon-exit'  onClick={()=>navigate("/")}/>
        <div className='right-header'>Save schedule</div>
        <motion.div className='SchedulePage' variants={isTabletOrMobile?showMobilePage:showPage} initial="hidden" animate="visible">
            <div className='SchedulePage__navbar flex'>
                <div className='date'>
                    <div className='year color-magenta'>{today.getFullYear()}</div>
                    <div className='flex'>
                        <div>{days[today.getDay()]}</div>
                        <div>{month[today.getMonth()]}</div>
                    </div>
                    {!isTabletOrMobile&&<WorkerList/>}
                </div>
               
            </div>

            <div className='SchedulePage__content flex'>
               {schedule.map((day)=>{
                   return (
                    <Day key={day.id} id={day.id} date={new Date(`2022-06-${day.id}`)} persons={day.persons} setSelectDay={()=>setSelectDay}/>
                   )
               })}
            </div>
            {isTabletOrMobile&&<>
                <DayContent persons={schedule[selectDay].persons}/>
                <WorkerList/>
            </>}
            
            
        </motion.div>
    </>                                                                                          
  )
}
