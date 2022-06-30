import { useNavigate, HiOutlineChevronDoubleLeft, motion } from '../../Helpers/imports';
import { showPage } from '../../Animations/variants';
import { useRef, useState } from 'react';
import { auth  } from "../../firebase"
import { signInWithEmailAndPassword } from 'firebase/auth';

import './LoginPage.scss'

export const LoginPage = () => {
  const navigate = useNavigate(); 
  const emailRef = useRef<HTMLInputElement | null>(null)
  const passwordRef = useRef<HTMLInputElement | null>(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e:any) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await signInWithEmailAndPassword(auth,
         emailRef.current?.value?emailRef.current?.value.toString():"",
         passwordRef.current?.value?passwordRef.current?.value.toString():"")
         navigate("/schedule")
    } catch {
      setError("Failed to log in")
    }

    setLoading(false)
  }

  return (
    <div>
         <HiOutlineChevronDoubleLeft className='icon-exit'  onClick={()=>navigate("/")}/>
         <motion.div variants={showPage} initial="hidden" animate="visible" className='LoginPage flex'>  
         <form className='flex'  onSubmit={handleSubmit}>   
           <div className='Login__content flex'>
              <h1>Log In</h1>
              <p>
                if this is your first login, give your account a password
              </p>
             <input type="email" placeholder='E-mail' ref={emailRef} required/>
             <input type="password" placeholder='Password' ref={passwordRef} required/>
             <div className='error__message'>{error}</div>
           </div>  
           <button type="submit" className='login button'>Log In</button>
          </form>  
         </motion.div>
    </div>
  )
}
