import React, { useEffect} from 'react'
import './MessageModal.scss'
import { BsCheck } from 'react-icons/bs'
import { AnimatePresence, motion } from 'framer-motion'
import { message } from '../../Animations/variants'

export const MessageModal: React.FC<{ description:string, setShowMessage: (value:boolean) => void}> = ({ description, setShowMessage }) => {
  useEffect(()=>{
    const timer = setTimeout(() => {
       setShowMessage(false)
      }, 4000);
      return () => clearTimeout(timer);
  },[])

    return (
    <AnimatePresence>
        <motion.div className='messageModal'
        key="box"
        variants={message}
        initial="hidden"
        animate="visible"
        exit="exit">

            <div>{description}</div> 
            <BsCheck color='#f0f' size={25}/>
        </motion.div>
    </AnimatePresence>
  )
}
