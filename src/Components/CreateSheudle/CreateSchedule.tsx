import { motion, HiOutlineChevronDoubleLeft, useNavigate, Admin, Worker } from './../../imports'
import { useDispatch, useSelector } from 'react-redux';
import { BsPersonBoundingBox } from 'react-icons/bs'
import { IoCreateOutline } from 'react-icons/io5'
import {  State } from '../../state';


import './CreateSchedule.scss'

export const CreateSchedule = () => {
  const navigate = useNavigate(); 
  
  const persons = useSelector((state: State)=> state.person)
  const dispatch = useDispatch();
  const  person :any = persons;

  return (
    <motion.div className='CreateSchedule'>
      <HiOutlineChevronDoubleLeft className='icon-exit'  onClick={()=>navigate("/")}/>
      <nav>
        <motion.div
          initial={{opacity:0}}
          animate={{opacity:1}}
          transition={{duration:2.5}}
          > 
            <h3>Create Your Schedule</h3>

          </motion.div>   
          <div className='create__group'>
              {/* <input type="text" className='name_Schedule-input button' placeholder="Name group"/>   
              <div className='Create_Schedule-button button'>Create
              </div>   */}
              <text className='text__value'><text>name group:</text>
                <input type="text" placeholder='...'/> 
                <IoCreateOutline size={25} className="create__group-button"/>
              </text> 
            </div>  
      </nav>
      <div className='Content flex'>
        <div className='Persons'>               
          <Admin/>
          {person.map((worker:any)=> {
            return <Worker lastPersonId={person.at(-1).id} key={worker.id} id={worker.id}/>
          })}
        </div> 
        <div className='Person__data flex'>
            <BsPersonBoundingBox size={100} color="grey"/>
        </div> 
      </div>
    </motion.div>
  )
}
