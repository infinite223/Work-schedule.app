import React, { useState } from 'react'
import './SettingsModalStyle.scss'
import { AnimatePresence, motion } from 'framer-motion';
import { showMenuModal } from '../../Animations/variantsOnSmallScreen';
import { daysInMonth, generateSheduleData } from '../../Helpers/functions/functions';
import { FiX } from 'react-icons/fi' 
import { useSelector } from 'react-redux';
import { MessageModal } from '../MessageModal';
import { State } from '../../state';
import { IGroupType } from '../../Helpers/interfaces';
import { MessagePrompt } from '../../Components/MessagePrompt';
import { month } from '../../Helpers/constants';
import { db } from '../../firebase';
import {
  updateDoc,
  doc,
  getDoc,
  arrayRemove,
  arrayUnion
} from "firebase/firestore";

interface SettingsModalProps {
  theme:Array<number>,
  setTheme: (value:Array<number>) => void,
  setShowSettings: (value:boolean) => void, 
  selectedDate:Date
}

export const SettingsModal:React.FC<SettingsModalProps> = ({ theme, setTheme, setShowSettings, selectedDate }) => {
  const [showMessagePrompt, setShowMessagePrompt] = useState(false)
  const loginPerson = useSelector((state: State)=> state.login)
  const group:IGroupType = useSelector((state: State)=> state.group)
  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState({descripstion:"", status:false})

  const generate = async () => {
      if(group.workplace){
          const scheduleRef = doc(db, "schedule", group.workplace);
          await updateDoc(scheduleRef,  {
              [(new Date(selectedDate.getFullYear(), selectedDate.getMonth()+1, 1)).toDateString()]:generateSheduleData(daysInMonth(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1)))
          } ).then(()=>((setMessage({descripstion:"schedule for next month was created!", status:true}),setShowMessage(true))));
      }
  }

  const saveTheme = async () => {
    if(loginPerson==="Admin"){
      setMessage({descripstion:"Administrator write is not supported", status:true}); 
      setShowMessage(true)
    }
    else {      
        if(group.workplace){
          const groupRef = doc(db, "groups", group.workplace);
          const dataGroup = await getDoc(groupRef)
          const foundPerson = dataGroup.data()?.workers.find((worker:{name:string, email:string, group:string, theme:Array<number>})=>worker.name===loginPerson)
          if(foundPerson){
            const newPerson = {
              email: foundPerson?.email,
              group: foundPerson?.group,
              name: foundPerson?.name,
              theme: theme,
            }

            await updateDoc(groupRef, {
              workers:arrayRemove(foundPerson)
            }).then(async ()=>{
              await updateDoc(groupRef, {
                workers:arrayUnion(newPerson)
              }).then(()=>((setMessage({descripstion:"Theme was saved!", status:true}),setShowMessage(true))));
            })
          }
        }
    }
  }

  return (
    <AnimatePresence>
      {showMessage&&<MessageModal description={message.descripstion} status={message.status} setShowMessage={setShowMessage}/>}
      {showMessagePrompt&&<MessagePrompt setShowMessagePrompt={setShowMessagePrompt}/>}
        <motion.div className='Settings__container'
         key="box"
         variants={showMenuModal}
         initial="hidden"
         animate="visible"
         exit="exit">
          <nav>
            <div>Settings</div>
            <FiX className='exit-icon' size={25} onClick={()=>setShowSettings(false)}/>
          </nav>
            <div className='option flex'>
              <span>  Set your theme schedule 
                <div className='save flex' onClick={()=>saveTheme()}>Save theme</div>
              </span>
              <div className='themes flex'>
                <div className='theme-box' style={{backgroundColor:"rgb(19,19,19)"}} onClick={()=>setTheme([19,19,19])}></div>
                <div className='theme-box' style={{backgroundColor:"rgb(255,0,255)"}} onClick={()=>setTheme([255,0,255])}></div>
                <div className='theme-box' style={{backgroundColor:"rgb(70, 200, 57)"}} onClick={()=>setTheme([70,250, 7])}></div>
                <div className='theme-box' style={{backgroundColor:"rgb(22, 42, 145)"}} onClick={()=>setTheme([22, 42, 145])}></div>
                <div className='theme-box' style={{backgroundColor:"rgb(182, 42, 25)"}} onClick={()=>setTheme([182, 42, 25])}></div>
              </div>
            </div>
            <div className='option flex'>
              <span>Set language</span>
              <select name="language" className='select' onClick={()=>{setMessage({descripstion:"The option is, however, not available", status:true}); setShowMessage(true)}}>
                <option className='item' value="english">English</option>
                <option className='item' value="polski">Polski</option>
              </select>
            </div>
            {loginPerson==="Admin"&&<>
              {(group.workers?.length!==0)&&<div className='option flex' style={{flexDirection:"column"}}>
                {group.workers?.map(({name, email, group})=>(
                  <div className='worker' key={email}>
                    <div style={{color:"rgb("+theme+")"}}>{name}</div>
                    <div>{email}</div>
                    <div style={{color:"grey", fontSize:"15px"}}>{group}</div>
                  </div>
                ))}
            </div>}
            <div className='option flex'>
              <span>Waiting persons in queue</span>
              <div className='button-show' onClick={()=>setShowMessagePrompt(true)}>Show</div>
            </div>
            <div className='option flex'>
              <span>Generate schedule for next month </span>
              <div className='button-show' onClick={()=>generate()}>{month[selectedDate.getMonth()+1]}</div>
            </div>
            </>
            }
            
        </motion.div>
    </AnimatePresence>
  )
}
