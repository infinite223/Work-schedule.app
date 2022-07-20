import { motion, HiOutlineChevronDoubleLeft, useNavigate, Admin, Worker, useDispatch, bindActionCreators, MdOutlinePersonAdd, BsPersonBoundingBox } from '../../Helpers/imports'
import { useSelector } from 'react-redux';
import { actionCreators,  State } from '../../state';
import { useState } from 'react'

import { position } from './../../Animations/variants';
import { showMobilePage } from '../../Animations/variantsOnSmallScreen';
import { showPage } from './../../Animations/variants';
import { useMediaQuery } from 'react-responsive'
import { db } from '../../firebase';
import { setDoc, getDoc, getDocs, collection,  doc } from 'firebase/firestore';
import { generateSheduleData, daysInMonth } from '../../Helpers/functions/functions';
import { MessageModal } from '../MessageModal';
import { today, month } from '../../Helpers/constants';
import { useRef } from 'react';
import './CreateSchedule.scss'
import { workerBeforSign } from '../../Helpers/types';
import LoadingStatus from './../LoadingStatus/index';

export const CreateSchedule = () => {
  const navigate = useNavigate(); 
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' })
  const [ nameGroup, setNameGroup ] = useState("")
  const persons = useSelector((state: State)=> state.person)
  const [workers, setWorkers] = useState<Array<{id:number, email:string, nickname:string}>>([{id:1, email:"", nickname:""}])
  const  person :any = persons;
  const dispatch = useDispatch();

  const [nicknameAdmin, setNicknameAdmin] = useState("")
  const [emailAdmin, setEmailAdmin] = useState("")

  const { addPerson } = bindActionCreators(actionCreators, dispatch)
  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState({descripstion:"", status:false})
  const [validateWorkers, setValidateWorkers] = useState(false)
  const emailRef = useRef<HTMLInputElement | null>(null)
  const passwordRef = useRef<HTMLInputElement | null>(null)
  const [error, setError] = useState("")

  const [loading, setLoading] = useState(false)

  async function createSchedule () {
    
  }

  return (
    <>
        {loading&&<LoadingStatus/> }
         <HiOutlineChevronDoubleLeft className='icon-exit'  onClick={()=>navigate("/")}/>
         <motion.div variants={showPage} initial="hidden" animate="visible" className='LoginPage flex'>  
         <form className='flex'  onSubmit={createSchedule}>   
           <div className='Login__content flex'>
              <h1>Create schedule</h1>
              <p>
                First, create your administrator account
              </p>
             <input type="email" placeholder='E-mail' ref={emailRef} required/>
             <input type="password" placeholder='Password' ref={passwordRef} required/>
             <div className='error__message'>{error}</div>
           </div>  
           <button type="submit" className='login button'>next</button>
          </form>  
         </motion.div>
    </>
  )
}
