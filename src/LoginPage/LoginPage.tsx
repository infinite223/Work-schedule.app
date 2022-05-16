import { useNavigate, HiOutlineChevronDoubleLeft, motion } from './../imports';
import { show } from './../Animations/variants';
export const LoginPage = () => {
    const navigate = useNavigate(); 
  return (
    <div>
         <HiOutlineChevronDoubleLeft className='icon-exit'  onClick={()=>navigate("/")}/>
         <motion.div variants={show} initial="hidden" animate="visible" className='LoginPage flex'>
           LoginPage
         </motion.div>
    </div>
  )
}
