import React, {useState} from 'react'
import { motion } from 'framer-motion'
import { letter, sentence, button } from '../Animations/variants'
import './StartPage.scss'

export const StartPage = () => {

  const headerText = "Your work schedule can be here...";
  const [showCreate, setShowCreate] = useState(false);
  return (
    <motion.div className='startpage flex'
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

        <motion.div className='button create-button'
          variants={button}
          initial="hidden"
          animate="goodPosition"
          whileHover="hover"
          whileTap="tap"
          onClick={()=>setShowCreate(!showCreate)}
        >
          {!showCreate?<text>Create</text>:
          <div className='create-schedule'>działa</div>}
        </motion.div>

        <p>if you belong to an existing work schedule, you can <text>log in</text></p>

        <text className='version-text'>Work schedule v0.2</text>
    </motion.div>
  )
}
