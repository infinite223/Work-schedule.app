import { motion, useNavigate } from '../../Helpers/imports'
import { letter, sentence, button } from '../../Animations/variants'

import './StartPage.scss'

export const StartPage = () => {

  const headerText = "You can create your first work schedule here, it's really that simple";
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
          </div>
        </div>
        <div className='startPage__content-right flex'>
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
      
            <motion.div className='button create-button'
              variants={button}
              initial="hidden"
              animate="goodPosition"
              whileHover="hover"
              whileTap="tap"
              onClick={()=> navigate("/Create")}
            >
              Create
            </motion.div>
          </div>

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
              {/* <span onClick={()=> navigate("/Login")}><span className='login-text'> log In</span></span> */}
              <motion.div className='button create-button'
                variants={button}
                initial="hidden"
                animate="goodPosition"
                whileHover="hover"
                whileTap="tap"
                onClick={()=> navigate("/Login")}
            >
              Log In
            </motion.div>
          </div>
        </div>
        
      </div>
    </motion.div>
  )
}
