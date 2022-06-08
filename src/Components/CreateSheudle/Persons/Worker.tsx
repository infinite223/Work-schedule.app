import React, { useState, useRef } from 'react'
import { motion, useDispatch, useSelector, bindActionCreators } from './../../../imports'
import { position, show } from './../../../Animations/variants';
import { actionCreators, State } from '../../../state';
import { MdOutlinePersonAdd, MdOutlinePersonRemove } from 'react-icons/md'

import './Person.scss'

interface props {
  lastPersonId:number,
  id:number
}

export const Worker: React.FC<props>= ({ lastPersonId, id }) => { 
  const person = useSelector((state: State)=> state.person)
  const dispatch = useDispatch();
  
  const { addPerson, setPerson, deletePerson } = bindActionCreators(actionCreators, dispatch)

  //const [email, setEmaill] = useState(person[id].email)
  //const [nickname, setNickname] = useState<string>(person[id].nickname)

  return (
    <motion.div className='Person flex' 
        variants={position}
        initial="outsideRight"
        animate="goodPosition"
        whileHover={id==lastPersonId?"hoverWorker":"noHoverWorker"}>
         {id==lastPersonId?<motion.div className='flex person_content' onClick={()=> (addPerson({id: id+1,email:"", nickname:""}))}>
            <h5>Click to add new person </h5> 
            <MdOutlinePersonAdd size={25} color='grey'/>

         </motion.div>:
          <motion.div className='person_content'>
            <motion.div className='person_content'  variants={show} initial="hidden" animate="visible"  whileHover="hover">
           {/* {nickname?<h4>{nickname.length>7?nickname.substring(0, 6)+"...":nickname}</h4>:<h4>New worker</h4>}
            <form className='flex ' >
                <label>
                  <input type="text" placeholder='e-mail' value={email} onChange={(x) => (setEmaill(x.target.value), setPerson({id:id,email:email,nickname:nickname}))}/>
                  <input type="text" placeholder='nickname' value={nickname} onChange={(x)=>(setNickname(x.target.value),setPerson({id:id, email:email, nickname:nickname}))}/>
                </label>
            </form>  */}
             <text>{id+1}</text>  <text className='text__value'>email:<text style={{color:"white"}}>daw</text> email</text> <text className='text__value'>nickname: nickname</text>
             <MdOutlinePersonRemove size={25} color='grey' onClick={()=>deletePerson({id:id,email:"",nickname:""})}/>
           </motion.div>
        </motion.div>}
    </motion.div>
  )
}
