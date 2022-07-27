import { useNavigate, HiOutlineChevronDoubleLeft, motion } from '../../Helpers/imports';
import { showPage } from '../../Animations/variants';
import { useRef, useState, useEffect } from 'react';
import { auth  } from "../../firebase"
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { today, month } from '../../Helpers/constants';
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  setDoc,
  updateDoc
} from "firebase/firestore";
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../state';
import { useDispatch, useSelector } from 'react-redux';
import { setScheduleFromFirebase, setLoginPersonAndGroupFromFirebase } from '../../Helpers/functions/functions';
import { workerAfterSign, workerBeforSign } from '../../Helpers/types';
import LoadingStatus from '../../Components/LoadingStatus';
import { MessageModal } from '../../Components/MessageModal';

import './LoginPageStyle.scss'

interface queue {
  email:string,
  name:string
}

interface Worker {name:string, email:string, workplace:string}

export const LoginPage = () => {
  const navigate = useNavigate(); 
  const emailRef = useRef<HTMLInputElement | null>(null)
  const passwordRef = useRef<HTMLInputElement | null>(null)
  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState({descripstion:"", status:false})
  const dispatch = useDispatch();
  const { setLoginPerson, setGroup } = bindActionCreators(actionCreators, dispatch)
  const [loading, setLoading] = useState(false)
  

  async function login(e:any) {
    e.preventDefault()
    const userEmail =  emailRef.current?.value?emailRef.current?.value.toString():"";
    const userPassword =  passwordRef.current?.value?passwordRef.current?.value.toString():"";
    setLoading(true)
    try {
      await signInWithEmailAndPassword(auth, userEmail, userPassword).then( async ()=>{
         const groupsRef = collection(db, "groups");       
         const workersData = await getDocs(groupsRef)
         let foundWorker, foundGroup:string = "";  

         workersData.docs.forEach((doc)=>{
          if(doc.data().queue.find((worker:queue)=> worker.email === userEmail)){
            foundWorker = doc.data().workers.find((worker:queue)=> worker.email === userEmail);
            setMessage({descripstion:"The administrator has not assigned you to the group", status:false}); setShowMessage(true); setLoading(false)
          }
          if(doc.data().admin.email===userEmail){
            setMessage({descripstion:"Admin", status:true}); setShowMessage(true); setLoading(false)
           
               auth.onAuthStateChanged( async (user) => {
                if (user) {
                  await setScheduleFromFirebase(dispatch, doc.data().workplace)
                  await setLoginPerson("Admin")
                  await setGroup(doc.data())
                  await navigate("/schedule", {state:{email:userEmail, workplace:doc.data().workplace}})        
                }
              }); 
          }
          if(doc.data().workers.find((worker:Worker)=> worker.email === userEmail)){
            const setData = async  () => {
               const foudWorker = doc.data().workers.find((worker:Worker)=> worker.email === userEmail)
               await setScheduleFromFirebase(dispatch, doc.data().workplace)
               setLoginPerson(foudWorker.name)    
               await setGroup(doc.data()) 
               await navigate("/schedule", {state:{email:userEmail, workplace:doc.data().workplace}})                            
            } 
           setData()     
         }
         }) 
      })
    } catch {
        setMessage({descripstion:"Failed to log in", status:false}); setShowMessage(true); setLoading(false)
    }
    setLoading(false)
  }

  return (
    <div>
       {showMessage&&<MessageModal setShowMessage={setShowMessage}  description={message.descripstion} status={message.status} setMessage={setMessage}/>}
        {loading&&<LoadingStatus/> }
         <HiOutlineChevronDoubleLeft className='icon-exit'  onClick={()=>navigate("/")}/>
         <motion.div variants={showPage} initial="hidden" animate="visible" className='LoginPage flex'>  
         <form className='flex'  onSubmit={login}>   
           <div className='Login__content flex'>
              <h1>Log In</h1>
              <p>
                if you don't have an account yet, create one and join the group
              </p>
             <input type="email" placeholder='E-mail' ref={emailRef} required/>
             <input type="password" placeholder='Password' ref={passwordRef} required/>
           </div>  
           <button type="submit" className='login button'>Log In</button>
          </form>  
         </motion.div>
    </div>
  )
}
