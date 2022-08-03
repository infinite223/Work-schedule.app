import { useAnimation, motion } from 'framer-motion';
import { showPage } from '../../Animations/variants';
import { showMobilePage, tap } from '../../Animations/variantsOnSmallScreen';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../state';
import { useSelector, useDispatch } from 'react-redux';
import { SettingsModal } from '../../Components/SettingsModal';
import { State } from '../../state';
import { GiHamburgerMenu } from 'react-icons/gi'
import { auth, db } from '../../firebase';
import './SchedulePageStyle.scss'
import { Day } from '../../Components/Day';
import { DayContent } from '../../Components/DayContent';
import { daysShortcuts, month } from '../../Helpers/constants';
import { firstDayOfMonth, setScheduleFromFirebase } from '../../Helpers/functions/functions';
import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive'
import { WorkerList } from '../../Components/WorkerList';
import { MdOutlinePersonOutline, MdOutlineArrowBackIosNew } from 'react-icons/md'
import { BiPlus, BiMinus} from 'react-icons/bi'
import { MenuModal } from '../../Components/MenuModal';
import { MessagePrompt } from '../../Components/MessagePrompt';
import LoadingStatus from '../../Components/LoadingStatus';
import { useLocation } from 'react-router-dom';
import {
  collection,
  getDocs,
  getDoc,
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
    const [chooseHours, setChooseHours] = useState<boolean>(false)
    const [loading, setLoading] = useState(false)
    const [showMessage, setShowMessage] = useState(false)
    const [showMessagePrompt, setShowMessagePrompt] = useState(false)

    const schedule = useSelector((state: State)=> state.schedule)
    const loginPerson = useSelector((state: State)=> state.login)
    const selectedDay = useSelector((state: State)=> state.select)
    const group:IGroupType = useSelector((state: State)=> state.group)

    const dispatch = useDispatch();
    
    const navigate = useNavigate()
    const controlDay = useAnimation()
    const controlSchedule = useAnimation()

    const {setPersonInDay, setSchedule, setGroup, setLoginPerson, setSelectedDay} = bindActionCreators(actionCreators, dispatch)
    const location = useLocation();
    const {userTheme, email } = location.state as {userTheme:Array<number>, workplace:string, email:string}
    const [theme, setTheme] = useState<Array<number>>(userTheme)
    const [message, setMessage] = useState({descripstion:"", status:false})

    interface Worker {name:string, email:string, group:string}
    const [todayCondition, setTodayCondition] = useState<boolean>()
    useEffect(()=>{
        setTodayCondition(new Date()<=new Date(selectDate.getFullYear(), selectDate.getMonth(), selectedDay+1))
    },[selectDate, selectedDay])

    useEffect(()=>{
        controlDay.start({
          opacity:[0,1],
          transition: { duration: 2 },
        })
      }, [selectDate])

    useEffect(()=>{  
        if(loginPerson==="Admin"){
            setShowMessagePrompt(true)
        }
        const setScheduleData = async () => {
            setLoading(true)
            await auth.onAuthStateChanged( async (user) => {
                if(!loginPerson || !group){
                    if (user) {
                        const groupsRef = collection(db, "groups");            
                        const workersData = await getDocs(groupsRef)
                    
                        await workersData.docs.forEach((doc)=>{                           
                          if(doc.data().workers.find((worker:Worker)=> worker.email === email)){
                            const setData = async  () => {
                               const foudWorker = doc.data().workers.find((worker:Worker)=> worker.email === email)
                               await setScheduleFromFirebase(dispatch, doc.data().workplace)
                               setLoginPerson(foudWorker.name)                             
                               await setGroup(doc.data())                                                 
                            } 
                           setData()     
                         }
                          if(doc.data().admin.email===user.email){
                            const setData = async  () => {
                                await setScheduleFromFirebase(dispatch, doc.data().workplace)
                                setLoginPerson("Admin")                  
                               await setGroup(doc.data())
                               await setShowMessagePrompt(true)                             
                            } 
                           setData()                       
                         }
                      })
                   }
                   else{
                        navigate("/")
                   }
                }
            })
        };
       setScheduleData();
       setLoading(false) 
    },[])

    const updateSchedule = async () => {
        setLoading(true)
        if(group.workplace){
            const scheduleRef = doc(db, "schedule", group.workplace);
            await updateDoc(scheduleRef,  {
                [(new Date(selectDate.getFullYear(), selectDate.getMonth(), 1)).toDateString()]:schedule
            } ).then(()=>setLoading(false)).then(()=>( setMessage({descripstion:"schedule was saved!", status:true}),setShowMessage(true)));
        }
    };

    const nextMonth = async () => {
        if(group.workplace){
            const scheduleRef = doc(db, "schedule", group.workplace);
            const dataSchedule = await getDoc(scheduleRef)
            
            if(dataSchedule?.data()?.[(new Date(selectDate.getFullYear(), selectDate.getMonth()+1, 1)).toDateString()]){
                setSelectedDay(1)
                setSelectDate(new Date(selectDate.getFullYear(), selectDate.getMonth()+1, 1))
                setSchedule(dataSchedule?.data()?.[(new Date(selectDate.getFullYear(), selectDate.getMonth()+1, 1)).toDateString()])
            }
            else {
                setMessage({descripstion:"there is no schedule created for the next month", status:false}); setShowMessage(true); setLoading(false)
            }
        }    
    }

    const earlierMonth = async () => {
        if(group.workplace){
            const scheduleRef = doc(db, "schedule", group.workplace);
            const dataSchedule = await getDoc(scheduleRef)
            
            if(dataSchedule?.data()?.[(new Date(selectDate.getFullYear(), selectDate.getMonth()-1, 1)).toDateString()]){
                setSelectedDay(1)
                setSelectDate(new Date(selectDate.getFullYear(), selectDate.getMonth()-1, 1))
                setSchedule(dataSchedule?.data()?.[(new Date(selectDate.getFullYear(), selectDate.getMonth()-1, 1)).toDateString()])
            }
            else {
                setMessage({descripstion:"there is no schedule created for the next month", status:false}); setShowMessage(true); setLoading(false)
            }
        }    
    } 
  
    const removePerson = (operation:boolean) : void => {
      if(!operation){
        setPersonInDay({id:selectedDay, persons:[...schedule[selectedDay-1]?.persons.filter(person=> person.name!==loginPerson)]} )
      }
    }
    
  return (
    <> 
        {showMessagePrompt&&<MessagePrompt setShowMessagePrompt={setShowMessagePrompt}/>}
        {loading&&<LoadingStatus/> }
        {showMessage&&<MessageModal description={message.descripstion} status={message.status} setShowMessage={setShowMessage}/>}
        {!isTabletOrMobile&&
            <div className='login__person-text flex'>
                <MdOutlinePersonOutline size={20} style={{marginRight:"10px"}}/>
                <div>Log person </div>
                <span>{loginPerson}</span>
                <GiHamburgerMenu className='hover__pointer' size={18} style={{marginLeft:"15px"}} onClick={()=>setShowMenu(true)}/>
            </div>    
        }
        {showMenu&&<MenuModal theme={theme} showSettings={showSettings} setShowSettings={setShowSettings} showMenu={showMenu} setShowMenu={setShowMenu} updateSchedule={()=>updateSchedule()}/>}
        {showSettings&&<SettingsModal selectedDate={selectDate} theme={theme} setTheme={setTheme} setShowSettings={setShowSettings}/>}
        {(showMenu || showSettings || showMessagePrompt)&& <div className='blur-page' onClick={()=>(setShowMenu(false),setShowSettings(false), setShowMessagePrompt(false))}/>}
        <motion.div className='SchedulePage'  variants={isTabletOrMobile?showMobilePage:showPage} initial="hidden" animate="visible">         
            <motion.div
             style={isTabletOrMobile?{  background: "linear-gradient(0deg, rgba("+theme+", .5) 66%, rgba("+theme+",.7) 85%, rgba("+theme+", 0.9) 96%)",
             boxShadow: "inset 0px -5px 0px 0px rgb("+theme+")"}:{}}
             className='SchedulePage__main'  initial="hidden">
                {isTabletOrMobile&&<nav className='main-nav'>
                    <div className='year'>{selectDate.getFullYear()}</div>               
                    {!showMenu&&<GiHamburgerMenu style={{right:"15px"}} size={24} onClick={()=>setShowMenu(true)} className="menu"/>}
                 </nav>}
                <motion.div className='flex schedule__content-all' animate={controlSchedule}>
                    <div className='SchedulePage__navbar flex'>                        
                        <div className='date'>   
                            {!isTabletOrMobile&&<div className='year'>{selectDate.getFullYear()}</div> }                           
                            <nav className='flex'>
                                <div className='arrow-left' onClick={()=>earlierMonth()}><MdOutlineArrowBackIosNew size={18}/></div>
                                <div className='month'>{month[selectDate.getMonth()]}</div>                     
                                <div className='arrow-right' onClick={()=>nextMonth()}><MdOutlineArrowBackIosNew size={18}/></div>
                            </nav>
                            {!isTabletOrMobile&&<WorkerList/>}
                        </div>
                    
                    </div>
                    <motion.div animate={controlDay} className="schedule">
                        <motion.div key="box" animate={controlSchedule}  className='SchedulePage__content flex'>
                            {daysShortcuts.map((day)=>{return <div key={day} className='daysOfTheWeek'>
                                {day.substring(0,2)}
                            </div>})}

                        {firstDayOfMonth(selectDate).map((i)=>{
                            return  <div key={i} className='empty-day'></div>
                        })}
                        
                            {schedule.map((day)=>{
                                return (
                                    <Day  selectedDate={selectDate} key={day.id} id={day.id}  persons={day.persons}/>
                                )
                            })}
                        </motion.div>
                    </motion.div>
                </motion.div>
            </motion.div>
            {isTabletOrMobile&&<>
                    <DayContent theme={theme} chooseHours={chooseHours}  setChooseHours={setChooseHours}/>
                    <WorkerList/>
            </>}
            {todayCondition&& loginPerson!=="Admin" &&
            isTabletOrMobile&&<motion.div whileTap="tap" variants={tap}  className='save__add-button flex' style={{background: "radial-gradient(circle, rgba("+theme+",.7) 36%, rgba("+theme+",.5) 73%)"}}>
                {!schedule[selectedDay-1].persons.find((person)=>person.name===loginPerson)
                ?<BiPlus size={35} color="white" onClick={()=>setChooseHours(true)}/>
                :<BiMinus size={35} color="white" onClick={()=>removePerson(false)}/>}    
            </motion.div> } 
            
        </motion.div>
    </>                                                                                          
  )
}
