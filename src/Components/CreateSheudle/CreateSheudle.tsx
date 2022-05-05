import { motion } from 'framer-motion'
import { position } from '../../Animations/variants'

import './CreateSheudle.scss'
import { Admin } from './Persons/Admin'
import { Worker } from './Persons/Worker';

export const CreateSheudle = () => {
  return (
    <motion.div
        variants={position}
        initial="outside"
        animate="goodPosition"
        className='CreateSheudle flex'
    >
     <h3>Create <br />your Sheudle</h3>
     <input type="text" className='name_sheudle-input' placeholder="Name group"/>
     <div className='Persons flex'>
       <Admin/>
       <Worker/>
     </div>
    </motion.div>
  )
}
