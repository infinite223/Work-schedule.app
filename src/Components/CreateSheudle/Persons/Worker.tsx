import React, { useState, useRef } from 'react'
import { motion } from './../../../imports'
import { position, show } from './../../../Animations/variants';
import { useDispatch, useSelector } from 'react-redux';

import './Person.scss'
import { bindActionCreators } from 'redux';
import { actionCreators, State } from '../../../state';

interface props {
  newWorker: (email:string, nickname:string) => void,
  setWorker: (id:number, email:string, nickname:string) => void,
  id:number
}

export const Worker: React.FC<props>= ({ newWorker, setWorker, id }) => {
 // const dispatch = useDispatch();
 // const { incrementCount, decrementCount } = bindActionCreators(actionCreators, dispatch)
//  const count = useSelector((state: State)=> state.count)

  const [showForm, setShowForm] = useState<boolean>(false); 
  
  const [email, setEmail] = useState("")
  const [nickname, setNickname] = useState<string>("")

  return (
    <motion.div className='Person flex' 
        variants={position}
        initial="outsideRight"
        animate="goodPosition"
        whileHover={!showForm?"hoverWorker":"noHoverWorker"}>
         {!showForm?<motion.div className='flex person_content' onClick={()=> (setShowForm(true), newWorker("",""))}>
            <h5>Click to add new person</h5>
            <div className='button new_person-button flex'>+</div>
         </motion.div>:
          <motion.div className='flex person_content'>
            <motion.div className='flex person_content'  variants={show} initial="hidden" animate="visible"  whileHover="hover">
            {nickname?<h4>{nickname.length>7?nickname.substring(0, 6)+"...":nickname}</h4>:<h4>New worker</h4>}
            <form className='flex ' >
                <label>
                  <input type="text" placeholder='e-mail' onChange={(x)=>(setEmail(x.target.value),setWorker(id, email, nickname))}/>
                  <input type="text" placeholder='nickname' onChange={(x)=>(setNickname(x.target.value),setWorker(id, email, nickname))}/>
                </label>
            </form>
           </motion.div>
        </motion.div>}
    </motion.div>
  )
}
