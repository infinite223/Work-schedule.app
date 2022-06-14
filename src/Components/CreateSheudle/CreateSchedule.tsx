import { motion, HiOutlineChevronDoubleLeft, useNavigate, Admin, Worker, useDispatch, bindActionCreators } from './../../imports'
import { useSelector } from 'react-redux';
import { BsPersonBoundingBox } from 'react-icons/bs'
import { IoCreateOutline } from 'react-icons/io5'
import { actionCreators,  State } from '../../state';

import { position, showPage } from './../../Animations/variants';
import { MdOutlinePersonAdd } from 'react-icons/md'

import './CreateSchedule.scss'

export const CreateSchedule = () => {
  const navigate = useNavigate(); 
  
  const persons = useSelector((state: State)=> state.person)
  const  person :any = persons;
  const dispatch = useDispatch();
  
  const { addPerson, setPerson, deletePerson } = bindActionCreators(actionCreators, dispatch)

  return (
    <motion.div className='CreateSchedule' variants={showPage} initial="hidden" animate="visible">
      <HiOutlineChevronDoubleLeft className='icon-exit'  onClick={()=>navigate("/")}/>
      <nav>
        <motion.div
          initial={{opacity:0}}
          animate={{opacity:1}}
          transition={{duration:2.5}}
          > 
            <h3>Create Your work schedule</h3>

          </motion.div>   
          <div className='create__group'>
              <text className='text__value'><text>Name group:</text>
                <input type="text"/> 
                <IoCreateOutline size={25} className="create__group-button"/>
              </text> 
            </div>  
      </nav>
      <div className='Content flex'>
        <div className='Persons'>               
          {/* <Admin/> */}
          {person.map((worker:any)=> {
            return <Worker lastPersonId={person.at(-1).id} key={worker.id} id={worker.id}/>
          })}
         
            <motion.div className='Person' 
              variants={position}
              initial="outsideTop"
              animate="goodPosition"
              whileHover="hoverWorker">
              <motion.div className="Person__add-button flex" onClick={()=> (addPerson({id: persons.length,email:"", nickname:""}))}>
                <h5>Click to add new person </h5> 
                <MdOutlinePersonAdd size={25} color='white' style={{margin:"0 20px"}}/>
              </motion.div>
            </motion.div>
     
        </div> 
        <div className='Person__data flex'>
            <BsPersonBoundingBox size={100} color="grey"/>
        </div> 
      </div>
    </motion.div>
  )
}
