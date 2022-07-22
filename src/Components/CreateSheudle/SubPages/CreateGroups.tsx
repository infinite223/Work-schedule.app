import React, {useState, useRef} from 'react'

import { showPage } from '../../../Animations/variants';
import { MessageModal } from '../../MessageModal';
import { HiOutlineChevronDoubleLeft, useNavigate, motion } from '../../../Helpers/imports';
import { useLocation } from 'react-router-dom';
import { MdOutlineGroups } from 'react-icons/md';

export const CreateGroups = () => {
    const emailRef = useRef<HTMLInputElement | null>(null)
    const passwordRef = useRef<HTMLInputElement | null>(null)
    const repeatPasswordRef = useRef<HTMLInputElement | null>(null)

    const [showMessage, setShowMessage] = useState(false)
    const [message, setMessage] = useState({descripstion:"", status:false})
  
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate(); 
    const location = useLocation();
    console.log(location.state)

    function createGroups (event:any) {
       
    }

  return (<>
    {showMessage&&<MessageModal setShowMessage={setShowMessage}  description={message.descripstion} status={message.status} setMessage={setMessage}/>}
        <HiOutlineChevronDoubleLeft className='icon-exit'  onClick={()=>navigate("/")}/>
        <motion.div variants={showPage} initial="hidden" animate="visible" className='CreatePage flex'>  
        <form className='flex' style={{marginBottom:"20px"}} onSubmit={(e)=>createGroups(e)}>   
          <div className='Login__content flex'>
            <h1>Create schedule</h1>
              <p>
                Set up group names for employees
              </p>
            <div className='group'>
              <MdOutlineGroups size={25} className="group-icon"/>
              <input type="text" placeholder='1 group name'/>
            </div>

            <div className='group'>
              <MdOutlineGroups size={25} className="group-icon"/>
              <input type="text" placeholder='2 group name'/>
            </div>
          </div>
        <button type="submit" className='login button'>Create groups</button>
        </form>  
        </motion.div>
    </>
  )
}
