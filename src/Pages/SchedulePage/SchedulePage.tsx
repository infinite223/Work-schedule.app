import { useNavigate, HiOutlineChevronDoubleLeft, motion } from '../../Helpers/imports';
import { showPage } from '../../Animations/variants';
import { showMobilePage } from '../../Animations/variantsOnSmallScreen';
import { useSelector } from 'react-redux';
import { State } from '../../state';

import './SchedulePage.scss'
import { Day } from '../../Components/Day/Day';
import { DayContent } from '../../Components/DayContent';
import { days, month, today } from '../../Helpers/constants';
import { useMediaQuery } from 'react-responsive'
import { WorkerList } from '../../Components/WorkerList';


export const SchedulePage = () => {

    const navigate = useNavigate(); 
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' })
    const schedule = useSelector((state: State)=> state.schedule)

  return (
    <>
        <HiOutlineChevronDoubleLeft className='icon-exit'  onClick={()=>navigate("/")}/>
        <motion.div initial={{right:"-145px"}} whileHover={{right:"0px"}} transition={{duration:1}} className='right-header flex'>
            <HiOutlineChevronDoubleLeft size={30} className='icon-save'/>
            <span>Save schedule</span>
        </motion.div>
        <motion.div className='SchedulePage' variants={isTabletOrMobile?showMobilePage:showPage} initial="hidden" animate="visible">
            <div className='SchedulePage__navbar flex'>
                <div className='date'>
                    <div>{days[today.getDay()]}</div>
                    <div className='year color-magenta'>{today.getFullYear()}</div>    
                    <div className='margin-botton'>{month[today.getMonth()]}</div>
           
                    {!isTabletOrMobile&&<WorkerList/>}
                </div>
               
            </div>

            <div className='SchedulePage__content flex'>
               {schedule.map((day)=>{
                   return (
                    <Day key={day.id} id={day.id} date={new Date(`2022-06-${day.id}`)} persons={day.persons}/>
                   )
               })}
            </div>
            {isTabletOrMobile&&<>
                <DayContent/>
                <WorkerList/>
            </>}
            
            
        </motion.div>
    </>                                                                                          
  )
}
