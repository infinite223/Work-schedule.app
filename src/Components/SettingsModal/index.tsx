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
        
        </motion.div>
    </AnimatePresence>
  )
}
