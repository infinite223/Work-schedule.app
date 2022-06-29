import { CountHours } from '../../Helpers/functions/functions';
import { MdOutlinePerson } from 'react-icons/md'
import { useEffect, useState } from 'react';
import './WorkerListStyle.scss'
import { db } from './../../firebase/index';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

export const WorkerList = () => {
 const [workers, setWorkers] = useState<Array<string>>([]);

 const workersCollectionRef = collection(db, "workers");
    
 useEffect(() => {
   const getWorkers = async () => {
    const nicknames = await getDocs(workersCollectionRef)
    nicknames.docs.forEach((Doc) => {
      const nickname = Doc.data()
      setWorkers(nickname.nicknames)
    })
  }
  getWorkers()
 }, []);

  return (
    <div className='SchedulePage__data flex'>
        <div className='group-name'>Prato Verde</div>
        <div className='worker-list'>    

             {workers?.map((nick)=>{
                return (
                    <div key={nick} className='worker flex'>
                        <MdOutlinePerson size={25} className="person-icon"/>
                        <div className='worker-name'>{nick}</div>
                        <div className='worker-hours'>20 h</div>
                    </div>
                )
            })} 
        </div>
    </div>
  )
}
