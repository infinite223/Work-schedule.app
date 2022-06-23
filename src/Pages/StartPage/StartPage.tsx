import { motion, useNavigate } from '../../Helpers/imports'
import { letter, sentence, button } from '../../Animations/variants'

import './StartPage.scss'

export const StartPage = () => {

  const headerText = "Your work schedule can be here";
  const navigate = useNavigate(); 

  return (
    <motion.div
      className='startPage flex'
      initial={{opacity:0}}
      animate={{opacity:1}}
    >
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
        <div className='login-button' onClick={()=> navigate("/Login")}><span className='login-text'>Log</span> In</div>
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

        <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1.5, delay:2}}>if you belong to an existing work schedule, you can 
         <span onClick={()=> navigate("/Login")}><span className='login-text'> log In</span></span>
        </motion.p>

    </motion.div>
  )
}
