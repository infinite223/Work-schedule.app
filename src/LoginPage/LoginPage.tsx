import { useNavigate, HiOutlineChevronDoubleLeft, motion } from './../imports';
import { show } from './../Animations/variants';

import './LoginPage.scss'

export const LoginPage = () => {
  const navigate = useNavigate(); 
  return (
    <div>
         <HiOutlineChevronDoubleLeft className='icon-exit'  onClick={()=>navigate("/")}/>
         <motion.div variants={show} initial="hidden" animate="visible" className='LoginPage flex'>       
           <div className='Login__content flex'>
            <h1>Log In</h1>
            <p>
              if this is your first login, give your account a password
            </p>
             <input type="text" placeholder='E-mail'/>
             <input type="password" placeholder='Password'/>
           </div>

           <button className='login button'>Log In</button>
         </motion.div>
    </div>
  )
}
