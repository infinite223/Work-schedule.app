import { motion } from '../../Helpers/imports';
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
import { daysShortcuts, month, today } from '../../Helpers/constants';
import { firstDayOfMonth } from '../../Helpers/functions/functions';
import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive'
import { WorkerList } from '../../Components/WorkerList';
import { MdOutlinePersonOutline, MdOutlineArrowBackIosNew } from 'react-icons/md'
import { BiPlus, BiMinus} from 'react-icons/bi'
import { db } from "../../firebase";
import { MenuModal } from '../../Components/MenuModal';
import { setScheduleFromFirebase, setLoginPersonAndGroupFromFirebase } from '../../Helpers/functions/functions';
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  getDoc
} from "firebase/firestore";
import { IGroupType } from '../../Helpers/interfaces';

export const SchedulePage = () => {  
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' })
    const [showMenu, setShowMenu] = useState(false);
    const [showSettings, setShowSettings] = useState(false)
    const [theme, setTheme] = useState<Array<number>>([12, 32, 120])
    const [ chooseHours, setChooseHours ] = useState<boolean>(false)
    const schedule = useSelector((state: State)=> state.schedule)
    const loginPerson = useSelector((state: State)=> state.login)
    const selectedDay = useSelector((state: State)=> state.select)
    const group:IGroupType = useSelector((state: State)=> state.group)
    const dispatch = useDispatch();
    const { setSchedule, setLoginPerson, setPersonInDay } = bindActionCreators(actionCreators, dispatch)
    let groupName = group.nameGroup;
    useEffect(()=>{  
        const setScheduleData = async () => {
            await auth.onAuthStateChanged( async (user) => {
                if (user) {
                    groupName&&setScheduleFromFirebase(dispatch, groupName)
                    setLoginPersonAndGroupFromFirebase(dispatch, user.uid)
                } 
            })
        };
       setScheduleData();
    },[])

    const updateSchedule = async () => {
        if(group.nameGroup){
            const scheduleRef = doc(db, "schedule", group.nameGroup);
            await updateDoc(scheduleRef,  {
                [month[today.getMonth()]+today.getFullYear()]:schedule
            } );
        }
    };
  
    const removePerson = (operation:boolean) : void => {
      if(!operation){
        setPersonInDay({id:selectedDay, persons:[...schedule[selectedDay-1]?.persons.filter(person=> person.name!==loginPerson)]} )
      }
    }
    
  return (
    <>
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
        {showSettings&&<SettingsModal theme={theme} setTheme={setTheme} setShowSettings={setShowSettings}/>}
        {(showMenu || showSettings)&& <div className='blur-page' onClick={()=>(setShowMenu(false),setShowSettings(false))}/>}
        <motion.div className='SchedulePage'  variants={isTabletOrMobile?showMobilePage:showPage} initial="hidden" animate="visible">
            <motion.div
             style={isTabletOrMobile?{  background: "linear-gradient(0deg, rgba("+theme+", .5) 66%, rgba("+theme+",.7) 85%, rgba("+theme+", 0.9) 96%)",
             boxShadow: "inset 0px -5px 0px 0px rgb("+theme+")"}:{}}
             className='SchedulePage__main' variants={showSchedule} initial="hidden" animate="visible">
                <div className='SchedulePage__navbar flex'>
                    <div className='date'>
                        <div className='year'>{today.getFullYear()}</div> 
                        <nav className='flex'>
                            <div className='arrow-left'><MdOutlineArrowBackIosNew size={20}/></div>
                            <div className='month'>{month[today.getMonth()]}</div>                     
                            <div className='arrow-right'><MdOutlineArrowBackIosNew size={20}/></div>
                        </nav>
                        {!isTabletOrMobile&&<WorkerList/>}
                    </div>
                
                </div>

                <div className='SchedulePage__content flex'>
                    {daysShortcuts.map((day)=>{return <div key={day} className='daysOfTheWeek'>
                        {day.substring(0,2)}
                    </div>})}

                   {firstDayOfMonth().map((i)=>{
                    return  <div key={i} className='empty-day'></div>
                   })}
                   
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
            
            {isTabletOrMobile&&<div className='save__add-button flex' style={{backgroundColor:`rgb(${theme})`}}>
                {!schedule[selectedDay-1].persons.find((person)=>person.name===loginPerson)
                ?<BiPlus size={35} color="white" onClick={()=>setChooseHours(true)}/>
                :<BiMinus size={35} color="white" onClick={()=>removePerson(false)}/>}    
            </div> } 
            
        </motion.div>
    </>                                                                                          
  )
}
