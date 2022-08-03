import React, {useEffect, useState} from 'react'
import { db } from '../../firebase';
import { useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { showMenuModal } from '../../Animations/variantsOnSmallScreen';
import { State } from '../../state';
import {
  collection,
  getDocs,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  doc
} from "firebase/firestore";
import { IGroupType } from '../../Helpers/interfaces';
import './MessagePromptStyle.scss'
import { FiX } from 'react-icons/fi'
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../state';
import { useDispatch } from 'react-redux';
interface MessagePromptProps {
    setShowMessagePrompt: (value:boolean) => void,
}

export const MessagePrompt:React.FC<MessagePromptProps> = ({ setShowMessagePrompt }) => {
  const group:IGroupType = useSelector((state: State)=> state.group)
  const loginPerson = useSelector((state: State)=> state.login)
  const [queue, setQueue] = useState<Array<{name:string, email:string}>>([])
  const [showGroups, setShowGroups] = useState<{name:string, email:string, status:boolean}>()
  const dispatch = useDispatch();

  const { setGroup } = bindActionCreators(actionCreators, dispatch)

    const groupWorkPlace = group?.workplace?group.workplace:""
    const workPlaceRefFirebase = doc(db, "groups", groupWorkPlace);  

      useEffect(()=>{
      const getDataGrroup = async () => {
        const groupsRef = collection(db, "groups");       
        const workersData = await getDocs(groupsRef)
        workersData.docs.forEach((doc)=>{
         if(doc.data().workplace===group.workplace){
          setGroup(doc.data())
          setQueue(doc.data().queue)
         }
        })
      }
      if(loginPerson==="Admin"){
        getDataGrroup()
      }
      else {
        setShowMessagePrompt(false)
      }
  }, [queue])
  

  const rejectWorker = async (name:string, email:string) => {
    setQueue(queue.filter((worker) => worker.email!==email))
    await updateDoc(workPlaceRefFirebase, {queue: arrayRemove({name: name, email:email})})
  }

  const acceptWorker = async (name:string, email:string, groupname:string) => {
    await  updateDoc(workPlaceRefFirebase, {workers:arrayUnion({name:name, email:email, group:groupname,theme:[70, 250, 7]})})          
    rejectWorker(name, email)
    const groupsRef = collection(db, "groups");       
    const workersData = await getDocs(groupsRef)

    workersData.docs.map((doc)=>{
        if(doc.data().queue.find((worker:{
            email:string,
            name:string
          })=> worker.email === group.admin?.email)){

            setGroup(doc.data())
        }
    })

    await setShowGroups({name,email, status:false})
  }

  return (
    <AnimatePresence>
        <motion.div className='messagePrompt flex'
                 key="box"
                 variants={showMenuModal}
                 initial="hidden"
                 animate="visible"
                 exit="exit"> 
            <nav>
                <span>{group.workplace}</span>
                <FiX className='exit' size={25} onClick={()=>setShowMessagePrompt(false)}/>
            </nav>
            <h1>People waiting to be added to the group:</h1>
            {queue.length<1&&<div className='worker' style={{textAlign:"left"}}>no persons to display</div>}
            {queue.map(({name, email})=>{
                return (
                    <div className='worker flex' key={email}>   
                        <div className='worker__data'>
                            <div>{name}</div>
                            <div>{email}</div>
                        </div> 
        
                        <div className='options'>
                            <span onClick={()=>(setShowMessagePrompt(true), setShowGroups({name:name, email:email, status:true}))}>Accept person</span>
                            <span className='reject' onClick={()=>rejectWorker(name, email)}>Reject</span>
                        </div>
                    </div>
                )
            })}

            {showGroups?.status&&<div className='groups'>
                <h1>Select group for {showGroups.name} </h1>
                {group.groups?.map((group)=>{
                    return (
                        <div key={group} className='group' onClick={()=>acceptWorker(showGroups.name, showGroups.email, group)}>{group}</div>
                    )
                })}
            </div>}
        </motion.div>
    </AnimatePresence>
  )
}
