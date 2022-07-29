import { motion, useNavigate } from '../../Helpers/imports'
import { letter, sentence, button } from '../../Animations/variants'
import { HiOutlineChevronDoubleLeft } from 'react-icons/hi'
import { TiLocationArrowOutline } from 'react-icons/ti'

import './StartPageStyle.scss'
export const StartPage = () => {
  const headerText = "Click register if you want to be part of a group of employees";
  const loginText = "If you belong to an existing work schedule, you should click log in";
  const navigate = useNavigate(); 

  return (
    <motion.div
      className='startPage flex'
      initial={{opacity:0}}
      animate={{opacity:1}}
    >
      
      <div className='startPage__content flex'>

        <div className='startPage__content-left flex'>
          <div className='startPage__content-box'>
            <div className='logo'>
              Work-schedule<span style={{color:"#FF00FF"}}>.app</span><br/>
              <div>v2</div>
            </div>
            <div className='info'>
              <ul>
                <h3>What application offer?</h3>
                <li>Convenient management of the work schedule</li>
                <li>Quick counting of the number of hours worked per month</li>
                <li>Accessibility from the level of mobile devices</li>
              </ul>

              <div className='helper-text'>You can create your first work schedule here, it's really that simple...</div>

              <motion.div className='button create-button'
              variants={button}
              whileHover="hover"
              whileTap="tap"
              onClick={()=> navigate("/CreateAdmin")}
            >
              <HiOutlineChevronDoubleLeft size={20} className='icon'/>
              <div>Create</div>
            </motion.div>
            </div>
           
          </div>
        </div>

        <div className='startPage__content-right flex'>
          <div className="startPage__content-box">
            
            <motion.h1
                variants={sentence}
                initial="hidden"
                animate="visible"
              >
                {loginText.split("").map((char, index) => {
                return (
                  <motion.span key={char + "-" + index} variants={letter}>{char}</motion.span>
                )
              })}
            </motion.h1>
             
              <motion.div className='button login__register-button flex'
                variants={button}
                initial="hidden"
                animate="goodPosition"
                whileHover="hover"
                whileTap="tap"
                onClick={()=> navigate("/Login")}
            >
              <TiLocationArrowOutline size={30} className='arrow-icon'/>
              <div>Login</div>
            </motion.div>
          </div>

          <div className="startPage__content-box">
            <motion.h1
              variants={sentence}
              initial="hidden"
              animate="visible"
            >
             
              {headerText.split("").map((char, index) => {
                return (
                  <motion.span key={char + "-" + index} variants={letter}>{char}</motion.span>
                )
              })}
            </motion.h1>
      
            <motion.div className='button login__register-button flex'
              variants={button}
              initial="hidden"
              animate="goodPosition"
              whileHover="hover"
              whileTap="tap"  
              onClick={()=> navigate("/Register")}
            >
               <TiLocationArrowOutline size={30} className='arrow-icon'/>
              <div>Register</div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}