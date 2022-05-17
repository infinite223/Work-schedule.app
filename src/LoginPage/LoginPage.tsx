import { useNavigate, HiOutlineChevronDoubleLeft, motion } from './../imports';
import { show } from './../Animations/variants';

import './LoginPage.scss'

export const LoginPage = () => {
  const navigate = useNavigate(); 
  return (
    <div>
         <HiOutlineChevronDoubleLeft className='icon-exit'  onClick={()=>navigate("/")}/>
         <motion.div variants={show} initial="hidden" animate="visible" className='LoginPage flex'>
           <h1>Log In</h1>
           <button className='login button'>Log In</button>

         </motion.div>
    </div>
  )
}
