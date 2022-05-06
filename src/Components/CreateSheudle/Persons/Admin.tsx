import React from 'react'
import { motion } from 'framer-motion'
import { show } from '../../../Animations/variants'
import './Person.scss'

export const Admin = () => {
  return (
    <motion.div className='Person flex' variants={show} initial="hidden" animate="visible" whileHover="hoverAdmin">
        <div className='flex person_content'>
            <h4>You</h4>
            <form>
                <label>
                <input type="text" placeholder='login'/>
                <input type="text" placeholder='nickname' />
                <input type="password" placeholder='hasło' />
                </label>
            </form>
        </div>
    </motion.div>
  )
}
