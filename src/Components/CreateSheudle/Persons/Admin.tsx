import { motion } from './../../../imports'
import { show } from '../../../Animations/variants'
import { useState } from 'react'

import './Person.scss'  

export const Admin = () => {
  const [nickname, setNickname] = useState<string>();
  
  return (
    <motion.div className='Person flex' variants={show} initial="hidden" animate="visible" whileHover="hover">
        <div className='person_content'>
            <text>Admin</text>
            {/* <h4>You {nickname&&<text>{nickname}</text>}(Admin)</h4>          
            <form>
                <label>
                  <input type="text" placeholder='e-mail'/>
                  <input type="text" placeholder='nickname' onChange={(x)=>setNickname(x.target.value)}/>
                  <input type="password" placeholder='password' />
                </label>
            </form> */}
            <text className='text__value'><text>email:</text> <input type="text" placeholder='...'/></text>
            <text className='text__value'><text>nickname:</text> <input type="text" placeholder='...'/> </text>
            <text className='text__value'><text>password:</text> <input type="password" placeholder='...'/> </text>
        </div>
    </motion.div>
  )
}
