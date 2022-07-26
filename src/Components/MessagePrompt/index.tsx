import React, {useEffect, useState} from 'react'
import { auth, db } from '../../firebase';
import { useSelector } from 'react-redux';
import { State } from '../../state';
import {
  collection,
  getDocs,
  updateDoc,
  getDoc,
  arrayUnion,
  arrayRemove,
  doc
} from "firebase/firestore";
import { IGroupType } from '../../Helpers/interfaces';
import './MessagePromptStyle.scss'
import { FiX } from 'react-icons/fi';
interface MessagePromptProps {
    setShowMessagePrompt: (value:boolean) => void,
    email:string,
    workPlace:string
}

export const MessagePrompt:React.FC<MessagePromptProps> = ({ setShowMessagePrompt, email, workPlace }) => {
  const group:IGroupType = useSelector((state: State)=> state.group)
  const groupRef = doc(db, "groups", workPlace);
  const [queue, setQueue] = useState<Array<{name:string, email:string}>>([])
  const [groups, setGroups] = useState<Array<string>>([])
  const [showGroups, setShowGroups] = useState<{name:string, email:string, status:boolean}>()

  useEffect(()=>{
    const getDataGrroup = async () => {
        const dataGroup = await getDoc(groupRef)
        if(dataGroup.data()?.queue){
            setQueue(dataGroup.data()?.queue)
            setGroups(dataGroup.data()?.groups)
        }
        else {
            setShowMessagePrompt(false)
        }
    }
    getDataGrroup()
  }, [queue])

  const workPlaceRefFirebase = doc(db, "groups", workPlace);    

  const rejectWorker = async (name:string, email:string) => {
    setQueue(queue.filter((worker) => worker.email!==email))
    await updateDoc(workPlaceRefFirebase, {queue: arrayRemove({name: name, email:email})})
  }

  const acceptWorker = async (name:string, email:string, groupname:string) => {
    await  updateDoc(workPlaceRefFirebase, {workers:arrayUnion({name:name, email:email, group:groupname})})          
    //rejectWorker(name, email)
    await setShowGroups({name,email, status:false})
    setShowMessagePrompt(true)

    // musze wyszukać istniejące grupyy
  }

  return (
    <div className='messagePrompt flex'> 
        <nav>
            <span>{workPlace}</span>
        </nav>
        <h1>People waiting to be added to the group:</h1>
        {queue.map(({name, email})=>{
            return (
                <div className='worker flex' key={email}>   
                    <div className='worker__data'>
                        <div>{name}</div>
                        <div>{email}</div>
                    </div> 
    
                    <div className='options'>
                        <span onClick={()=>(setShowMessagePrompt(false), setShowGroups({name:name, email:email, status:true}))}>Accept person</span>
                        <FiX className='reject' size={25} onClick={()=>rejectWorker(name, email)}/>
                    </div>
                </div>
            )
        })}

        {showGroups?.status&&<div className='groups'>
            <h1>Select group for {showGroups.name} </h1>
            {groups.map((group)=>{
                return (
                    <div key={group} className='group' onClick={()=>acceptWorker(showGroups.name, showGroups.email, group)}>{group}</div>
                )
            })}
        </div>}
    </div>
  )
}
