import { useNavigate, HiOutlineChevronDoubleLeft, motion } from '../../Helpers/imports';
import { showPage } from '../../Animations/variants';
import { showMobilePage } from '../../Animations/variantsOnSmallScreen';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../state';
import { useSelector, useDispatch } from 'react-redux';
import { State } from '../../state';
import { GiHamburgerMenu } from 'react-icons/gi'
import { auth } from '../../firebase';
import './SchedulePage.scss'
import { Day } from '../../Components/Day/Day';
import { DayContent } from '../../Components/DayContent';
import { days, month, today } from '../../Helpers/constants';
import { useMediaQuery } from 'react-responsive'
import { WorkerList } from '../../Components/WorkerList';
import { MdOutlinePersonOutline } from 'react-icons/md'
import { useEffect } from "react";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";


export const SchedulePage = () => {  
    const navigate = useNavigate(); 
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' })
    const schedule = useSelector((state: State)=> state.schedule)
    const loginPerson = useSelector((state: State)=> state.login)
    const dispatch = useDispatch();
    const { setSchedule, setLoginPerson } = bindActionCreators(actionCreators, dispatch)

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
  

  return (
    <>
        <HiOutlineChevronDoubleLeft className='icon-exit'  onClick={()=>navigate("/")}/>
        <motion.div onClick={()=>updateSchedule()} initial={!isTabletOrMobile?{right:"-65px"}:{right:"0"}} whileHover={{right:"0px"}} transition={{duration:.3}} className='right-header flex'>
            {!isTabletOrMobile&&<HiOutlineChevronDoubleLeft size={30} className='icon-save'/>}
            <span>Save</span>
            {isTabletOrMobile&&<HiOutlineChevronDoubleLeft size={30} className='icon-save'/>}
        </motion.div>
        {!isTabletOrMobile&&
            <div className='login__person-text flex'>
                <MdOutlinePersonOutline size={20} style={{marginRight:"10px"}}/>
                <div>Log person </div>
                <span>{loginPerson}</span>
                <GiHamburgerMenu size={18} style={{marginLeft:"15px"}} onClick={()=>(auth.signOut(), navigate("/"))}/>
            </div>  
        }
        <motion.div className='SchedulePage' variants={isTabletOrMobile?showMobilePage:showPage} initial="hidden" animate="visible">
            <div className='SchedulePage__navbar flex'>
                <div className='date'>
                    <div>{days[today.getDay()]}</div>
                    <div className='year color-magenta'>{today.getFullYear()}</div>    
                    <div>{month[today.getMonth()]}</div>
           
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
