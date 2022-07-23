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

import './RegisterPageStyle.scss'

export const RegisterPage = () => {
  const navigate = useNavigate(); 
  const emailRef = useRef<HTMLInputElement | null>(null)
  const passwordRef = useRef<HTMLInputElement | null>(null)
  const repeatPasswordRef = useRef<HTMLInputElement | null>(null)
  const groupNameRef = useRef<HTMLInputElement | null>(null)
  const [error, setError] = useState("")
  const dispatch = useDispatch();
  const {  setLoginPerson, setGroup } = bindActionCreators(actionCreators, dispatch)
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    console.log(loading)
  },[loading])

  async function register(e:any) {
    e.preventDefault()
  }

  return (
    <div>
        {loading&&<LoadingStatus/> }
         <HiOutlineChevronDoubleLeft className='icon-exit'  onClick={()=>navigate("/")}/>
         <motion.div variants={showPage} initial="hidden" animate="visible" className='LoginPage flex'>  
         <form className='flex'  onSubmit={register}>   
           <div className='Register__content flex'>
            <h1>Register</h1>
            <p>Here you can register to an existing group</p>
             <input type="email" placeholder='E-mail' ref={emailRef} required/>
             <input type="password" placeholder='Password' ref={passwordRef} required/>
             <input type="password" placeholder='Repeat password' ref={repeatPasswordRef} required/>
             <input type="text" placeholder='Group name' ref={groupNameRef} required/>
             <div className='error__message'>{error}</div>
           </div>  
           <button type="submit" className='login button'>Register</button>
          </form>  
         </motion.div>
    </div>
  )
}
