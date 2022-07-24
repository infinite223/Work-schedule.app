import React, {useState, useRef} from 'react'

import { showPage } from '../../../Animations/variants';
import { MessageModal } from '../../MessageModal';
import { HiOutlineChevronDoubleLeft, useNavigate, motion } from '../../../Helpers/imports';
import { useLocation } from 'react-router-dom';
import { MdOutlineGroups, MdGroupAdd } from 'react-icons/md';
import { createGroups } from '../../../Helpers/functions/functions'
import { FaMinus } from 'react-icons/fa'

export const CreateGroups = () => {
    const emailRef = useRef<HTMLInputElement | null>(null)
    const passwordRef = useRef<HTMLInputElement | null>(null)
    const repeatPasswordRef = useRef<HTMLInputElement | null>(null)
    const workPlaceRef = useRef<HTMLInputElement | null>(null)

    const [showMessage, setShowMessage] = useState(false)
    const [groups, setGroups] = useState<Array<string>>([""])
    const [message, setMessage] = useState({descripstion:"", status:false})
  
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate(); 
    
    const location = useLocation();
    const email = location.state as string
 


    function validateGroups (event:any) {
      setLoading(true)
      event.preventDefault();
      const tooShortGroupName = groups.find((group)=> group.length<3)
      if(tooShortGroupName){
        setMessage({descripstion:"The group name must be more than three letters", status:false}); setShowMessage(true); setLoading(false)
      }
      else{
        if(groups.length>=1){
          const workplace = workPlaceRef.current?.value.toString();
          console.log(email)
          if(email && workplace){
            createGroups(email, workplace, groups).then(()=>
              (setMessage({descripstion:"Groups was created", status:true}), setShowMessage(true), setLoading(false))
            )
          }
        }
        else {
          setMessage({descripstion:"Error", status:false}); setShowMessage(true); setLoading(false)
        }
      }
    }

    const editGroup = (index:number, editGroup:string) => {
      const allGroups = groups 
      allGroups[index] = editGroup
      setGroups(allGroups)
    }

  return (<>
    {showMessage&&<MessageModal setShowMessage={setShowMessage}  description={message.descripstion} status={message.status} setMessage={setMessage}/>}
        <HiOutlineChevronDoubleLeft className='icon-exit'  onClick={()=>navigate("/")}/>
        <motion.div variants={showPage} initial="hidden" animate="visible" className='CreatePage flex'>  
        <form className='flex' style={{marginBottom:"20px"}} onSubmit={(e)=>validateGroups(e)}>   
          <div className='Login__content flex'>
            <h1>Create schedule</h1>
              <p>
                Set up group names for employees
              </p>

              <div className='group'>
                <input style={{width:"280px"}} type="text" placeholder='Name of the workplace' ref={workPlaceRef} required/>
              </div>
            {groups.map((group, index)=>{
              return (
                <div key={index} className='group'>
                  <MdOutlineGroups size={25} className="group-icon"/>
                  <input type="text"  placeholder={index +1+ " group name"} onChange={(x)=>editGroup(index, x.target.value)}/>
                  <FaMinus className='minus-icon' onClick={()=>setGroups(groups.filter((group, i)=> i!==index))}/>
                </div>
              )
            })}
          </div>
            <MdGroupAdd className='addGroup-botton' onClick={()=>setGroups([...groups, ""])}/>
         <button type="submit" className='login button'>Create groups</button>
        </form>  
        </motion.div>
    </>
  )
}
