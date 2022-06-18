import { useNavigate, HiOutlineChevronDoubleLeft, motion } from '../../Helpers/imports';
import { showPage } from '../../Animations/variants';

import './LoginPage.scss'

export const LoginPage = () => {
  const navigate = useNavigate(); 
  return (
    <div>
         <HiOutlineChevronDoubleLeft className='icon-exit'  onClick={()=>navigate("/")}/>
         <motion.div variants={showPage} initial="hidden" animate="visible" className='LoginPage flex'>       
           <div className='Login__content flex'>
            <h1>Log In</h1>
            <p>
              if this is your first login, give your account a password
            </p>
             <input type="text" placeholder='E-mail'/>
             <input type="password" placeholder='Password'/>
           </div>

           <button className='login button' onClick={()=>navigate("/Schedule")}>Log In</button>
         </motion.div>
    </div>
  )
}
