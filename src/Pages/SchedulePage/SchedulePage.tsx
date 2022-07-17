import { useAnimation, motion } from 'framer-motion';
import { showPage } from '../../Animations/variants';
import { showMobilePage, showSchedule, tap } from '../../Animations/variantsOnSmallScreen';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../state';
import { useSelector, useDispatch } from 'react-redux';
import { SettingsModal } from './../../Components/SettingsModal';
import { State } from '../../state';
import { GiHamburgerMenu } from 'react-icons/gi'
import { auth, db } from '../../firebase';
import './SchedulePage.scss'
import { Day } from '../../Components/Day/Day';
import { DayContent } from '../../Components/DayContent';
import { daysShortcuts, month, today } from '../../Helpers/constants';
import { daysInMonth, firstDayOfMonth, setScheduleFromFirebase, setLoginPersonAndGroupFromFirebase, generateSheduleData } from '../../Helpers/functions/functions';
import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive'
import { WorkerList } from '../../Components/WorkerList';
import { MdOutlinePersonOutline, MdOutlineArrowBackIosNew, MdKeyboardArrowDown } from 'react-icons/md'
import { BiPlus, BiMinus} from 'react-icons/bi'
import { MenuModal } from '../../Components/MenuModal';
import { workerAfterSign } from '../../Helpers/types';
import LoadingStatus from '../../Components/LoadingStatus';
import {
  collection,
  getDocs,
  updateDoc,
  doc
} from "firebase/firestore";
import { IGroupType } from '../../Helpers/interfaces';
import { useNavigate } from 'react-router-dom';
import { MessageModal } from '../../Components/MessageModal';

export const SchedulePage = () => {  
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' })

    const [showMenu, setShowMenu] = useState(false);
    const [selectDate, setSelectDate] = useState(new Date())
    const [showSettings, setShowSettings] = useState(false)
    const [theme, setTheme] = useState<Array<number>>([12, 32, 120])
    const [schowSchedule, setShowSchedule] = useState(true)
    const [chooseHours, setChooseHours] = useState<boolean>(false)
    const [nameGroup, setNameGroup] = useState("")
    const [loading, setLoading] = useState(false)
    const [showMessage, setShowMessage] = useState(false)

    const schedule = useSelector((state: State)=> state.schedule)
    const loginPerson = useSelector((state: State)=> state.login)
    const selectedDay = useSelector((state: State)=> state.select)
    const group:IGroupType = useSelector((state: State)=> state.group)

    const dispatch = useDispatch();
    
    const navigate = useNavigate()
    const controlDay = useAnimation()
    const controlSchedule = useAnimation()
    const controlArrow = useAnimation()

    const {setPersonInDay, setSchedule} = bindActionCreators(actionCreators, dispatch)

    useEffect(()=>{
        controlDay.start({
          opacity:[0,1],
          transition: { duration: 2 },
        })
      }, [selectDate])

      useEffect(()=>{
        isTabletOrMobile&&(
            controlSchedule.start({
            height:!schowSchedule?"0px":"auto",
            y:!schowSchedule?-500:0,
            overflow:!schowSchedule?"hidden":"",
            transition: { duration: 1, overflow: schowSchedule?{
                delay:1
            }:{delay:0} },          
            })
        )
        controlArrow.start({
            opacity:[0,1],
            transition: {duration:2}         
        })    
      }, [schowSchedule])

    useEffect(()=>{  
        document.body.style.overflow = "hidden";
        const setScheduleData = async () => {
            setLoading(true)
            await auth.onAuthStateChanged( async (user) => {
                if (user) {
                    const groupsRef = collection(db, "groups");  
       
                    const workersData = await getDocs(groupsRef)
                    let foundWorker;  
                
                    await workersData.docs.forEach((doc)=>{
                      foundWorker = doc.data().workers.find((worker:workerAfterSign)=> worker.UID === user.uid)
                      foundWorker&&(setNameGroup(doc.data().nameGroup))
                    })
                     setLoginPersonAndGroupFromFirebase(dispatch, user.uid).then(()=>setLoading(false))
                }
                else{
                    navigate("/")
                } 
            })
        };
       setScheduleData();
    },[])

    const updateSchedule = async () => {
        setLoading(true)
        if(group.nameGroup){
            const scheduleRef = doc(db, "schedule", group.nameGroup);
            await updateDoc(scheduleRef,  {
                [month[today.getMonth()]+today.getFullYear()]:schedule
            } ).then(()=>setLoading(false)).then(()=>setShowMessage(true));
        }
    };
    useEffect(()=>{
        const nextMonth = () => {
            if(selectDate!==new Date()){            
                    const nextSchedule = generateSheduleData(daysInMonth(selectDate))         
                    setSchedule([{id:1,persons:[{name: "string",
                        startWork: "string",
                        endWork: "string"}]}])      
            }    
            else {
                setScheduleFromFirebase(dispatch, nameGroup)
            }      
        }
        nextMonth()
    },[selectDate])


  
    const removePerson = (operation:boolean) : void => {
      if(!operation){
        setPersonInDay({id:selectedDay, persons:[...schedule[selectedDay-1]?.persons.filter(person=> person.name!==loginPerson)]} )
      }
    }
    
  return (
    <> 
        {loading&&<LoadingStatus/> }
        {showMessage&&<MessageModal description='schedule was saved!' setShowMessage={setShowMessage}/>}
        {!isTabletOrMobile?
            <div className='login__person-text flex'>
                <MdOutlinePersonOutline size={20} style={{marginRight:"10px"}}/>
                <div>Log person </div>
                <span>{loginPerson}</span>
                <GiHamburgerMenu className='hover__pointer' size={18} style={{marginLeft:"15px"}} onClick={()=>setShowMenu(true)}/>
            </div>:
           <></>
        }
        {showMenu&&<MenuModal showSettings={showSettings} setShowSettings={setShowSettings} showMenu={showMenu} setShowMenu={setShowMenu} updateSchedule={()=>updateSchedule()}/>}
        {showSettings&&<SettingsModal theme={theme} setTheme={setTheme} setShowSettings={setShowSettings}/>}
        {(showMenu || showSettings)&& <div className='blur-page' onClick={()=>(setShowMenu(false),setShowSettings(false))}/>}
        <motion.div className='SchedulePage'  variants={isTabletOrMobile?showMobilePage:showPage} initial="hidden" animate="visible">         
            <motion.div
             style={isTabletOrMobile?{  background: "linear-gradient(0deg, rgba("+theme+", .5) 66%, rgba("+theme+",.7) 85%, rgba("+theme+", 0.9) 96%)",
             boxShadow: "inset 0px -5px 0px 0px rgb("+theme+")"}:{}}
             className='SchedulePage__main'  initial="hidden">
                <nav>
                    <div className='year'>{selectDate.getFullYear()}</div>                  
                     {isTabletOrMobile&&<motion.div animate={controlArrow}>{!schowSchedule&&<MdKeyboardArrowDown size={30} className="arrow-icon-top" onClick={()=>setShowSchedule(true)}/>}</motion.div>}
                    {!showMenu&&<GiHamburgerMenu size={24} onClick={()=>setShowMenu(true)} className="menu"/>}
                 </nav>
                <motion.div className='flex schedule__content-all' animate={controlSchedule}>
                    <div className='SchedulePage__navbar flex'>
                        <div className='date'>                           
                            <nav className='flex'>
                                <div className='arrow-left' onClick={()=>setSelectDate(new Date(selectDate.getFullYear(), selectDate.getMonth()-1,1))}><MdOutlineArrowBackIosNew size={20}/></div>
                                <div className='month'>{month[selectDate.getMonth()]}</div>                     
                                <div className='arrow-right' onClick={()=>setSelectDate(new Date(selectDate.getFullYear(), selectDate.getMonth()+1, 1))}><MdOutlineArrowBackIosNew size={20}/></div>
                            </nav>
                            {!isTabletOrMobile&&<WorkerList/>}
                        </div>
                    
                    </div>
                    <motion.div animate={controlDay} >
                        <motion.div key="box" animate={controlSchedule}  className='SchedulePage__content flex'>
                            {daysShortcuts.map((day)=>{return <div key={day} className='daysOfTheWeek'>
                                {day.substring(0,2)}
                            </div>})}

                        {firstDayOfMonth(selectDate).map((i)=>{
                            return  <div key={i} className='empty-day'></div>
                        })}
                        
                            {schedule.map((day)=>{
                                return (
                                    <Day key={day.id} id={day.id}  persons={day.persons}/>
                                )
                            })}
                        </motion.div>
                    </motion.div>
                    {isTabletOrMobile&&<motion.div animate={controlArrow}>{showSchedule&&<MdKeyboardArrowDown size={30} className="arrow-icon" onClick={()=>setShowSchedule(false)}/>}</motion.div>}
                </motion.div>
            </motion.div>
            {isTabletOrMobile&&<>
                <div style={{overflowY:"scroll"}}>
                    <DayContent chooseHours={chooseHours}  setChooseHours={setChooseHours}/>
                    <WorkerList/>
                </div>
            </>}
            
            {isTabletOrMobile&&<motion.div whileTap="tap" variants={tap}  className='save__add-button flex' style={{background: "radial-gradient(circle, rgba("+theme+",.7) 36%, rgba("+theme+",.5) 73%)"}}>
                {!schedule[selectedDay-1].persons.find((person)=>person.name===loginPerson)
                ?<BiPlus size={35} color="white" onClick={()=>setChooseHours(true)}/>
                :<BiMinus size={35} color="white" onClick={()=>removePerson(false)}/>}    
            </motion.div> } 
            
        </motion.div>
    </>                                                                                          
  )
}
