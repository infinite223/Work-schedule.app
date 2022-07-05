import './MenuModalStyle.scss'
import { AnimatePresence, motion } from 'framer-motion';
import { showMenuModal } from '../../Animations/variantsOnSmallScreen';
import { MdOutlinePersonOutline } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';

export const MenuModal :React.FC<{ showMenu:boolean,setShowMenu: (value:boolean) => void, updateSchedule: ()=>void  }> = ({showMenu, setShowMenu, updateSchedule}) => {
  const navigate = useNavigate(); 

  return (
    <AnimatePresence>
        {showMenu&& <div className='blur-page' onClick={()=>setShowMenu(false)}/>}
        <motion.div className='menua flex'
               key="box"
               variants={showMenuModal}
               initial="hidden"
               animate="visible"
               exit="exit">

            <span>
              <div className='icon'><MdOutlinePersonOutline size={20}/></div>
              <div className='meganta-text'>Dawid</div>
            </span>
            <span onClick={()=>(auth.signOut(), navigate("/"))}>Log out</span>
            <span onClick={()=>(updateSchedule(),setShowMenu(false))}>Save</span>
            <span>Settings</span>
        </motion.div>
    </AnimatePresence>
  )
}
