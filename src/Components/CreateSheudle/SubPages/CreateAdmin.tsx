import  {useState, useRef} from 'react'
import './../CreateScheduleStyle.scss'
import { showPage } from '../../../Animations/variants';
import { MessageModal } from '../../MessageModal';
import { HiOutlineChevronDoubleLeft, useNavigate, motion } from '../../../Helpers/imports';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './../../../firebase/index';
import LoadingStatus from './../../LoadingStatus/index';

export const CreateAdmin = () => {
    const emailRef = useRef<HTMLInputElement | null>(null)
    const passwordRef = useRef<HTMLInputElement | null>(null)
    const repeatPasswordRef = useRef<HTMLInputElement | null>(null)

    const [showMessage, setShowMessage] = useState(false)
    const [message, setMessage] = useState({descripstion:"", status:false})
  
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate(); 

    function createAdmin (event:any) {
        setLoading(true)
        event.preventDefault();
        const userPassword =  passwordRef.current?.value?passwordRef.current?.value.toString():"";
        const userEmail =  emailRef.current?.value?emailRef.current?.value.toString():"";
        const userRepeatPassword =  repeatPasswordRef.current?.value?repeatPasswordRef.current?.value.toString():"";
    
        if(userPassword===userRepeatPassword){
            createUserWithEmailAndPassword(auth, userEmail, userPassword).then(()=>(
              setMessage({descripstion:"Admin was created", status:true}), setShowMessage(true),
              navigate('/CreateGroups', {state: {email:userEmail}})
            )).catch(()=> (setMessage({descripstion:"Email is already taken", status:true}), setShowMessage(true), setLoading(false)))         
        }
        else {
          setMessage({descripstion:"passwords are not the same", status:false}); setShowMessage(true); setLoading(false)
        }
    }

  return (<>
    {loading&&<LoadingStatus/> }
    {showMessage&&<MessageModal setShowMessage={setShowMessage}  description={message.descripstion} status={message.status} setMessage={setMessage}/>}
        <HiOutlineChevronDoubleLeft className='icon-exit'  onClick={()=>navigate("/")}/>
        <motion.div variants={showPage} initial="hidden" animate="visible" className='CreatePage flex'>  
        <form className='flex' style={{marginBottom:"20px"}} onSubmit={(e)=>createAdmin(e)}>   
        <div className='Login__content flex'>
            <h1>Create schedule</h1>
            <p>
            First, create your administrator account
            </p>
            <input type="email" placeholder='E-mail' ref={emailRef} required/>
            <input type="password" placeholder='Password' ref={passwordRef} required/>
            <input type="password" placeholder='Repeat password' ref={repeatPasswordRef} required/>
        </div>  
        <button type="submit" className='login button'>Next</button>
        </form>  
        </motion.div>
    </>
  )
}
