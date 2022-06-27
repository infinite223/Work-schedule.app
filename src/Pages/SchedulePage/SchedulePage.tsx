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
import { MdOutlinePersonOutline } from 'react-icons/md'


export const SchedulePage = () => {

    const navigate = useNavigate(); 
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' })
    const schedule = useSelector((state: State)=> state.schedule)
    const loginPerson = useSelector((state: State)=> state.login)

  return (
    <>
        <HiOutlineChevronDoubleLeft className='icon-exit'  onClick={()=>navigate("/")}/>
        <motion.div initial={!isTabletOrMobile?{right:"-65px"}:{right:"0"}} whileHover={{right:"0px"}} transition={{duration:.3}} className='right-header flex'>
            {!isTabletOrMobile&&<HiOutlineChevronDoubleLeft size={30} className='icon-save'/>}
            <span>Save</span>
            {isTabletOrMobile&&<HiOutlineChevronDoubleLeft size={30} className='icon-save'/>}
        </motion.div>
        {!isTabletOrMobile&&<div className='login__person-text flex'>
            <MdOutlinePersonOutline size={20} style={{marginRight:"10px"}}/>
            <div>Log person </div>
            <span>{loginPerson[0].nickname}</span>
        </div>}
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
