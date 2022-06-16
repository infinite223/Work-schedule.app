import { motion, HiOutlineChevronDoubleLeft, useNavigate, Admin, Worker, useDispatch, bindActionCreators } from './../../imports'
import { useSelector } from 'react-redux';
import { BsPersonBoundingBox } from 'react-icons/bs'
import { actionCreators,  State } from '../../state';

import { position, showPage } from './../../Animations/variants';
import { showMobilePage } from '../../Animations/variantsOnSmallScreen';
import { MdOutlinePersonAdd } from 'react-icons/md'

import './CreateSchedule.scss'

export const CreateSchedule = () => {
  const navigate = useNavigate(); 
  
  const persons = useSelector((state: State)=> state.person)
  const  person :any = persons;
  const dispatch = useDispatch();

  const { addPerson, setPerson, deletePerson } = bindActionCreators(actionCreators, dispatch)

  return (
    <>
      <HiOutlineChevronDoubleLeft className='icon-exit'  onClick={()=>navigate("/")}/>
      <div className='right-header'>Create</div>

      <motion.div className='CreateSchedule' variants={showMobilePage} initial="hidden" animate="visible">
        <nav>
          <motion.div
            initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{duration:2.5}}
            > 
              <h3>Persons in schedule <text style={{color:"#FF00FF"}}>{person.length}</text></h3>

            </motion.div>   
            <div className='create__group'>
                <text className='text__value'>
                  <input type="text" placeholder='Set name group...'/> 
                </text> 
              </div>  
        </nav>
        <div className='Content flex'>
          <div className='Persons'>               
            {person.map((worker:any)=> {
              return <Worker key={worker.id} id={worker.id}/>
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
                <text>Admin<div style={{color:"#FF00FF", fontSize:"13px"}}>(YOU)</div></text>

                 <Admin/>
              </div>
                
              <BsPersonBoundingBox size={100} className='Person__data-icon'/>
          </div> 
        </div>
      </motion.div>
    </>
  )
}
