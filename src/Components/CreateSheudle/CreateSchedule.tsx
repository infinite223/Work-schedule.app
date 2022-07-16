import { motion, HiOutlineChevronDoubleLeft, useNavigate, Admin, Worker, useDispatch, bindActionCreators, MdOutlinePersonAdd, BsPersonBoundingBox } from '../../Helpers/imports'
import { useSelector } from 'react-redux';
import { actionCreators,  State } from '../../state';
import { useState } from 'react'

import { position } from './../../Animations/variants';
import { showMobilePage } from '../../Animations/variantsOnSmallScreen';
import { showPage } from './../../Animations/variants';
import { useMediaQuery } from 'react-responsive'
import { db } from '../../firebase';
import { setDoc, getDoc, doc } from 'firebase/firestore';
import { generateSheduleData, daysInMonth } from '../../Helpers/functions/functions';
import { MessageModal } from '../MessageModal';
import { today, month } from '../../Helpers/constants';

import './CreateSchedule.scss'

export const CreateSchedule = () => {
  const navigate = useNavigate(); 
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' })
  const [ nameGroup, setNameGroup ] = useState("")
  const persons = useSelector((state: State)=> state.person)
  const  person :any = persons;
  const dispatch = useDispatch();

  const [nicknameAdmin, setNicknameAdmin] = useState("")
  const [emailAdmin, setEmailAdmin] = useState("")

  const { addPerson } = bindActionCreators(actionCreators, dispatch)
  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState("")

  const createSchedule = async () => {
    if(persons.length<1){
      setMessage("Without employees, you cannot create a schedule"); setShowMessage(true)
    }
    else if(nameGroup.length<4){
      setMessage("The group name must be at least 4 letters long"); setShowMessage(true)
    }
     else if(message.length>3){
       setShowMessage(true)
      }
    else {
      const foundGroup = await getDoc(doc(db, "groups", nameGroup))  
      if(!foundGroup.data()){
        await setDoc(doc(db, "groups", nameGroup), {
          nameGroup:nameGroup,
          workers: person,
          admin: {
            nickname:nicknameAdmin,
            email:emailAdmin
          }
        }).then( async ()=> {
          await setDoc(doc(db, "schedule", nameGroup), {
            [month[today.getMonth()]+today.getFullYear()]: generateSheduleData(daysInMonth(new Date()))
          }).then(() => (setMessage("The group has been created correctly"), setShowMessage(true)))
        })
      }
      else {
        setMessage("Group name taken, use another"); setShowMessage(true)
      }
    }
  }

  return (
    <>
    {showMessage&&<MessageModal description={message} setShowMessage={setShowMessage}/>}
      <HiOutlineChevronDoubleLeft className='icon-exit'  onClick={()=>navigate("/")}/>
      <motion.div initial={!isTabletOrMobile?{right:"-85px"}:{right:"0px"}} whileHover={{right:"0px"}} transition={{duration:.5}} className='right-header flex'>
            {!isTabletOrMobile&&<HiOutlineChevronDoubleLeft size={30} className='icon-save'/>}
            <span onClick={()=>createSchedule()}>Create</span>
            {isTabletOrMobile&&<HiOutlineChevronDoubleLeft size={30} className='icon-save'/>}
      </motion.div>

      <motion.div className='CreateSchedule' variants={isTabletOrMobile?showMobilePage:showPage} initial="hidden" animate="visible">
        <nav>
          <motion.div
            initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{duration:2.5}}
            > 
              <h3>Persons in schedule <span style={{color:"#FF00FF"}}>{person.length}</span></h3>

            </motion.div>   
            <div className='create__group'>
                <span className='text__value'>
                  <input type="text" placeholder='Set name group...' onChange={(x)=>setNameGroup(x.target.value)}/> 
                </span> 
              </div>  
        </nav>
        <div className='Content flex'>
          <div className='Persons'>               
            {person.map((worker:any)=> {
              return <Worker key={worker.id} id={worker.id} setMessage={setMessage}/>
            })}
          
              <motion.div className='Person' 
                variants={position}
                initial="outsideTop"
                animate="goodPosition"
                whileHover="hoverWorker">
                <motion.div className="Person__add-button flex" onClick={()=> (addPerson({id: person.at(-1)?person.at(-1).id+1:1, email:"", nickname:""}))}>
                  <h5 style={{marginLeft:"20px"}}>Click to add new person </h5> 
                  <MdOutlinePersonAdd size={25} color='white' style={{margin:"0 20px"}}/>
                </motion.div>
              </motion.div>
      
          </div> 
          <div className='Person__data flex'>
              <div className='Person__data-admin'>
                <div className='Person__data-info'>
                  <BsPersonBoundingBox size={35}/>
                  <span>Admin<div style={{color:"#FF00FF", fontSize:"13px"}}>(YOU)</div></span>
                </div>                  
                <Admin setNicknameAdmin={setNicknameAdmin} setEmailAdmin={setEmailAdmin}/>
              </div>         
          </div> 
        </div>
      </motion.div>
    </>
  )
}
