import React from 'react'
import './SettingsModalStyle.scss'
import { AnimatePresence, motion } from 'framer-motion';
import { showMenuModal } from '../../Animations/variantsOnSmallScreen';

export const SettingsModal = () => {
  return (
    <AnimatePresence>
        <motion.div className='Settings__container flex'
         key="box"
         variants={showMenuModal}
         initial="hidden"
         animate="visible"
         exit="exit">

            Settings
            <div className='option flex'>
              <span>Set your theme schedule </span>
              <input type="color" value="#FF00FF"/>
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