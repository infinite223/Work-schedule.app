import { CountHours } from '../../Helpers/functions/functions';
import { MdOutlinePerson } from 'react-icons/md'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './WorkerListStyle.scss'
import { db } from './../../firebase/index';
import { auth } from './../../firebase/index';
import { IGroupType } from '../../Helpers/interfaces';
import { setLoginPersonAndGroupFromFirebase } from '../../Helpers/functions/functions';

import { useSelector } from 'react-redux';
import { State } from '../../state';
import {
  collection,
  getDocs,
} from "firebase/firestore";

export const WorkerList = () => {
 const loginPerson = useSelector((state: State)=> state.login)
 const schedule = useSelector((state: State)=> state.schedule)
 const group:IGroupType = useSelector((state: State)=> state.group)
 const navigate = useNavigate(); 

 const checkLoginPerson = async () => {
  await auth.onAuthStateChanged( async (user) => {
    if (!user) {
       navigate("/")
    }
  });
}   

  return (
    <div className='SchedulePage__data flex'>
        <div className='group-name'>{group.nameGroup}</div>
        <div className='worker-list'>    

             {group?.workers?.map(({ nickname },i)=>{
                return (
                    <div key={nickname} style={nickname===loginPerson?{color:"white"}:{}} className='worker flex'>
                        <MdOutlinePerson size={25} className="person-icon"/>
                        <div className='worker-name'>{nickname}</div>
                        <div className='worker-hours'>{CountHours(nickname, schedule)}h</div>
                    </div>
                )
            })} 
        </div>
    </div>
  )
}
