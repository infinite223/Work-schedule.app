import React, {useState, useRef} from 'react'

import { showPage } from '../../../Animations/variants';
import { MessageModal } from '../../MessageModal';
import { HiOutlineChevronDoubleLeft, useNavigate, motion } from '../../../Helpers/imports';
import { useLocation } from 'react-router-dom';
import { MdOutlineGroups, MdGroupAdd } from 'react-icons/md';
import { FaMinus } from 'react-icons/fa'

export const CreateGroups = () => {
    const emailRef = useRef<HTMLInputElement | null>(null)
    const passwordRef = useRef<HTMLInputElement | null>(null)
    const repeatPasswordRef = useRef<HTMLInputElement | null>(null)

    const [showMessage, setShowMessage] = useState(false)
    const [groups, setGroups] = useState<Array<string>>([""])
    const [message, setMessage] = useState({descripstion:"", status:false})
  
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate(); 
    const location = useLocation();
    console.log(location.state)

    function createGroups (event:any) {
      setLoading(true)
      event.preventDefault();
      const tooShortGroupName = groups.find((group)=> group.length<3)
      if(tooShortGroupName){
        setMessage({descripstion:"The group name must be more than three letters", status:false}); setShowMessage(true); setLoading(false)
      }
      else{
        if(groups.length>=1){

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
        <form className='flex' style={{marginBottom:"20px"}} onSubmit={(e)=>createGroups(e)}>   
          <div className='Login__content flex'>
            <h1>Create schedule</h1>
              <p>
                Set up group names for employees
              </p>

            {groups.map((group, index)=>{
              return (
                <div key={index} className='group'>
                  <MdOutlineGroups size={25} className="group-icon"/>
                  <input type="text"  placeholder={index +1+ " group name"} onChange={(x)=>editGroup(index, x.target.value)}/>
                  <FaMinus className='minus-icon' onClick={()=>setGroups(groups.filter((group, i)=> i!==index))}/>
                </div>
              )
            })}
            {/* <div className='group'>
              <MdOutlineGroups size={25} className="group-icon"/>
              <input type="text" placeholder='1 group name'/>
            </div>

            <div className='group'>
              <MdOutlineGroups size={25} className="group-icon"/>
              <input type="text" placeholder='2 group name'/>
            </div> */}
          </div>
         {/* <div className='addGroup-botton'> */}
            <MdGroupAdd className='addGroup-botton' onClick={()=>setGroups([...groups, ""])}/>
          {/* </div> */}
         <button type="submit" className='login button'>Create groups</button>
        </form>  
        </motion.div>
    </>
  )
}
