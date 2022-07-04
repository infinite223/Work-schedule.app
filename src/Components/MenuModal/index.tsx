import './MenuModalStyle.scss'
import { AnimatePresence, motion } from 'framer-motion';
import { showMenuModal } from '../../Animations/variantsOnSmallScreen';

export const MenuModal :React.FC<{ showMenu:boolean,setShowMenu: (value:boolean) => void  }> = ({showMenu, setShowMenu}) => {
  return (
    <AnimatePresence>
        {showMenu&& <div className='blur-page' onClick={()=>setShowMenu(false)}/>}
        <motion.div className='menua flex'
               key="box"
               variants={showMenuModal}
               initial="hidden"
               animate="visible"
               exit="exit">

            <span>Dawid</span>
            <span>Log out</span>
            <span>Save</span>
            <span>Settings</span>
        </motion.div>
    </AnimatePresence>
  )
}
