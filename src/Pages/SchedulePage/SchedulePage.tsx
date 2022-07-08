import { useNavigate, HiOutlineChevronDoubleLeft, motion } from '../../Helpers/imports';
import { showPage } from '../../Animations/variants';
import { showMobilePage, showSchedule } from '../../Animations/variantsOnSmallScreen';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../state';
import { useSelector, useDispatch } from 'react-redux';
import { SettingsModal } from './../../Components/SettingsModal';
import { State } from '../../state';
import { GiHamburgerMenu } from 'react-icons/gi'
import { auth } from '../../firebase';
import './SchedulePage.scss'
import { Day } from '../../Components/Day/Day';
import { DayContent } from '../../Components/DayContent';
import { days, month, today } from '../../Helpers/constants';
import { useState } from 'react';
import { useMediaQuery } from 'react-responsive'
import { WorkerList } from '../../Components/WorkerList';
import { MdOutlinePersonOutline } from 'react-icons/md'
import { FiPlusSquare, FiMinusSquare } from 'react-icons/fi'
import { BiPlus, BiMinus} from 'react-icons/bi'
import { useEffect } from "react";
import { db } from "../../firebase";
import { MenuModal } from '../../Components/MenuModal';
import {
  collection,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";


export const SchedulePage = () => {  
    const navigate = useNavigate(); 
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' })
    const [showMenu, setShowMenu] = useState(false);
    const [showSettings, setShowSettings] = useState(false)
    const [ chooseHours, setChooseHours ] = useState<boolean>(false)
    const schedule = useSelector((state: State)=> state.schedule)
    const loginPerson = useSelector((state: State)=> state.login)
    const selectedDay = useSelector((state: State)=> state.select)
    const dispatch = useDispatch();
    const { setSchedule, setLoginPerson, setPersonInDay } = bindActionCreators(actionCreators, dispatch)

    useEffect(()=>{
        const scheduleCollectionRef = collection(db, "schedule");    
        const setScheduleData = async () => {
            await auth.onAuthStateChanged( async (user) => {
                if (user) {
                  const personsCollectionRef = collection(db, "persons");   
                  const persons = await getDocs(personsCollectionRef)
                  const loginPerson = persons.docs.find((doc) => (doc.id===user.uid))                 
                  setLoginPerson(loginPerson?.data().nickname)

                  const days = await getDocs(scheduleCollectionRef)
                  setSchedule((days.docs.map((doc) => (doc.data().schedule)))[0])
                } 
            })
        };
       setScheduleData();
    },[])

    const updateSchedule = async () => {
        const scheduleRef = doc(db, "schedule", "1");

        await updateDoc(scheduleRef, { schedule });
    };
  
    const removePerson = (operation:boolean) : void => {
      if(!operation){
        setPersonInDay({id:selectedDay, persons:[...schedule[selectedDay-1]?.persons.filter(person=> person.name!==loginPerson)]} )
      }
    }

  return (
    <>
        {/* <HiOutlineChevronDoubleLeft className='icon-exit'  onClick={()=>navigate("/")}/> */}
        {/* <motion.div onClick={()=>updateSchedule()} initial={!isTabletOrMobile?{right:"-65px"}:{right:"0"}} whileHover={{right:"0px"}} transition={{duration:.3}} className='right-header flex'>
            {!isTabletOrMobile&&<HiOutlineChevronDoubleLeft size={30} className='icon-save'/>}
            <span>Save</span>
            {isTabletOrMobile&&<HiOutlineChevronDoubleLeft size={30} className='icon-save'/>}
        </motion.div> */}
        {!isTabletOrMobile?
            <div className='login__person-text flex'>
                <MdOutlinePersonOutline size={20} style={{marginRight:"10px"}}/>
                <div>Log person </div>
                <span>{loginPerson}</span>
                <GiHamburgerMenu className='hover__pointer' size={18} style={{marginLeft:"15px"}} onClick={()=>setShowMenu(true)}/>
            </div>:
            !showMenu&&<GiHamburgerMenu size={24} onClick={()=>setShowMenu(true)} className="menu"/>
        }
        {showMenu&&<MenuModal  showSettings={showSettings} setShowSettings={setShowSettings} showMenu={showMenu} setShowMenu={setShowMenu} updateSchedule={()=>updateSchedule()}/>}
        {showSettings&&<SettingsModal/>}
        {(showMenu || showSettings)&& <div className='blur-page' onClick={()=>(setShowMenu(false),setShowSettings(false))}/>}
        <motion.div className='SchedulePage' variants={isTabletOrMobile?showMobilePage:showPage} initial="hidden" animate="visible">
            <motion.div className='SchedulePage__main' variants={showSchedule} initial="hidden" animate="visible">
                <div className='SchedulePage__navbar flex'>
                    <div className='date'>
                        <div className='year'>{today.getFullYear()}</div>    
                        <div className='month'>{month[today.getMonth()]}</div>
            
                        {!isTabletOrMobile&&<WorkerList/>}
                    </div>
                
                </div>

                <div className='SchedulePage__content flex'>
                    {days.map((day)=>{return <div key={day} className='daysOfTheWeek'>
                        {day.substring(0,2)}
                    </div>})}
                    {schedule.map((day)=>{
                        return (
                            <Day key={day.id} id={day.id}  persons={day.persons}/>
                        )
                    })}
                </div>
            </motion.div>
            {isTabletOrMobile&&<>
                <DayContent chooseHours={chooseHours}  setChooseHours={setChooseHours}/>
                <WorkerList/>
            </>}
            
            {isTabletOrMobile&&<div className='save__add-button flex'>
                {!schedule[selectedDay-1].persons.find((person)=>person.name===loginPerson)
                ?<BiPlus size={35} color="white" onClick={()=>setChooseHours(true)}/>
                :<BiMinus size={35} color="white" onClick={()=>removePerson(false)}/>}    
            </div> } 
            
        </motion.div>
    </>                                                                                          
  )
}
