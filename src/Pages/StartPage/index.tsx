import { motion, useNavigate } from '../../Helpers/imports'
import { letter, sentence, button } from '../../Animations/variants'
import { HiOutlineChevronDoubleLeft } from 'react-icons/hi'
import { TiLocationArrowOutline } from 'react-icons/ti'

import './StartPageStyle.scss'
import blue_theme from "./../../images/blue_theme.jpg"
import red_theme from "./../../images/red_theme.jpg"
import green_theme from "./../../images/green_theme.jpg"

export const StartPage = () => {
  const helperText = "You can create your first work schedule here, it's really that simple..."
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
         
              Work-schedule
              
              <span style={{color:"#FF00FF"}}>.app</span><br/>
              <div>v2</div>
            </div>
            <div className='options'>
              <motion.div className='button login__register-button flex'
                variants={button}
                initial="hidden"
                animate="goodPosition"
                whileHover="hover"
                whileTap="tap"
                onClick={()=> navigate("/Login")}
              >
                <TiLocationArrowOutline size={20} className='arrow-icon'/>
                <div>Login</div>
              
              </motion.div> 
        
              <motion.div className='button login__register-button flex'
                variants={button}
                initial="hidden"
                animate="goodPosition"
                whileHover="hover"
                whileTap="tap"  
                onClick={()=> navigate("/Register")}
              >
                <div>Register</div>
                <TiLocationArrowOutline size={25} style={{transform:"rotate(225deg)",marginRight:"0px", marginLeft:"10px"}} className='arrow-icon'/>
              </motion.div>
            </div>
            <div className='info'>
              <ul>
                <h3>What application offer?</h3>
                <li>Convenient management of the work schedule</li>
                <li>Quick counting of the number of hours worked per month</li>
                <li>Accessibility from the level of mobile devices</li>
              </ul>

            
                <motion.div
                  variants={sentence}
                  initial="hidden"
                  animate="visible"
                  className='helper-text'
                >
                  {helperText.split("").map((char, index) => {
                  return (
                    <motion.span key={char + "-" + index} variants={letter}>{char}</motion.span>
                  )
                })}
              </motion.div>
       

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
          <div className='image-container'>
                <img className='blue_theme' src={blue_theme} alt="blue theme"/>
                <img className='red_theme' src={red_theme} alt="red theme"/>
                <img className='green_theme' src={green_theme} alt="green theme"/>
          </div>
 
        </div>
      </div>
    </motion.div>
  )
}
