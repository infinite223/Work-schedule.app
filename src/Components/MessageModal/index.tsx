import React, { useEffect} from 'react'
import './MessageModal.scss'
import { BsCheck } from 'react-icons/bs'
import { FiX } from 'react-icons/fi'
import { AnimatePresence, motion } from 'framer-motion'
import { message } from '../../Animations/variants'

interface MessageModalProps {
  description:string,
  setShowMessage: (value:boolean) => void,
  setMessage?:(value:{descripstion:string, status:boolean}) => void,
  status:boolean
}

export const MessageModal: React.FC<MessageModalProps> = ({ description, setShowMessage, status, setMessage }) => {
  useEffect(()=>{
    const timer = setTimeout(() => {
       setShowMessage(false)
       setMessage&&setMessage({ descripstion:"", status:false })
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
            {status?<BsCheck color='#f0f' className='status-icon' size={25}/>:
            <FiX className='status-icon' color='#f0f' size={25}/>}
        </motion.div>
    </AnimatePresence>
  )
}
