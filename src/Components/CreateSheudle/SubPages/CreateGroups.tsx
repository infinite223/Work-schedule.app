import React, {useState, useRef} from 'react'

import { showPage } from '../../../Animations/variants';
import { MessageModal } from '../../MessageModal';
import { HiOutlineChevronDoubleLeft, useNavigate, motion } from '../../../Helpers/imports';
import { useLocation } from 'react-router-dom';

export const CreateGroups = () => {
    const emailRef = useRef<HTMLInputElement | null>(null)
    const passwordRef = useRef<HTMLInputElement | null>(null)
    const repeatPasswordRef = useRef<HTMLInputElement | null>(null)

    const [showMessage, setShowMessage] = useState(false)
    const [message, setMessage] = useState({descripstion:"", status:false})
  
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate(); 
    const location = useLocation();
    console.log(location.state)

    function createSchedule (event:any) {
        event.preventDefault();
        const userPassword =  passwordRef.current?.value?passwordRef.current?.value.toString():"";
        const userRepeatPassword =  repeatPasswordRef.current?.value?repeatPasswordRef.current?.value.toString():"";
    
        if(userPassword===userRepeatPassword){
          setMessage({descripstion:"zajebioza", status:true}); setShowMessage(true)
        }
        else {
          setMessage({descripstion:"passwords are not the same", status:false}); setShowMessage(true)
        }
    }

  return (<>
    {showMessage&&<MessageModal setShowMessage={setShowMessage}  description={message.descripstion} status={message.status} setMessage={setMessage}/>}
        <HiOutlineChevronDoubleLeft className='icon-exit'  onClick={()=>navigate("/")}/>
        <motion.div variants={showPage} initial="hidden" animate="visible" className='CreatePage flex'>  
        <form className='flex' style={{marginBottom:"20px"}} onSubmit={(e)=>createSchedule(e)}>   
        <div className='Login__content flex'>
            <h1>Create schedule</h1>
            <p>
              Set your groups name
            </p>
            <input type="email" placeholder='E-mail' ref={emailRef} required/>
            <input type="password" placeholder='Password' ref={passwordRef} required/>
            <input type="password" placeholder='Repeat password' ref={repeatPasswordRef} required/>
        </div>  
        <button type="submit" className='login button'>Create groups</button>
        </form>  
        </motion.div>
    </>
  )
}
