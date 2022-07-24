import { useNavigate, HiOutlineChevronDoubleLeft, motion } from '../../Helpers/imports';
import { showPage } from '../../Animations/variants';
import { useRef, useState, useEffect } from 'react';
import { auth  } from "../../firebase"
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import { MessageModal } from '../../Components/MessageModal';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { today, month } from '../../Helpers/constants';
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  setDoc,
  updateDoc,
  arrayUnion
} from "firebase/firestore";
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../state';
import { useDispatch, useSelector } from 'react-redux';
import { setScheduleFromFirebase, setLoginPersonAndGroupFromFirebase } from '../../Helpers/functions/functions';
import { workerAfterSign, workerBeforSign } from '../../Helpers/types';
import LoadingStatus from '../../Components/LoadingStatus';

import './RegisterPageStyle.scss'

export const RegisterPage = () => {
  const navigate = useNavigate(); 
  const emailRef = useRef<HTMLInputElement | null>(null)
  const passwordRef = useRef<HTMLInputElement | null>(null)
  const repeatPasswordRef = useRef<HTMLInputElement | null>(null)
  const workPlaceRef = useRef<HTMLInputElement | null>(null)
  const nameRef = useRef<HTMLInputElement | null>(null)
  const [error, setError] = useState("")
  const dispatch = useDispatch();
  const {  setLoginPerson, setGroup } = bindActionCreators(actionCreators, dispatch)
  const [loading, setLoading] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState({descripstion:"", status:false})

  useEffect(()=>{
    console.log(loading)
  },[loading])

  async function register(e:any) {
    e.preventDefault()
    setLoading(true)
    const workplace = workPlaceRef.current?.value.toString();
    const email = emailRef.current?.value.toString();
    const name = nameRef.current?.value.toString();      
    const password = passwordRef.current?.value.toString();
    const repeatPassword = repeatPasswordRef.current?.value.toString();   
    if(workplace && name){
       const foundWorkPlace = await getDoc(doc(db, "groups", workplace))  
       if(!foundWorkPlace.data()){
        setMessage({descripstion: "A group with that name does not exist", status:false}); setShowMessage(true)
       }
       else {
          if(name.length>=3){
            if(password===repeatPassword){
              if(email && password){
                const workPlaceRefFirebase = doc(db, "groups", workplace);
                createUserWithEmailAndPassword(auth, email, password).then(()=>                 
                    updateDoc(workPlaceRefFirebase, {queue: arrayUnion({name:name, email:email})}).then(()=>{
                      setMessage({descripstion:"The account has been successfully created", status:true}); setShowMessage(true); setLoading(false)
                    })                   
                  ).catch(()=> {
                    setMessage({descripstion:"Something went wrong, please try again later", status:true}); setShowMessage(true); setLoading(false)
                  })              
              }
            }
            else {
              setMessage({descripstion:"passwords are not the same", status:false}); setShowMessage(true); setLoading(false)
            }
          }
          else {
            setMessage({descripstion: "The name is too short", status:false}); setShowMessage(true)
          }
       }
    }  
    setLoading(false)   
  }

  return (
    <div>
       {showMessage&&<MessageModal setShowMessage={setShowMessage}  description={message.descripstion} status={message.status} setMessage={setMessage}/>}
        {loading&&<LoadingStatus/> }
         <HiOutlineChevronDoubleLeft className='icon-exit'  onClick={()=>navigate("/")}/>
         <motion.div variants={showPage} initial="hidden" animate="visible" className='LoginPage flex'>  
         <form className='flex'  onSubmit={register}>   
           <div className='Register__content flex'>
            <h1>Register</h1>
            <p>Here you can register to an existing group</p>
             <input type="text" placeholder='Name' ref={nameRef} required/>
             <input type="email" placeholder='E-mail' ref={emailRef} required/>
             <input type="password" placeholder='Password' ref={passwordRef} required/>
             <input type="password" placeholder='Repeat password' ref={repeatPasswordRef} required/>
             <input type="text" placeholder='Workplace name' ref={workPlaceRef} required/>
             <div className='error__message'>{error}</div>
           </div>  
           <button type="submit" className='login button'>Register</button>
          </form>  
         </motion.div>
    </div>
  )
}
