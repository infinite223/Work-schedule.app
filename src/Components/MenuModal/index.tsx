import './MenuModalStyle.scss'
import { AnimatePresence, motion } from 'framer-motion';
import { showMenuModal } from '../../Animations/variantsOnSmallScreen';
import { MdOutlinePersonOutline } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { SettingsModal } from '../SettingsModal';
import { useState } from 'react';

export const MenuModal :React.FC<{ showMenu:boolean,setShowMenu: (value:boolean) => void, updateSchedule: ()=>void  }> = ({showMenu, setShowMenu, updateSchedule}) => {
  const navigate = useNavigate(); 
  const [showSettings, setShowSettings] = useState(false)

  return (
    <AnimatePresence>
        {showMenu&& <div className='blur-page' onClick={()=>setShowMenu(false)}/>}
        {showSettings&&<SettingsModal/>}
        <motion.div className='menu__container flex'
               key="box"
               variants={showMenuModal}
               initial="hidden"
               animate="visible"
               exit="exit">

            <span>
              <div className='icon'><MdOutlinePersonOutline size={20}/></div>
              <div className='meganta-text'>Dawid</div>
            </span>
            <span className='hover-color' onClick={()=>(auth.signOut(), navigate("/"))}>Log out</span>
            <span className='hover-color' onClick={()=>(updateSchedule(),setShowMenu(false))}>Save</span>
            <span className='hover-color' onClick={()=>(setShowSettings(true),setShowMenu(false))}>Settings</span>
        </motion.div>
    </AnimatePresence>
  )
}
