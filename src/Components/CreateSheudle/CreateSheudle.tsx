import { motion } from 'framer-motion'
import { position } from '../../Animations/variants'

import './CreateSheudle.scss'

export const CreateSheudle = () => {
  return (
    <motion.div
        variants={position}
        initial="outside"
        animate="goodPosition"
        className='CreateSheudle flex'
    >
     Create your Sheudle
     <div className='Persons flex'>
       <div className='Person flex'>

        </div>
     </div>
    </motion.div>
  )
}
