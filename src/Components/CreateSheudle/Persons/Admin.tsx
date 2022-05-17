import { motion } from './../../../imports'
import { show } from '../../../Animations/variants'
import { useState } from 'react'

import './Person.scss'  

export const Admin = () => {
  const [nickname, setNickname] = useState<string>();
  
  return (
    <motion.div className='Person flex' variants={show} initial="hidden" animate="visible" whileHover="hover">
        <div className='flex person_content'>
            <h4>You <p>{nickname&&<text>{nickname}<br /></text>}(Admin)</p></h4>          
            <form>
                <label>
                  <input type="text" placeholder='e-mail'/>
                  <input type="text" placeholder='nickname' onChange={(x)=>setNickname(x.target.value)}/>
                  <input type="password" placeholder='password' />
                </label>
            </form>
        </div>
    </motion.div>
  )
}
