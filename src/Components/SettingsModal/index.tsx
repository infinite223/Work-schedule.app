import React from 'react'
import './SettingsModalStyle.scss'
import { AnimatePresence, motion } from 'framer-motion';
import { showMenuModal } from '../../Animations/variantsOnSmallScreen';
import { FiX } from 'react-icons/fi' 


interface SettingsModalProps {
  theme:Array<number>,
  setTheme: (value:Array<number>) => void,
  setShowSettings: (value:boolean) => void
}
export const SettingsModal:React.FC<SettingsModalProps> = ({ theme, setTheme, setShowSettings }) => {

  return (
    <AnimatePresence>
        <motion.div className='Settings__container'
         key="box"
         variants={showMenuModal}
         initial="hidden"
         animate="visible"
         exit="exit">
          <nav>
            <div>Settings</div>
            <FiX className='exit-icon' size={25} onClick={()=>setShowSettings(false)}/>
          </nav>
            <div className='option flex'>
              <span>Set your theme schedule </span>
              {/* <input type="color" value={theme} onChange={(x)=>setTheme(x.target.value)}/> */}
              <div className='themes flex'>
                <div className='theme-box' style={{backgroundColor:"rgb(19,19,19)"}} onClick={()=>setTheme([19,19,19])}></div>
                <div className='theme-box' style={{backgroundColor:"rgb(255,0,255)"}} onClick={()=>setTheme([255,0,255])}></div>
                <div className='theme-box' style={{backgroundColor:"rgb(109, 240, 77)"}} onClick={()=>setTheme([109, 240, 77])}></div>
                <div className='theme-box' style={{backgroundColor:"rgb(22, 42, 145)"}} onClick={()=>setTheme([22, 42, 145])}></div>
                <div className='theme-box' style={{backgroundColor:"rgb(182, 42, 25)"}} onClick={()=>setTheme([182, 42, 25])}></div>
              </div>
            </div>
            <div className='option flex'>
              <span>Set language</span>
              <select name="language" className='select'>
                <option className='item' value="english">English</option>
                <option className='item' value="polski">Polski</option>
              </select>
            </div>
        </motion.div>
    </AnimatePresence>
  )
}
