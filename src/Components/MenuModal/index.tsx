import './MenuModalStyle.scss'
import { AnimatePresence, motion } from 'framer-motion';
import { showMenuModal } from '../../Animations/variantsOnSmallScreen';
import { MdOutlinePersonOutline } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { useState } from 'react';

interface MenuModalProps {
  showMenu:boolean,
  setShowMenu: (value:boolean) => void, updateSchedule: ()=>void,
  showSettings:boolean,
  setShowSettings: (value:boolean) => void,
}

export const MenuModal :React.FC<MenuModalProps> = ({showMenu, setShowMenu, updateSchedule, showSettings, setShowSettings}) => {
  const navigate = useNavigate(); 

  return (
    <AnimatePresence>
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