import {useState, useRef} from 'react'
import './../CreateScheduleStyle.scss'
import { showPage } from '../../../Animations/variants';
import { MessageModal } from '../../MessageModal';
import { HiOutlineChevronDoubleLeft, useNavigate, motion } from '../../../Helpers/imports';
import { useLocation } from 'react-router-dom';
import { MdOutlineGroups, MdGroupAdd } from 'react-icons/md';
import { createGroups, daysInMonth } from '../../../Helpers/functions/functions'
import { FaMinus } from 'react-icons/fa'
import { generateSheduleData } from './../../../Helpers/functions/functions';
import { setDoc,  doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import { today, month } from '../../../Helpers/constants';

export const CreateGroups = () => {
    const workPlaceRef = useRef<HTMLInputElement | null>(null)

    const [showMessage, setShowMessage] = useState(false)
    const [groups, setGroups] = useState<Array<string>>([""])
    const [message, setMessage] = useState({descripstion:"", status:false})
  
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate(); 
    
    const location = useLocation();
    const email = location.state as string
 


   async function validateGroups (event:any) {
      setLoading(true)
      event.preventDefault();
      const tooShortGroupName = groups.find((group)=> group.length<3)
      if(tooShortGroupName){
        setMessage({descripstion:"The group name must be more than three letters", status:false}); setShowMessage(true); setLoading(false)
      }
      else{
        if(groups.length>=1){
          const workplace = workPlaceRef.current?.value.toString();
          if(email && workplace){
            const foundWorkPlace = await getDoc(doc(db, "groups", workplace))  
            if(!foundWorkPlace.data()){
                createGroups(email, workplace, groups).then(async ()=>
                {
                  try {
                    await setDoc(doc(db, "schedule", workplace), {
                      [(new Date(today.getFullYear(), today.getMonth(), 1)).toDateString()]: generateSheduleData(daysInMonth(new Date()))
                    }).then(() => (setMessage({descripstion:"The group has been created correctly", status:true}), setShowMessage(true), navigate("/Login")))
                  }
                  catch {
                    setMessage({descripstion:"Error", status:false}); setShowMessage(true); setLoading(false);
                  }
                }
              )
            }
            else {
              setMessage({descripstion:"The group name is taken", status:false}); setShowMessage(true); setLoading(false);
            }     
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
                <input style={{width:"250px"}} type="text" placeholder='Name of the workplace' ref={workPlaceRef} required/>
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
