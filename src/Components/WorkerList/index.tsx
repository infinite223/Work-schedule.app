import { CountHours } from '../../Helpers/functions/functions';
import { MdOutlinePerson } from 'react-icons/md'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './WorkerListStyle.scss'
import { db } from './../../firebase/index';
import { auth } from './../../firebase/index';

import { useSelector } from 'react-redux';
import { State } from '../../state';
import {
  collection,
  getDocs,
} from "firebase/firestore";

export const WorkerList = () => {
 const [workers, setWorkers] = useState<Array<string>>([]);
 const loginPerson = useSelector((state: State)=> state.login)
 const schedule = useSelector((state: State)=> state.schedule)
 const navigate = useNavigate(); 

 const checkLoginPerson = async () => {
  await auth.onAuthStateChanged( async (user) => {
    if (!user) {
       navigate("/")
    }
  });
}   

checkLoginPerson()

 useEffect(() => {
  const workersCollectionRef = collection(db, "workers");

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

             {workers?.map((nick,i)=>{
                return (
                    <div key={nick} style={nick===loginPerson?{color:"white"}:{}} className='worker flex'>
                        <MdOutlinePerson size={25} className="person-icon"/>
                        <div className='worker-name'>{nick}</div>
                        <div className='worker-hours'>{CountHours(nick, schedule)}h</div>
                    </div>
                )
            })} 
        </div>
    </div>
  )
}
